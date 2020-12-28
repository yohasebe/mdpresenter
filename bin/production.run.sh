ts=`date +%Y%m%d_%H%M%S`
file='./docs/mdpresenter.loader.html'
sed -i .bak "s/\?ts=[0-9]\{8\}\_[0-9]\{6\}/\?ts=$ts/g" $file
pandoc -f markdown+mmd_title_block -t html -s --quiet -H $file './docs/index.md' -o './docs/index.html'

git add .
git commit -m "..."
git push origin master

open './docs/index.html'
