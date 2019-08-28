# (configure title help) - Configure the 'title' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure title --check
```

## Summary

The title section contains a short description of the demo, which will appear at the top of its generated documentation

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
| <pre>title: </pre> | Title of the demo |
|                     | <ul><li>Must be a string</li><li>Can&#39;t be missing or empty</li></ul> |
|                     | <hr>    |

## Example

```
title: Nuclear planetary destruction
```

## Best practices

+ Keep your title short (3-6 words)
+ Include words that highlight what&#39;s unusual about your demo
