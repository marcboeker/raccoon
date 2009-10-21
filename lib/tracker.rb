require 'rubygems'
require 'net/http'
require 'json'

class Tracker

  def initialize(url=nil)
    if url == nil
      @url = 'http://127.0.0.1:1337/hub'
    else
      @url = url
    end
  end
  
	def track(channel, data)
	  if data.class != Hash
	    data = {:data => data, :channel => channel}
	  else
	    data[:channel] = channel
	  end
	  
		res = Net::HTTP.post_form(
		  URI.parse(@url), {:message => 
		    [{:channel => channel, :clientId => '', :data => data}].to_json
		})
	end
	
end