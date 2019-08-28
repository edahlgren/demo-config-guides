const cli = require('command-line-args');
const yaml = require('js-yaml');
const fs   = require('fs');
const util = require('util');
const path = require('path');
const traverse = require('traverse');

const convert = require('./convert');

const cliSpec = [
    { name: 'extra' },
    { name: 'constraints' },
    { name: 'spec' },
    { name: 'example' },
    { name: 'md' },
    { name: 'html' },
    { name: 'outdir' }
];


// TODO:
//
// * Preserve indentation in the layout section
//
// * Indent (+)s by 2 spaces
//
// * Create lines that connect the 'line' and 'doc' column
//
// * Don't indent the code block if there's no header text
//   above it, like under 'Example'
//
// * Give the constraints a description instead of a weird name
//
// * Fill out the YAML guide
//
// * Add best practices


function main() {
    const args = cli(cliSpec);
    checkArgs(args);

    var topic = path.basename(args.md, '.md');
    var vars = parseVars(args, topic);

    var out = path.join(args.outdir, topic);
    var config = {
        vars: vars,
        template: {
            md: args.md,
            html: args.html
        },
        out: {
            md: out + '.md',
            html: out + '.html',
            text: out + '.text'
        }
    };

    convert.makeDocs(config, {
        separateTwoColumns: true,
        dotsBetweenColumns: true,
        minColumnPad: 10
    });
}

main();


function checkArgs(args) {
    if (!args.constraints) {
        console.log("Need path to constraint descriptions file");
        process.exit(1);
    }
    if (!args.spec) {
        console.log("Need path to spec yaml file");
        process.exit(1);
    }
    if (!args.extra) {
        console.log("Need path to extra data about this command");
        process.exit(1);
    }
    if (!args.example) {
        console.log("Need paths to example yaml file");
        process.exit(1);
    }
    if (!args.md) {
        console.log("Need a path to a markdown template");
        process.exit(1);
    }
    if (!args.html) {
        console.log("Need a path to an html template");
        process.exit(1);
    }
    if (!args.outdir) {
        console.log("Need a path to an output directory");
        process.exit(1);
    }
}

function parseVars(args, topic) {
    var constraints = {};
    try {
        constraints = yaml.safeLoad(fs.readFileSync(args.constraints, 'utf8'));
    } catch (error) {
        throw error;
    }
    if (!constraints.constraints) {
        console.log("Not a file containing constraint descriptions");
        process.exit(1);
    }
    
    var constraint_map = new Map();
    constraints.constraints.forEach(function(constraint) {
        var value = constraint_map.get(constraint.name);
        if (value) {
            console.log("Malformed file: constraint", constraint.name, "listed twice");
            process.exit(1);
        }
        constraint_map.set(constraint.name, constraint.description);
    });
    
    var spec = {};
    try {
        spec = yaml.safeLoad(fs.readFileSync(args.spec, 'utf8'));
    } catch (error) {
        throw error;
    }

    var extra = {};
    try {
        extra = yaml.safeLoad(fs.readFileSync(args.extra, 'utf8'));
    } catch (error) {
        throw error;
    }
    
    var example = {};
    try {
        example = yaml.safeLoad(fs.readFileSync(args.example, 'utf8'));
    } catch (error) {
        throw error;
    }
        
    return dataForSection(spec, extra.extra, example, args.example, constraint_map);
}

function dataForSection(spec, extra,
                        example, example_file,
                        constraint_descriptions) {
    
    // Transform the example so only the first fields remain
    var empty0 = traverse(example).map(function(x) {
        // Remove duplicate sections
        if (this.key > 0) {
            this.delete();
            return;
        }

        if (this.isLeaf)
            this.update("PLACEHOLDER");
    });

    var empty = traverse(empty0).map(function(x) {
        if (!x)
            this.remove();
    });

    // Find the signatures
    var meta = traverse(empty);
    var meta_paths = meta.paths();
    
    var end_index = meta_paths.length - 1;
    
    meta_paths = meta_paths.filter(function(path, index, array) {
        // Remove empty paths
        if (path.length == 0)
            return false;

        // Allow anything that's not a number
        var end = path[path.length - 1];
        var isNumber = /\d+/.test(end);
        if (!isNumber)
            return true;

        // Allow anything that's at the very end
        if (index + 1 == end_index)
            return true;

        // Disallow indexed fields that contain objects
        // or arrays
        var value = meta.get(path);
        if (typeof value === 'object' || Array.isArray(value))
            return false;

        return true;
    });
        
    var meta_signatures = meta_paths.map(function(path) {
        return joinPath(path);
    });

    // Assert that we can parse the same number of lines.
    var text = yaml.dump(empty).trim();
    var lines = text.replace(new RegExp("PLACEHOLDER", 'g'), "").split("\n");

    if (meta_signatures.length != lines.length) {
        console.log("Number of signatures don't match number of lines");
        process.exit(1);
    }
    
    // Find the specs for each line
    var specs = traverse(spec);
    var spec_paths = specs.paths();
    var signatures = new Map();
    spec_paths.forEach(function(spec_path) {
        var meta_path = spec2meta(spec_path);
        var meta_signature = joinPath(meta_path);

        if (signatures.has(meta_signature)) {
            return;
        }
        
        signatures.set(meta_signature, spec_path);
    });

    var sig2spec = meta_signatures.map(function(signature) {
        var spec_path = signatures.get(signature);
        if (!spec_path) {
            console.log("Can't find spec for meta field:", signature);
            process.exit(1);
        }
        var subspec = specs.get(spec_path);

        var constraints = subspec.constraints.map(function(constraint) {
            var desc = constraint_descriptions.get(constraint);
            if (!desc) {
                console.log("No description for", "'" + constraint + "'");
                process.exit(1);
            }
            return desc;
        });
        
        return {
            field: signature,
            doc: subspec.doc,
            constraints: constraints
        };
    });

    var doc_lines = [];
    lines.forEach(function(line, index, array) {
        var data = sig2spec[index];
        
        doc_lines.push({
            line: line,
            signature: data.signature,
            doc: data.doc,
            constraints: data.constraints
        });
    });

    return {
        name: Object.keys(spec)[0],
        layout: doc_lines,
        description: extra.description,
        example: fs.readFileSync(example_file, 'utf8').trim(),
        best_practices: extra.best_practices
    };
}

function spec2meta(path) {
    var out = [];
    for (var i = 0; i < path.length; i++) {
        var key = path[i];
        if (key === "content")
            continue;
        out.push(key);
    }
    return out;
}

function joinPath(path) {
    var out = [];
    for (var i = 0; i < path.length; i++) {
        var key = path[i];
        if (/\d+/.test(key)) {
            out.push("[" + key + "]");
        } else {
            out.push("." + key);
        }
    }
    return out.join('');
}
