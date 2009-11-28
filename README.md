# About

Raccoon is a small tool to help you with remote debugging and live tracking
of events. These events can be triggered from many languages. For example, you
can include a small JavaScript snippet in your online shop to monitor when
users add items to their shopping cart.

Another use case is remote debugging. You can use one of Raccoons client
libraries to hook into your code and send variables to the Raccoon server.
These will appear directly in the Raccoon console (running in your
webbrowser).

# Examples

To see live when users are adding items to their cart in your online shop:

	<script src="/public/js/tracker.js" type="text/javascript"></script> 

	<script type="text/javascript">
		Tracker.url = 'http://127.0.0.1/pub';
	</script>
		
	<button type="button" onclick="Tracker.track('cart', {item: 'boots'});">
		Add Boots to cart
	</button>
	
You want to know the exact value of a variable in some remote code:

	require 'rubygems'
	require 'tracker'
	require 'sinatra'

	get '/' do
	 	Tracker.new('http://127.0.0.1/pub').track('444', params['num'])
		'give me ' + params['num']
	end

	run Sinatra::Application
	
# Installation

## Dependencies

Raccoon need the following dependencies. They all can be resolved with github.

- 	[NGiNX HTTP push module](http://github.com/slact/nginx_http_push_module 
"NGiNX HTTP push module")
	
To install the NGiNX HTTP push module, please compile NGiNX with the following
options:

	./configure --add-module=/path/to/push-module
	make
	sudo make install
		
## Raccoonify it

	git clone git://github.com/marcboeker/raccoon.git

Now edit the nginx.conf at raccoon/conf/nginx.conf to point to your
raccoon working dir.

	location / {
		root /path/to/raccoon/public/;
		index index.html;
	}
	
Start nginx with the config file:

	/usr/sbin/nginx -c /path/to/raccoon/conf/nginx.conf

Now you're able to access the Raccoon-Console in your browser at:

	http://<your-server-ip>/
	
Enter a random channel name like "banana" and press subscribe. The channel
should appear in the channel bar. Now take another browser and open the
following URL.

	http://<your-server-ip>/tracktest.html
	
Enter the same channel identifier you have used before, type in your message
and hit the submit button. The message should appear in the raccoon console.
