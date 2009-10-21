require 'rubygems'
require 'rubygems/specification'
require 'fileutils'
require 'rake'
require 'rake/testtask'
require 'rake/gempackagetask'
require 'rbconfig'
include Config

gem_command = "gem"
gem_command = "gem1.9" if $0.match(/1\.9$/) # use gem1.9 if we used rake1.9

namespace :gem do
  desc "Install the gem locally"
  
  task :install do
    sh <<EOS
#{gem_command} build raccoon.gemspec && 
sudo #{gem_command} install raccoon-*.gem &&
    rm raccoon-*.gem
EOS
  end
end

task :default => :list

task :list do
  system 'rake -T'
end