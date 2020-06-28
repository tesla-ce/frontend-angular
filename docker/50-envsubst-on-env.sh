#!/bin/sh

set -e

ME=$(basename $0)

auto_envsubst() {
  local defined_envs
  defined_envs=$(printf '${%s} ' $(env | cut -d= -f1))
  envsubst "$defined_envs" < "/tmp/env.template.js" > "/usr/share/nginx/html/env.js"
}

auto_envsubst

exit 0
