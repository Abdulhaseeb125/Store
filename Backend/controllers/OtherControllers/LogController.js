const path = require('path');
const fs = require('fs');

module.exports = function handleLogs(filePath, message, payload, level = "info") {
    const timestamp = new Date().toISOString();
    let logData, headers;

    // Ensure payload properties have default values
    const name = payload?.name || 'N/A';
    const email = payload?.email || 'N/A';

    if (payload && payload.type === "signup") {
        headers = `,timestamp,level,name,email,message`;
        logData = `,${timestamp},${level},${name},${email},${message}\n`;
    } else {
        headers = `,timestamp,level,email,message`;
        logData = `,${timestamp},${level},${email},${message}\n`;
    }

    const logFilePath = path.resolve(__dirname, filePath);



    // Check if log file exists
    const fileExists = fs.existsSync(logFilePath);

    if (fileExists) {
        // Append log data to existing file
        fs.appendFile(logFilePath, logData, (err) => {
            if (err) {
                console.error(err);
                logError(`Failed to append to log file: ${err}`); // Log the error
            }
        });
    } else {
        // Create new log file and add headers
        fs.writeFile(logFilePath, headers + '\n' + logData, (err) => {
            if (err) {
                console.error(err);
                logError(`Failed to create or write to log file: ${err}`); // Log the error
            }
        });
    }
};

// Function to handle logging errors (implementation example)
function logError(errorMessage) {
    // Implement your error logging logic here, e.g., write to a file, send to monitoring system
    console.error('Error:', errorMessage); // Replace with your preferred logging method
}
