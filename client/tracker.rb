require 'rubygems'
require 'net/http'
require 'json'

# Send messages to broadcast hub.
# 
# Tracker.new(<base_url>).track(<channel>, <hash>)
#
class Tracker
  def initialize(url = nil)
    if url == nil
      @url = 'http://127.0.0.1/pub?channel='
    else
      @url = url + '?channel='
    end
  end
  
	def track(channel, data)
	  if data.class != Hash
	    data = {:data => data, :channel => channel}
	  else
	    data[:channel] = channel
	  end

	  url = URI.parse(@url + channel)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.post("#{url.path}?#{url.query}", data.to_json)
    }
	end
end

 