source "https://rubygems.org"

gem "jekyll", "~> 3.9.0"
gem "minima", "~> 2.0"
group :jekyll_plugins do
  gem "jekyll-theme-primer"
  gem "jekyll-optional-front-matter"
  gem "jekyll-default-layout"
  gem "jekyll-titles-from-headings"
  gem "jekyll-relative-links"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0", :install_if => Gem.win_platform?

# kramdown v2 ships without the gfm parser by default
gem "kramdown-parser-gfm"
gem "kramdown"
