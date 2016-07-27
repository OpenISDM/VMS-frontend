#!/bin/bash
path=`dirname $0`

npm install && bower install --allow-root && "$path"/../node_modules/.bin/gulp serve
