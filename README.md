# Notes

Personal notes made public.

```sh
# Build ToC
cd _notes && python ../generate-toc.py toc.md
# remove subfolder prefixes in the links (i.e. crypto/abc.md --> abc.md) and drop the
# .md suffixes
mv _notes/toc.md _pages/toc.md

# Run website
bundle
bundle exec jekyll serve
```
