#!/bin/bash

# remove console.log and console.warn statements from all ts, tsx and js files in the current directory.
# making it executable by running chmod +x remove-console-log-warn.sh and then running the script ./remove-console-log-warn.sh.
find . \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i '' -e 's/console.log(.*);//g' -e 's/console.warn(.*);//g' {} +


# This script uses the find command to search for all files with the .ts, .tsx and .js extension in the current directory, 
# and then uses the sed command to remove all instances of console.log and console.warn statements from those files.