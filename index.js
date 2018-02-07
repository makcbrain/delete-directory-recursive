"use strict";

const
    path = require('path'),
    fs = require('fs-extra'),
    readdir = require('readdir-enhanced'),
    stream = require('stream');

module.exports = options => {
    const {root, fileHandler} = options;
    return fs.stat(root)
        .then(stat => {
            if (!stat.isDirectory()) {
                throw new Error(`Root id not directory`);
            }
            return deleteDirectory(root, fileHandler);
        })
};

function deleteDirectory(dirAbsolutePath, fileHandler = () => {
}) {
    return new Promise((resolve, reject) => {
        const writeStream = stream.Writable({
            objectMode: true,
        });
        writeStream.on('error', reject);
        writeStream.on('finish', () => {
            return fs.rmdir(dirAbsolutePath)
                .then(() => Promise.resolve(fileHandler(dirAbsolutePath)))
                .then(() => resolve())
                .catch(reject);
        });
        writeStream._write = (pathToFile, encoding, callback) => {
            let absolutePathToFile = path.join(dirAbsolutePath, pathToFile);
            return fs.stat(absolutePathToFile)
                .then(stat => {
                    if (stat.isDirectory()) {
                        return deleteDirectory(absolutePathToFile, fileHandler);
                    } else {
                        return fs.unlink(absolutePathToFile)
                            .then(() => fileHandler(absolutePathToFile));
                    }
                })
                .then(() => {
                    callback();
                })
                .catch(callback);
        };
        const readStream = readdir.stream(dirAbsolutePath);
        readStream.on('error', reject);
        readStream.pipe(writeStream);
    });
}
