#!/bin/bash
echo "Compiling all LESS files to CSS"
for file in src/**/*.less
do
    FROM=$file
    TO=${file/.*/.css}
    SOURCE_MAP=${file/.*/.css.map}
    echo "$FROM --> $TO & $SOURCE_MAP"
    node_modules/less/bin/lessc "$FROM" "$TO" --source-map="$SOURCE_MAP"
done
