#!/bin/sh

set -e

ME=$(basename $0)

export VERSION=$(cat /usr/share/nginx/html/ui/frontend_version)

auto_envsubst() {
  local defined_envs
  defined_envs=$(printf '${%s} ' $(env | cut -d= -f1))
  envsubst "$defined_envs" < "/tmp/env.template.js" > "/usr/share/nginx/html/ui/env.js"
}

auto_envsubst

exit 0
