#!/usr/bin/env node
const path = require('path');
const os = require('os');
const fs = require('fs');

const BASHRC_PATH = path.join(os.homedir(), '.bashrc');

const NVM_USE_FUNCTION = `
  cdnvm() {
    command cd "$@" || return $?
    nvm_path=$(nvm_find_up .nvmrc | tr -d '\\n')

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version;
        default_version=$(nvm version default);

        # If there is no default version, set it to node
        # This will use the latest version on your machine
        if [[ $default_version == "N/A" ]]; then
            nvm alias default node;
            default_version=$(nvm version default);
        fi

        # If the current version is not the default version, set it to use the default version
        if [[ $(nvm current) != "$default_version" ]]; then
            nvm use default;
        fi

    elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
        declare nvm_version
        nvm_version=$(<"$nvm_path"/.nvmrc)

        declare locally_resolved_nvm_version
        # nvm ls will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the -> and * characters and spaces
        # locally_resolved_nvm_version will be N/A if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\\->*' | tr -d '[:space:]')

        # If it is not already installed, install it
        # nvm install will implicitly use the newly-installed version
        if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
            nvm install "$nvm_version";
        elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
            nvm use "$nvm_version";
        fi
    fi
  }

  alias cd='cdnvm'
  cdnvm "$PWD" || exit
`;

function setVersion(version) {
  const nvmrcContents = `v${version}\n`;
  const nvmrcFilePath = '.nvmrc';
  fs.promises.access(nvmrcFilePath, fs.constants.F_OK)
    .then(() => {
      // File exists, so update its contents
      return fs.promises.writeFile(nvmrcFilePath, nvmrcContents);
    })
    .catch(() => {
      // File doesn't exist, so create it
      return fs.promises.writeFile(nvmrcFilePath, nvmrcContents);
    })
    .then(() => {
      console.log(`.nvmrc file ${nvmrcFilePath} updated with Node.js version: ${version}`);
    })
    .catch((err) => {
      console.error(`Error creating/updating .nvmrc file: ${err}`);
    });
}

function activate() {
  // Read the current content of .bashrc
  fs.readFile(BASHRC_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading .bashrc: ${err}`);
      return;
    }

    // Check if the NVM use function already exists in .bashrc
    if (data.includes('cdnvm()')) {
      console.log('NVM use function already exists in .bashrc');
      console.log('Activated')
    } else {
      // Append the NVM use function to the end of .bashrc
      fs.appendFile(BASHRC_PATH, NVM_USE_FUNCTION, (err) => {
        if (err) {
          console.error(`Error appending NVM use to .bashrc: ${err}`);
          return;
        }
        console.log('NVM use function added to .bashrc');
      });
    }
  });
}

function main() {
  const command = process.argv[2];
  const value = process.argv[3];

  if (command === 'set') {
    if(!value){
      console.error('  node-venv set <version>');
    }
    setVersion(value);
  } else if (command === 'activate') {
    activate();
  } else{
    console.error('Usage:');
    console.error('  node-venv set <version>');
    console.error('  node-venv activate');
  }
}

main();
