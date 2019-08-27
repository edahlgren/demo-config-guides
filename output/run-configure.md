# (configure run help) - Configure the 'run' section of this demo

## Quick reference

View the run configuration in

```
$ cat /demo/demo.yml 
```

Check the run configuration

```
$ demo configure run --check
```

## Layout

|          |                 |
| -------- | --------------- |
| ```run:``` | How to execute the demo         |
|          | + non-empty         |
| ```  description: ``` | Summary of what the demo does         |
|          | + String         |
|          | + non-empty         |
| ```  configs:``` | Preconfigured ways to run the demo         |
|          | + Array         |
|          | + non-empty         |
| ```    - name: ``` | Name of the configuration         |
|          | + String         |
|          | + non-empty         |
| ```      description: ``` | Description of the configuration         |
|          | + String         |
|          | + non-empty         |
| ```      script: ``` | Path to a script that will execute this configuration         |
|          | + String         |
|          | + non-empty         |
|          | + absolute-path         |
| ```  examples:``` | Examples of command-line arguments         |
|          | + Array         |
|          | + non-empty         |
| ```    - description: ``` | Description of arguments         |
|          | + String         |
|          | + non-empty         |
| ```      args:``` | List of command-line arguments         |
|          | + Array         |
|          | + non-empty         |
| ```        - ``` | A command-line argument         |
|          | + String         |
|          | + non-empty         |

## Example

```
run:
  
  description: Nuke a planet
  
  configs:
    - name: mars
      description: Nuke the planet Mars
      script: &#x2F;demo&#x2F;run&#x2F;mars.sh
      
    - name: jupiter
      description: Nuke the planet Jupiter
      script: &#x2F;demo&#x2F;run&#x2F;jupiter.sh
      
  examples:
    - description: Send 5 nuclear missiles to Mars
      args:
        - &#39;-n 5&#39;
        - &#39;-i &#x2F;root&#x2F;data&#x2F;mars&#x2F;coordinates.csv&#39;
        
    - description: Nuke Jupiter and notify the UN
      args:
        - &#39;--notify contact@un.org&#39;
        - &#39;-i &#x2F;root&#x2F;data&#x2F;jupiter&#x2F;coordinates.csv&#39;
```