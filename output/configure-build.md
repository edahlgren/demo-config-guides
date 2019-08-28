# (configure build help) - Configure the 'build' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure build --check
```

## Summary

The build section contains information on building the demo, so someone can build it automatically using preconfigured scripts or manually using command-line arguments.

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>build:</pre> | How to build the demo |
|                     | <ul><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  clean: </pre> | A path to a script that removes old build artifacts |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |
| <pre>  configs:</pre> | Preconfigured ways to build the demo |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    - name: </pre> | Name of the configuration |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      description: </pre> | Description of the configuration |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      script: </pre> | Path to a script that will execute this configuration |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |

## Example

```
build:  
  clean: /demo/build/clean.sh
  
  configs:
    - name: default
      description: Build the nuclear launcher with gcc
      script: /demo/build/default.sh
      
    - name: optimized
      description: Build the nuclear launcher at optimization level 3
      script: /demo/build/optimized.sh

    - name: debug
      description: Build the nuclear launcher with debug symbols
      script: /demo/build/debug.sh
```

## Best practices

+ Use preconfigured scripts to execute optimized and debug builds
+ Build scripts should show progress if they take longer than several seconds
+ The clean script should remove _all_ build artifacts
