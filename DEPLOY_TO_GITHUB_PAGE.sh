#!/bin/bash
cname_file=$(pwd)/public/CNAME
build_dir=$(pwd)/dist
origin_address=git@github.com:ResonateWithMe/blog-admin-web.git

function build() {
    echo "start build..."
    npm install && npm run build
}

function pushBuild() {
    echo push "$build_dir" to master barch
    cp "$cname_file" "$build_dir"
    cd "$build_dir"
    git init && git add -A && git commit -m 'chore: update' && git push -f $origin_address master
}

build
pushBuild
