# (configure io help) - Configure the 'io' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure io --check
```

## Summary

The io section contains information about the input files used to run the demo and the output files that it produces

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>io:</pre> | Input and output of the demo (files) |
|                     | <ul><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  input:</pre> | Input files |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    - description: </pre> | Description of the input file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      format: </pre> | &quot;The input file&#39;s format (e.g. CSV). Use &#39;custom&#39; if unknown&quot; |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      example: </pre> | Path to an example of this type of file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |
| <pre>  output:</pre> | Output files |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    - description: </pre> | Description of the output file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      format: </pre> | &quot;The output file&#39;s format (e.g. CSV). Use &#39;custom&#39; if unknown&quot; |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      example: </pre> | Path to an example of this type of file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |

## Example

```
io:
  input:
    - description: Coordinates of a planet
      format: CSV
      example: /root/data/mars/coordinates.csv
      
  output:
    - description: Angle and speed of the launched nuke
      format: custom
      example: /root/run/expected/launch.stats
```

## Best practices

+ Use example input files in preconfigured run scripts
+ Include an exact example of expected output for the example input
