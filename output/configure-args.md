# (configure args help) - Configure the 'args' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure args --check
```

## Summary

The args section contains information on the command-line arguments that can be used to configure the execution of the demo.

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>args:</pre> | Command-line arguments for configuring the demo |
|                     | <ul><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  choose_one:</pre> | Groups of arguments, where you can only choose one commandline argument in the group |
|                     | <ul><li>Must be an array</li></ul> |
|                     | <hr>    |
| <pre>    - description: </pre> | Description of the options |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      required: </pre> | Whether one of these options must be specified |
|                     | <ul><li>Must be &#39;true&#39; or &#39;false&#39;</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      choices:</pre> | List of options |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>        - description: </pre> | A description of the option |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>          flags:</pre> | Choose this option using one of these flags |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>            - </pre> | A flag |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>          default: </pre> | Whether or not this option is used by the default |
|                     | <ul><li>Must be &#39;true&#39; or &#39;false&#39;</li></ul> |
|                     | <hr>    |
| <pre>  choose_any:</pre> | Use any of these commandline arguments |
|                     | <ul><li>Must be an array</li></ul> |
|                     | <hr>    |
| <pre>    - description: </pre> | Description of an option |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      flags:</pre> | Choose this option using one of these flags |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>        - </pre> | A flag |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      required: </pre> | Whether this option must be specified |
|                     | <ul><li>Must be &#39;true&#39; or &#39;false&#39;</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      default: </pre> | The default value of this option |
|                     | <ul><li>No requirements</li></ul> |
|                     | <hr>    |
| <pre>      example: </pre> | An example of this option with a value |
|                     | <ul><li>Must be a string</li></ul> |
|                     | <hr>    |

## Example

```
args:
  choose_one:    
    - description: Type of missile technology to use
      required: false
      choices:
        - description: Russian-designed missile
          flags:
            - "--russian"
          default: true

        - description: Korean-designed missile
          flags:
            - "--korean"
          default: false
            
  choose_any:
    - description: Number of missiles to fire
      flags:
        - "--num"
        - "-n"
      required: false
      default: 1
      example: "-n 5"
        
    - description: >-
        Path to a CSV file containing the coordinates of a planet
      flags:
        - "--input"
        - "-i"
      required: true
      example: "-i /root/data/mars/coordinates.csv"

    - description: Send an email with launch statistics
      flags:
        - "--notify"
      required: false
      example: "--notify contact@un.org"
```

## Best practices

+ Include examples for arguments that expect string values
+ Use the choose_one section only for mutually exclusive options
