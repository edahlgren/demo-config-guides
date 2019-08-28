# (configure data help) - Configure the 'data' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure data --check
```

## Summary

The data section contains information about included datasets that are compatible with the demo, for executing a number of experiments.

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>data:</pre> | Included data sets for experimenting |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>  - title: </pre> | Title or short description of the dataset |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    description: </pre> | Longer description of the data |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    source: </pre> | Where the dataset comes from (e.g. an institution, a website) |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>    url: </pre> | Where the dataset can be found online |
|                     | <ul><li>Must be a string</li><li>Must be an http or https url path</li></ul> |
|                     | <hr>    |
| <pre>    files:</pre> | Files from the dataset in the demo |
|                     | <ul><li>Must be an array</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>      - description: </pre> | Description of the file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>        path: </pre> | Path to the file |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li><li>Must be an absolute file path</li></ul> |
|                     | <hr>    |
| <pre>        metadata:</pre> | Facts about the file |
|                     | <ul><li>Must be an array</li></ul> |
|                     | <hr>    |
| <pre>          - description: </pre> | Description of the statistic |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |
| <pre>            data: </pre> | The statistic |
|                     | <ul><li>Must be a number</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |

## Example

```
data:
  - title: Planetary Locations Dataset
    description: >-
      CSV formatted files containing the coordinates of planets in Earth's
      solar system
    source: Institute for Evil Research
    url: "http://www.ier.org/datasets/planets.html"
    
    files:
      - description: CSV file containing the coordinates of Mars
        path: /root/data/mars/coordinates.csv
        metadata:
          - description: Average distance from Earth (million miles)
            data: 140
          - description: Planetary order relative to the Sun
            data: 4
            
      - description: CSV file containing the coordinates of Jupiter
        path: /root/data/jupiter/coordinates.csv
        metadata:
          - description: Average distance from Earth (million miles)
            data: 483
          - description: Planetary order relative to the Sun
            data: 5
```

## Best practices

+ Include 2-3 metadata statistics about each file to show differences
+ Include the file format in the file description
+ Use URLs from the source&#39;s website
