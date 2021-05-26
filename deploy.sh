#!/usr/bin/env sh
set -e
npm run build
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy: 发布到 gh-pages'

git push -f https://github.com/crayonF/vuepress-plugin-game.git master:gh-pages

cd -