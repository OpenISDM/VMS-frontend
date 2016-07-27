#!/bin/bash

set NODE_ENV=production

path=`dirname $0`
config_file="$path/../config.json"

if [ ! -f "$config_file" ];then
  echo -e "\033[0;31m [ERROR] The config.json was not found. \033[0m"
  exit
fi

cd "$path/.." && gulp build
