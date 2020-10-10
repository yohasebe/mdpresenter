git add .
git commit -m "..."
git push origin master
pandoc -f markdown+mmd_title_block -t html -s -H './docs/mdpresenter.loader.html' './docs/index.md' -o './docs/index.html' && open './docs/index.html'
