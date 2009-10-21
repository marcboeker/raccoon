PACKAGE_FILES = [
  'LICENSE',
	'raccoon.gemspec',
	'app.rb',
	'config.ru',
	'README.md',
	'lib/tracker.rb',
	'views/index.html',
	'public/css/reset.css',
	'public/css/960.css',
	'public/css/style.css',
	'public/css/text.css',
	'public/js/app.js',
	'public/js/jquery.js',
	'public/js/tracker.js',
	'public/img/header.png',
]

Gem::Specification.new do |s|
  s.name = 'raccoon'
  s.version = '0.1'
  s.platform = Gem::Platform::RUBY
  s.summary = 'Live tracking of events'
  s.description = 'Debug remote and show results in browser.'

  s.require_paths = ['lib']
  s.files = PACKAGE_FILES
  
  s.has_rdoc = true
  #s.rdoc_options = ['--main', 'README.rdoc', '--inline-source']
  #s.extra_rdoc_files = ['README.rdoc']

  s.authors = ['Marc Boeker']
  s.email = 'marc.boeker@onchestra.com'
  s.homepage = 'http://www.onchestra.com/'
end
