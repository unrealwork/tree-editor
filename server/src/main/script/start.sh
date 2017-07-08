#!/usr/bin/env bash

script_dir=$(dirname "$0")
java -jar ${script_dir}/bin/tree-editor-rest-service.jar -Dspring.config.location=file:config/
