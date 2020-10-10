pandoc -f markdown+mmd_title_block -t html -s -H './bin/mdpresenter.loader.dev.html' './docs/index.md' -o './docs/index.dev.html' && open './docs/index.dev.html'
