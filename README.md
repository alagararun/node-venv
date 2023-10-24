# Node-Venv - Simplify Node.js Environment Management

## Overview

Node-Venv is an npm package designed to streamline Node.js environment management on Linux-based systems. With Node-Venv, you can effortlessly set the desired Node.js version for your projects using NVM (Node Version Manager) automatically. No more manual interventions or repetitive 'nvm use' commands. Node-Venv simplifies your Node.js development workflow, making it more convenient and efficient.

## Installation

To get started with Node-Venv, you need to install it globally on your system. Open your terminal and run the following command:

```bash
npm install -g node-venv
```

## Usage

Node-Venv provides two main commands to help you manage your Node.js environment: `set` and `activate`.

### 1. Setting Node.js Version

Use the `set` command to specify the Node.js version you want for your project. This will create or update a `.nvmrc` file in the current directory with your desired semantic version. To set the required Node.js version, run the following command:

```bash
node-venv set <semantic_version>
```

Replace `<semantic_version>` with the specific version you need, such as "14.17.6" or "16.9.0."

### 2. Activating Node-Venv

After you've set your Node.js version with the `set` command, you can activate Node-Venv to ensure that the specified version is used in your terminal session without manually running 'nvm use' each time.

To activate Node-Venv, run the following command:

```bash
node-venv activate
```

This command will update your `.bashrc` (or equivalent) file to use the Node.js version you previously set or the default version, making it convenient to work with the appropriate Node.js environment.

## Uninstallation

If you ever wish to uninstall Node-Venv, you can use the following command:

```bash
npm uninstall -g node-venv
```

## Troubleshooting

If you encounter any issues or have questions regarding Node-Venv, please check the [FAQ](https://github.com/alagararun/node-venv) or reach out at 37363979+alagararun@users.noreply.github.com.

## Contributing

We welcome contributions from the community. If you want to help improve Node-Venv, please visit our [GitHub repository](https://github.com/alagararun/node-venv) and submit a pull request.

## License

Node-Venv is open-source software released under the [MIT License](https://github.com/alagararun/node-venv-license). You are encouraged to use, modify, and distribute it in accordance with the terms of the license.

---

Simplify your Node.js development process with Node-Venv. Say goodbye to manual Node.js version management and enjoy a more efficient workflow. Happy coding!
