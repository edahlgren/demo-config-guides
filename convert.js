const fs = require('fs');

const mustache = require('mustache');
const remarkable = require('remarkable');
const htmlToText = require('html-to-text');

const compact = require('lodash/compact');
const zip = require('lodash/zip');
const max = require('lodash/max');
const padEnd = require('lodash/padEnd');
const get = require('lodash/get');

const wrap = require('word-wrap');

// vars for template.md
// template.md
// template.html
// out.md
// out.html
// out.text

function makeDocs(config, options) {
    // Create the markdown
    var md = renderMarkdown(config);
    fs.writeFileSync(config.out.md, md);
    console.log("Wrote", config.out.md);

    // Create the html body
    var innerHtml = renderInnerHtml(md);
    
    // Create the full html file
    var html = renderHtml(config, innerHtml);
    fs.writeFileSync(config.out.html, html);
    console.log("Wrote", config.out.html);

    if (!options)
        options = {
            separateTwoColumns: false,
            dotsBetweenColumns: false,
            minColumnPad: 2
        };

    // Create the text file
    var text = renderText(innerHtml, options);
    fs.writeFileSync(config.out.text, text);
    console.log("Wrote", config.out.text);
}

function renderMarkdown(config) {
    var md = '';
    try {
        md = fs.readFileSync(config.template.md, 'utf8');
    } catch (error) {
        throw error;
    }

    try {    
        md = mustache.render(md, config.vars);
    } catch (error) {
        throw error;
    }

    return md;
}

function renderInnerHtml(md) {
    var htmlTemplate = '<div class="guide">{{&content}}</div>';
    var mdParser = new remarkable({ html: true, breaks: true });
    
    var inner = '';
    try {
        inner = mdParser.render(md);
    } catch (error) {
        throw error;
    }

    var html = '';
    try {
        html = mustache.render(htmlTemplate, { content: inner });
    } catch (error) {
        throw error;
    }

    return html;
}

function renderHtml(config, innerHtml) {
    var html = '';
    try {
        html = fs.readFileSync(config.template.html, 'utf8');
    } catch (error) {
        throw error;
    }

    try {
        html = mustache.render(html, { guide: innerHtml });
    } catch (error) {
        throw error;
    }

    return html;
}

function renderText(html, extraOptions) {
    var buffer = '';

    // Write heading
    var empty = " ";
    buffer += empty.repeat(60) + "type 'q' to exit\n";
    buffer += empty.repeat(60) + "scroll to view all\n";

    try {
        buffer += __renderText(html, extraOptions);
    } catch (error) {
        throw error;
    }

    return buffer;
}

function __renderText(html, extraOptions) {
    var buffer = '';
    
    // Only parses headings, paragraphs, and tables. Code is
    // handled in paragraphs
    htmlToText.fromString(html, {
        baseElement: "div.guide",
        
        // Parse all tables
        tables: true,

        // Don't uppercase headings as they're parsed
        uppercaseHeadings: false,

        // Won't have any images so doesn't matter
        ignoreImage: true,
        
        // This doesn't seem to work properly
        wordwrap: 70,

        unorderedListItemPrefix: '+ ',

        spaceTwo: extraOptions.separateTwoColumns,
        drawDots: extraOptions.dotsBetweenColumns,
        minColumnPad: extraOptions.minColumnPad,
        
        format: {
            heading: function(elem, fn, options) {
                let text = formatHeading(elem, fn, options);
                buffer += text;
                return text;
            },
            paragraph: function(elem, fn, options) {
                let text = formatParagraph(elem, fn, options);
                buffer += text;
                return text;
            },
            table: function(elem, fn, options) {
                let text = formatTable(elem, fn, options);
                buffer += text;
                return text;
            },
            lineBreak: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning: didn't write line break: " +
                            elem.name + ": " + text);
                return text;
            },
            anchor: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning: didn't write anchor: " +
                            elem.name + ": " + text);
                return text;
            },
            orderedList: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write ordered list: " +
                            elem.name + ": " + text);
                return text;
            },
            unorderedList: function(elem, fn, options) {
                let text = formatUnorderedList(elem, fn, options);
                buffer += text;
                return text;                
            },
            listItem: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write list item: " +
                            elem.name + ": " + text);
                return text;
            },
            horizontalLine: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write horizontal line: " +
                            elem.name + ": " + text);
                return text;
            }
        }
    });

    return buffer;
}

var header = '';
function formatIndent(inHeader) {
    if (inHeader) {
        switch (header) {
        case 'h1':
            return '  ';
        case 'h2':
            return '  ';
        case 'h3':
            return '    ';
        case 'h4':
            return '      ';
        default:
            return '  ';
        }
    }
    
    switch (header) {
    case 'h1':
        return '  ';
    case 'h2':
        return '    ';
    case 'h3':
        return '      ';
    case 'h4':
        return '        ';
    default:
        return '  ';
    }
}

function isHeader(elem) {
    if (elem.type !== "tag")
        return false;
    
    switch(elem.name.toLowerCase()) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
        return true;
    default:
        return false;
    }
}

function formatHeading(elem, fn, options) {
    header = elem.name;            

    let text = '';
    switch (header) {
    case 'h1':
    case 'h2':
        text = '\n';
        break;
    }
        
    let orig = fn(elem.children, options);    
    text += formatIndent(true) + orig + '\n';

    switch (header) {
    case 'h1':
        text += '\n';
        break;
    case 'h2':
        text += formatIndent(true) +  ("=").repeat(orig.length) + '\n';
        break;
    }
    
    text += '\n';
    
    return text;
}

function formatParagraph(elem, fn, options) {
    let prev = elem.prev;
    while (prev) {
        if (prev.type === "text" &&
            prev.data.trim().length == 0) {
            prev = prev.prev;
            continue;
        }
        break;
    }

    let firstAfterHeader = prev && isHeader(prev);
    let code = isCode(elem, options);
    
    let text = fn(elem.children, options);
    let lines = text.split('\n');
    let _indent = formatIndent(false);

    if (!firstAfterHeader && code)
        _indent += '  ';

    text = '';
    lines.forEach(function(line) {
        text += _indent + line + '\n';
    });
    
    if (!code)
        text += '\n';
    
    return text;
}

function isCode(elem, options) {
    var result = (options.isInPre &&
                  elem.children.length == 1 &&
                  elem.children[0].name == 'code');
    if (!result)
        return false;
    return result;
}

function formatBareHeading(elem, fn, options) {
    var heading = fn(elem.children, options);
    if (options.uppercaseHeadings) {
        heading = heading.toUpperCase();
    }
    return heading + '\n';
}

function formatTable(elem, fn, options) {
    var table = [];
    function tryParseRows(elem) {
        if (elem.type !== 'tag') {
            return;
        }
        switch (elem.name.toLowerCase()) {
        case "thead":
        case "tbody":
        case "tfoot":
        case "center":
            elem.children.forEach(tryParseRows);
            return;            
        case 'tr':
            var row = [];
            elem.children.forEach(function(elem) {
                let newOptions = JSON.parse(JSON.stringify(options));
                newOptions.wordwrap = 1000;
                if (elem.type === 'tag') {
                    switch (elem.name.toLowerCase()) {
                    case 'th':
                        let rawHeading = formatBareHeading(elem, fn, newOptions);
                        row.push(rawHeading);
                        break;
                        
                    case 'td':
                        var isPre = (elem.children.length == 1 &&
                                     elem.children[0].name === 'pre');
                        var isList = (elem.children.length == 1 &&
                                      elem.children[0].name === 'ul');
                        var isHr = (elem.children.length == 1 &&
                                      elem.children[0].name === 'hr');
                        
                        let rawText = fn(elem.children, newOptions);
                        if (isPre || isList)
                            rawText = rawText.trimRight();

                        if (isList)
                            rawText = rawText.split('\n').map(function(item) {
                                return '  ' + item;
                            }).join('\n');
                        
                        if (isHr)
                            rawText = "<hr>";
                        
                        row.push(rawText);
                        break;
                    }
                }
            });
            
            row = row.map(function(col) {
                return col || '';
            });
            table.push(row);
            break;
        }
    }    
    elem.children.forEach(tryParseRows);

    let lines = tableToString(table, options).split('\n');

    let text = '';
    lines.forEach(function(line) {
        text += formatIndent(false) + line + '\n';
    });

    return text;    
}

function tableToString(table, options) {
    // Find heading rows and remove them
    var headings = {};
    var hasHeadings = false;
    for (let r = 0; r < table.length; r++) {
        let firstCol = table[r][0];
        if (firstCol.startsWith('___')) {
            hasHeadings = true;
            headings[r] = firstCol.replace("___", "").trim();
        } else {
            headings[r] = "";
        }
    }
    
    // Determine space width per column
    // Convert all rows to lengths
    var widths = table.map(function(row) {
        return row.map(function(col) {
            if (col.startsWith('___'))
                return 0;
            let lines = col.split('\n').map(function(line) {
                return line.length;
            });
            return max(lines);
        });
    });
    
    // Invert rows with colums
    widths = zip.apply(null, widths);
    // Determine the max values for each column
    widths = widths.map(function(col) {
        return max(col);
    });

    // Fill out remaining space
    var onlyTwo = (widths.length == 2);
    if (options.spaceTwo && onlyTwo) {
        if ((widths[0] + widths[1]) < 90)
            widths[0] = 90 - widths[1];
    }

    // Build the table
    var text = '';
    var lastRow = table.length - 1;
    for (let r = 0; r < table.length; r++) {
        if (hasHeadings && headings[r].length > 0) {
            if (r > 1)
                text += '\n';
            text += headings[r] + '\n\n';
            continue;
        }
        
        var t = '';
        let row = table[r];

        // Manually wrap around the last column
        let firstLen = 0;        
        let last = row.length - 1;

        // Handle row
        var hasBreak = false;
        for (var j = 0; j < row.length; j++) {
            let col = row[j];            
            let width = widths[j];

            var isBreak = (col === "<hr>");
            if (isBreak)
                col = " ";
            hasBreak = hasBreak | isBreak;

            var extraPadEnd = ' '.repeat(options.minColumnPad);
            
            if (j < last) {
                // Handle columns before last
                let fmt = padEnd(col, width, ' ') + extraPadEnd;
                if (options.drawDots && col.trim().length > 0)
                    fmt = padEnd(col, width + extraPadEnd.length - 1, ' .') + ' ';
                    
                t += fmt;
                firstLen += fmt.length;
                continue;
            }

            // Handle the last column specially
            let max = options.wordwrap - firstLen;
            if (max < 45)
                max = 45;

            let prelines = col.split('\n');
            let hasLines = prelines.length > 1;

            // Handle simple case (no multi-line or wrap necessary)
            if (!hasLines && col.length <= max) {
                t += col;
                break;
            }

            let lines = [];
            prelines.forEach(function(line) {
                let sublines = wrap(line, { width: max, indent: '' }).split('\n');
                sublines.forEach(function(subline) {
                    lines.push(subline);
                });
            });

            // Get wrapped lines
            //let lines = wrap(col, { width: max, indent: '' }).split('\n');
            
            // Handle the first
            t += lines[0];
            if (lines.length > 1) {
                for (let l = 1; l < lines.length; l++) {
                    t += '\n' + (' ').repeat(firstLen) + lines[l];
                }
            }
            break;
        }

        // Skip empty rows
        if (!hasBreak && t.trim().length == 0)
            continue;

        // Create inner table headings
        if (hasHeadings)
            text += '  ' + t + '\n';
        else
            text += t + '\n';
    }
    
    return text;
}

var whiteSpaceRegex = /^\s*$/;

function formatUnorderedList(elem, fn, options) {
    // if this list is a child of a list-item,
    // ensure that an additional line break is inserted
    var parentName = get(elem, 'parent.name');
    var result = parentName === 'li' ? '\n' : '';
    var prefix = options.unorderedListItemPrefix;
    var nonWhiteSpaceChildren = (elem.children || []).filter(function(child) {
        return child.type !== 'text' || !whiteSpaceRegex.test(child.data);
    });
    nonWhiteSpaceChildren.forEach(function(elem) {
        result += formatListItem(prefix, elem, fn, options);
    });
    return result + '\n';
}

function formatListItem(prefix, elem, fn, options) {
    options = Object.assign({}, options);
    // Reduce the wordwrap for sub elements.
    if (options.wordwrap) {
        options.wordwrap -= prefix.length;
    }
    // Process sub elements.
    var text = fn(elem.children, options);
    var indent = formatIndent(false);
    
    // Replace all line breaks with line break + prefix spacing.
    text = text.replace(/\n/g, '\n' + indent + ' '.repeat(prefix.length));
    // Add first prefix and line break at the end.
    return formatIndent(false) + prefix + text + '\n\n';
}

module.exports = {
    makeDocs: makeDocs
};
