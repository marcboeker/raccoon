$(document).ready(function() {
	$('#connect').click(App.connect);
	$('#subscribe').click(App.subscribe);
	$('#logsize').change(App.changeLogSize);
	$('#clear').click(App.clearLog);
});

var App = function() {
	var hub = null;
	var channels = {};
	var logSize = 10;
	
	var connect = function() {
		$('#connect').fadeOut(function() {
			$('#disconnect').fadeIn(function () {
				$('#disconnect').click(disconnect);
			});
		});

		hub = new Faye.Client('/hub');
		hub.connect(function() {
			$('#subscribe').removeAttr('disabled');
		});
	};

	var disconnect = function() {
		$('#disconnect').fadeOut(function() {
			$('#connect').fadeIn(function () {
				$('#connect').click(connect);
			});
		});

		hub.disconnect();

		$('#subscribe').attr('disabled', 'disabled');
		$('#channels .channel').remove();
		channels = {};
	};
	
	var channelName = function(channel) {
		return channel.replace(/\//, '.')
	};
	
	var subscribe = function() {
		var channel = $('#channel').val();
		var channel_str = channelName(channel);
		
		if (channels[channel_str] !== undefined) {
			return;
		}		

		hub.subscribe(channel, message);
		channels[channel_str] = true;

		if ($('#channels-container').css('display') == 'none') {
			$('#channels-container').fadeIn();
		}

		var new_channel = $('<button type="button" class="channel" />');
		new_channel.html(channel);
		new_channel.click(function() {
			unsubscribe(channel);
			$(new_channel).remove();
	
			delete channels[channel_str];
	
			if ($('#channels-container button').length == 0) {
				$('#channels-container').fadeOut();
			}
		});
		
		$('#channels').append(new_channel);
	};
	
	var unsubscribe = function(channel) {
		hub.unsubscribe(channel);
	};
	
	var message = function(message) {
		var channel = message.channel;
		delete message.channel;
		
		var msg = $(
			'<div class="message" style="display: none;">'
			+ '<span>' + channel + '</span>' 
			+ JSON.stringify(message) 
			+ '</div>'
		);
		
		$('#log').prepend(msg);
		msg.fadeIn();
		
		msg.click(function() {
			$(this).fadeOut(function() {
				$(this).remove()
			});
		});

		trimLog();
	};
	
	var trimLog = function() {
		var ls = parseInt(logSize) - 1;
		
		if (ls < 0) {
			ls = 0;
		}
		
		$('#log div:gt(' + ls + ')').fadeOut();
		$('#log div:gt(' + ls + ')').remove();
	};
	
	var publish = function(channel, msg) {
		hub.publish(channel, msg);
	};
	
	var changeLogSize = function() {
		logSize = $('#logsize').val();
		trimLog();
	};
	
	var clearLog = function() {
		$('#log .message').each(function(idx, obj) {
			$(obj).fadeOut(function() {
				$(obj).remove();
			});
		});
		
	};
	
	return {
		connect: connect,
		disconnect: disconnect,		
		subscribe: subscribe,
		clearLog: clearLog,
		publish: publish,
		publish: publish,
		changeLogSize: changeLogSize
	};
}();