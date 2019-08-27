# (configure help) - Configure this demo

## Quick reference

View the entire configuration

```
$ cat /demo/demo.yml
```

Check your changes to the configuration file

```
$ demo configure --check
```

## Summary

The 'demo configure' command does a lot of things. This is where we talk about them in greater detail so people know how to use it.

## Overview

|          |                |
| -------- | -------------- |
| Format   | YAML           |
| Location | /demo/demo.yml |

### Sections

|          |                 |
| -------- | --------------- |
{{#sections}}
| {{name}} | {{description}} |
{{/sections}}

## More details

Learn about a section

```
$ demo configure <section>
```

For example

```
$ demo configure run
$ demo configure args
```

## YAML

This is a brief guide to the YAML file format.
