# (configure run help) - Configure the 'run' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure run --check
```

## Summary

The run section contains information on executing the demo, so someone can execute it automatically using preconfigured scripts or manually using command-line arguments

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>run:</pre> | How to execute the demo |
|                     | <ul><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  description: </pre> | Summary of what the demo does |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  configs:</pre> | Preconfigured ways to run the demo |
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
| <pre>  examples:</pre> | Examples of command-line arguments |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    - description: </pre> | Description of arguments |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      args:</pre> | List of command-line arguments |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>        - </pre> | A command-line argument |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |

## Example

```
run:
  
  description: Nuke a planet
  
  configs:
    - name: mars
      description: Nuke the planet Mars
      script: /demo/run/mars.sh
      
    - name: jupiter
      description: Nuke the planet Jupiter
      script: /demo/run/jupiter.sh
      
  examples:
    - description: Send 5 nuclear missiles to Mars
      args:
        - '-n 5'
        - '-i /root/data/mars/coordinates.csv'
        
    - description: Nuke Jupiter and notify the UN
      args:
        - '--notify contact@un.org'
        - '-i /root/data/jupiter/coordinates.csv'
```

## Best practices

+ Use the preconfigured scripts to show off the demo&#39;s range of functionality
+ Keep the execution time of scripts and examples short (max 2-3 minutes)
+ Use only 2-3 arguments at a time in command-line examples
