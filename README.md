# About

Raccoon is a small Ruby application to help remote debugging and live tracking
of events. These events an be triggered from many languages. For example, you
can include a small JavaScript snippet in your online shop to monitor when
users add items to their shopping cart.

Another use case is remote debugging. You can use one of Raccoons client
libraries to hook into your code and send variables to the Raccoon server.
These will appear directly in the Raccoon console (running in your
webbrowser).

# Examples

To see live when users are adding items to their cart in your inline shop:

	<script src="/public/js/tracker.js" type="text/javascript"></script> 

	<script type="text/javascript">
		var x = Tracker('http://example.com:1337/hub');
	</script>
	
	<button type="button" onclick="x.track('/cart', {item: 'boots'});">
		Add Boots to cart
	</button>
	
You want to know the exact value of a variable in some remote code:

	require 'rubygems'
	require 'tracker'
	require 'sinatra'

	x = Tracker.new('http://example.com:1337/hub')

	get '/' do
		x.track('/debugging', params['num'])
		'give me ' + params['num']
	end

	run Sinatra::Application
	
# Installation

## Dependencies

Raccoon need the following dependencies. They all can be resolved with github.

- 	[Rack](http://github.com/chneukirchen/rack/ "Rack")
- 	[Sinatra](http://github.com/sinatra/sinatra "Sinatra")
- 	[Faye](http://github.com/jcoglan/faye/ "Faye")
- 	[Jake](http://github.com/tlrobinson/jake/ "Jake")

	sudo gem install rack sinatra faye jake
	
## Get Faye up and running

The only thing you need to do is to minify the Faye JavaScript. Please refer
to the [Faye installation instructions](http://github.com/jcoglan/faye/
 "Faye") for more information.

	cd <path-to-faye-gem>
	sudo jake -f
	
## Raccoonify it

	git clone git://github.com/marcboeker/raccoon.git
	cd raccoon
	rackup config.ru

Now you're able to access the Raccoon-Console in your browser at:

	http://<your-server-ip>:1337/
	
# Troubleshooting

**Raccoon does not show anything other than an empty console.**

- 	Have you minified the Faye JavaScript?
- 	Have you successfully connected and subscribed to a channel?
	(Verify this in FireBug and make sure you don't get any failed
	AJAX requests.)
- 	Are both URLs equal. The Raccoon server URL and the URL you have
	entered in your client? Don't miss the /hub at the end.

**I don't see anything when i call the Raccoon URL in my browser.**

- 	Do the ports in Raccoon and in your browsers URL bar match?
- 	Does your server has a firewall (iptables) installed?
