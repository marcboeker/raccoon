require 'rake'

begin
  require 'rubygems'
  require 'jeweler'
  Jeweler::Tasks.new do |s|
    s.name = "raccoon"
    s.rubyforge_project = "raccoon"
    s.summary = "Live tracking of events, called in webapps"
    s.email = "marc.boeker@onchestra.com"
    s.homepage = "http://github.com/marcboeker/raccoon"
    s.description = "Use raccoon to debug you application (via a Ruby/Python/PHP client) or embed a JavaScript into your webpage and see what the users are doing."
    s.authors = ["Marc Boeker"]
    s.files = FileList["[A-Z]*.*", "lib/**/*"]
    s.add_dependency('jake')
  end
rescue LoadError
  puts "Jeweler not available. Install it with: sudo gem install technicalpickles-jeweler -s http://gems.github.com"
end