#!/bin/bash
echo "Compiling all LESS files to CSS"
for file in src/**/*.less
do
    FROM=$file
    TO=${file/.*/.css}
    echo "$FROM --> $TO"
    node_modules/less/bin/lessc "$FROM" "$TO"
done
