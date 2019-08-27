# (configure {{name}} help) - Configure the '{{name}}' section of this demo

## Quick reference

View the {{name}} configuration in

```
$ cat /demo/demo.yml 
```

Check the {{name}} configuration

```
$ demo configure {{name}} --check
```

## Layout

|          |                 |
| -------- | --------------- |
{{#layout}}
| ```{{line}}``` | {{doc}}         |
{{#constraints}}
|          | + {{.}}         |
{{/constraints}}
{{/layout}}

## Example

```
{{example}}
```
