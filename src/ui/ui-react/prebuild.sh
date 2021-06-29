#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# set path to find the 'node' command line executable
PATH=/usr/local/bin:$PATH
#env

# run the webpack builder

rm -rf ../../../src/main/resources/public
rm -rf $SCRIPT_DIR/dist/
/usr/local/bin/npx webpack --mode=production --node-env=production
mkdir ../../../src/main/resources/public
mv $SCRIPT_DIR/dist/* ../../../src/main/resources/public

exit 0
