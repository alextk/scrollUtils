require 'rubygems'
gem 'rego-ruby-ext'
require "rego-ruby-ext"
gem 'rego-js-builder'
require "rego-js-builder"
gem 'rake-hooks'
require 'rake/hooks'

project = JsProjectBuilder.new(
  :name => 'scrollUtils',
  :description => 'jQuery plugin for calculations of scrollbar position and viewport',
  :file_name => 'jquery.scrollbar-utils.js',
  :js_files => %w{scrollbar-size.js  viewport.js}
)
JsProjectBuilder::Tasks.new(project)

