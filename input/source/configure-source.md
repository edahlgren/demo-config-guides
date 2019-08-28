# (configure {{name}} help) - Configure the '{{name}}' section of this demo

## Quick reference

View this section

```
$ cat /demo/demo.yml 
```

Check this section

```
$ demo configure {{name}} --check
```

## Summary

{{description}}

## Requirements

|                     |         |
| ------------------- | ------- |
|                     | <hr>    |
{{#layout}}
| <pre>{{line}}</pre> | {{doc}} |
|                     | <ul>{{#constraints}}<li>{{.}}</li>{{/constraints}}</ul> |
|                     | <hr>    |
{{/layout}}

## Example

```
{{&example}}
```

## Best practices

{{#best_practices}}
+ {{.}}
{{/best_practices}}
