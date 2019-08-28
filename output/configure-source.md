# (configure source help) - Configure the 'source' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure source --check
```

## Summary

The source section contains information about the source code of the demo so someone can read the implementation of the demo and modify it.

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>source:</pre> | Source code of the demo |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  - name: </pre> | Name of the repository |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    description: </pre> | Description of the repository |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    version: </pre> | Version number of the project, if defined |
|                     | <ul><li>Must be a number</li></ul> |
|                     | <hr>    |
| <pre>    directory: </pre> | Path to the repository |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |
| <pre>    entrypoint: </pre> | Name of the file that contains the entrypoint, if the repository is not a library with entrypoints in many files |
|                     | <ul><li>Must be a string</li><li>Must be a relative file path</li></ul> |
|                     | <hr>    |
| <pre>    license: </pre> | Path to a file containing the source code license |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |
| <pre>    authors:</pre> | List of the original authors of the source code (limit 10) |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      - </pre> | An author |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    notable:</pre> | Notable files |
|                     | <ul><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      documentation:</pre> | Notable documentation files |
|                     | <ul><li>Must be an array</li></ul> |
|                     | <hr>    |
| <pre>        - description: </pre> | Description of the file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>          path: </pre> | Path to the file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be a relative file path</li></ul> |
|                     | <hr>    |
| <pre>      source:</pre> | Notable source files |
|                     | <ul><li>Must be an array</li></ul> |
|                     | <hr>    |
| <pre>        - description: </pre> | Description of the file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>          path: </pre> | Path to the file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be a relative file path</li></ul> |
|                     | <hr>    |
| <pre>      build:</pre> | Notable build files and artifacts |
|                     | <ul><li>Must be an array</li></ul> |
|                     | <hr>    |
| <pre>        - description: </pre> | Description of the file or artifact |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>          path: </pre> | Path to the file or artifact |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be a relative file path</li></ul> |
|                     | <hr>    |

## Example

```
source:
  - name: nukeit
    description: >-
      Implements a remote controlled nuclear missile launcher that is able
      to fire nuclear missiles at planets that are millions of miles away
    version: 1.0
      
    directory: /root/src/nukeit
    entrypoint: main.c
      
    license: /root/src/nukeit/GPLv2.txt
    authors:
      - Ronald Regan
      - John Kennedy
      
    notable:
      documentation:
        - description: Contains instructions for running
          path: README.md
          
      source:
        - description: Parses commandline arguments
          path: parse.c
          
        - description: Initializes the launcher
          path: init.c
        
        - description: Implements the remote controller
          path: main.c
          
      build:
        - description: Contains commands for building a nuke binary
          path: Makefile
          
        - description: The nuke binary, the output of a successful build
          path: nuke
```

## Best practices

+ Use a commit hash as the version, if available
+ Include a file containing the license instead of a license name
+ Include at least 2-3 notable source files
+ Include at least 1 file or script used to build the source code
