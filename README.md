# delete-directory-recursive

Deletes the directory recursively, by reading the contents of the directory as a stream to read. Suitable for deleting directory contents with millions of files.

## Install
``` bash
$ npm i delete-directory-recursive
```

## Usage
``` js
const deleteDir=require('delete-directory-recursive');

const fileHandler=absolutePath => {
    console.log(`This file/dir is deleted: ${absolutePath}`);
};

deleteDir({root: '/path/to/dir', fileHandler})
    .then(() => {
        console.log('directory deleted');
    });
```

### Options
+ root - absolute path to dir.
+ fileHandler - a function in which an absolute path is passed to each file or folder that was deleted. Optional parameter.

## Usage in console
``` bash
$ node delete --root="/path/to/dir"
```