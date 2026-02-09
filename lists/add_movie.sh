#!/usr/bin/env bash

set -Eeuxo pipefail

temp_file=$(mktemp)

jq "if map(select(._title == \"${1}\")) | length == 0 then . + [{\"_title\": \"${1}\"}] end" movies.json > "${temp_file}"
mv "${temp_file}" movies.json
