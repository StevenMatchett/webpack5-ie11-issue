const fs = require('fs');

// This command is for HTML report compatibility
module.exports = (on, config) => {
  on('after:screenshot', (details) => {
    // remove space in screenshot path
    const newPath = details.path.replace(/ /g, '-');

    return new Promise((resolve, reject) => {
      fs.rename(details.path, newPath, (err) => {
        if (err) return reject(err);

        // because we renamed/moved the image, resolve with the new path
        // so it is accurate in the test results
        resolve({ path: newPath });
      });
    });
  });
};
