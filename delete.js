"use strict";

const
    argv = require('yargs').argv,
    deleteDir = require('./index');

let countFiles = 0;
const fileHandler = (...args) => {
    countFiles++;
    console.log(countFiles, ...args);
};

deleteDir({root: argv.root, fileHandler})
    .catch(console.error)
    .then(() => {
        console.log('final');
        process.exit(0);
    });
