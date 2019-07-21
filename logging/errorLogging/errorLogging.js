const fs = require("fs");

module.exports = {
  logError(error, file, line, user, message, functionName) {
    const date = new Date();
    const dateFormat = date.toLocaleString();
    const text = `${dateFormat}\n
                    >> File: ${file}:${line}\n
                    >> User: ${user}\n
                    >> Message: ${message ? message : ""}\n
                    >> Error: ${error} at ${functionName}\n
-------------------------------------------------------------------------------------------------------------------------\n`;
    fs.appendFile("./logging/logFiles/errorLog.txt", text, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }
};
