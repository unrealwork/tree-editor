#!/usr/bin/env bash

script_dir=$(dirname "$0")
cd "$(dirname "$0")"
nohup java -jar ${script_dir}/bin/tree-editor-rest-service.jar -Dspring.config.location=file:config/ >/dev/null 2>&1;
