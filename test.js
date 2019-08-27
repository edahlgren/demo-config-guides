const cli = require('command-line-args');
const yaml = require('js-yaml');
const fs   = require('fs');
const util = require('util');
const path = require('path');

const convert = require('./convert');

const cliSpec = [
    { name: 'specs', multiple: true },
    { name: 'md' },
    { name: 'html' },
    { name: 'outdir' }
];

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

    convert.makeDocs(config);
}

main();

function checkArgs(args) {
    if (!args.specs) {
        console.log("Need paths to example yaml files");
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
    var specs = [];
    args.specs.forEach(function(spec_file) {
        try {
            var spec = yaml.safeLoad(fs.readFileSync(spec_file, 'utf8'));
            specs.push(spec);
        } catch (error) {
            throw error;
        }
    });
    
    return dataForConfigure(specs);
}

function dataForConfigure(specs) {
    var out = {
        sections: []
    };

    specs.forEach(function(spec) {
        var name = Object.keys(spec)[0];
        out.sections.push({
            name: name,
            description: spec[name].doc
        });
    });

    return out;
}

const traverse = require('traverse');

function dataForSection(data, spec, example) {

    // Transform the example so it looks empty
    var empty = traverse(example).map(function(x) {
        // Remove duplicate sections
        if (this.key > 0) {
            this.remove();
            return;
        }
        
        // Make leaves look expandable
        if (this.isLeaf)
            this.update("~");
    });

    var text = yaml.dump(empty).trim();
    var cleaned = yamlText.replace("~", "");
    console.log(cleaned);
    

    return {};
}
