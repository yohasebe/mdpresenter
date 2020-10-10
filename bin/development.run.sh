ts=`date +%Y%m%d_%H%M%S`
file='./bin/mdpresenter.loader.dev.html'
sed -i .bak "s/\?ts=[0-9]\{8\}\_[0-9]\{6\}/\?ts=$ts/g" $file
pandoc -f markdown+mmd_title_block -t html -s -H $file './docs/index.md' -o './docs/index.dev.html' && open './docs/index.dev.html'
