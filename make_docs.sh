#!/bin/bash

echo ""
echo "... making 'configure'"
node test.js \
     --specs input/title/spec.yml \
     input/run/spec.yml \
     input/build/spec.yml \
     input/io/spec.yml \
     input/args/spec.yml \
     input/source/spec.yml \
     input/data/spec.yml \
     input/papers/spec.yml \
     --md input/configure.md \
     --html input/guide.html \
     --outdir output

for dir in $( find input -maxdepth 1 -mindepth 1 -type d -printf '%f\n' ); do
    echo ""
    echo "... making 'configure '${dir}'"
    node test-section.js \
         --constraints input/constraints.yml \
         --extra input/$dir/extra.yml \
         --spec input/$dir/spec.yml \
         --example input/$dir/example.yml \
         --md input/$dir/configure-$dir.md \
         --html input/guide.html \
         --outdir output;
done
