const fs = require('fs');
const path = require('path');
const os = require('os');

const BASHRC_PATH = path.join(os.homedir(), '.bashrc');

function removeContentFromFile(filePath, startMarker, endMarker) {
    // Read the content of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Find the start and end indices of the content to be removed
        const startIndex = data.indexOf(startMarker);
        const endIndex = data.indexOf(endMarker, startIndex + startMarker.length);

        // Check if markers are found
        if (startIndex === -1 || endIndex === -1) {
            // console.error('Markers not found in the file.');
            return;
        }

        // Remove the content between the markers
        const updatedContent = data.slice(0, startIndex) + data.slice(endIndex + endMarker.length);

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                // console.log('Content removed successfully.');
            }
        });
    });
}

const filePath = BASHRC_PATH;
const startMarker = 'cdnvm() {';
const endMarker = 'cdnvm "$PWD" || exit';

removeContentFromFile(filePath, startMarker, endMarker);
