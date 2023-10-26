#!/bin/bash
echo "Compiling all LESS files to CSS"

function compile_less() {
  FROM=$1
  TO=${FROM/.*/.css}
  SOURCE_MAP=${FROM/.*/.css.map}
  echo "$FROM --> $TO & $SOURCE_MAP"
  node_modules/less/bin/lessc "$FROM" "$TO" --source-map="$SOURCE_MAP"
}

export -f compile_less
find src -type f -name '*.less' -exec bash -c 'compile_less $1' shell {} \;
