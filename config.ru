#\ -p 1337

require 'rubygems'
require 'faye'
require 'sinatra'
require 'app'

use Rack::Static, :urls => ['/public']
use Faye::RackAdapter, :mount   => '/hub', :timeout => 10
run Sinatra::Application