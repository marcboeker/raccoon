$(document).ready(function() {
	$('#connect').click(App.connect);
	$('#subscribe').click(App.subscribe);
	$('#logsize').change(App.changeLogSize);
	$('#clear').click(App.clearLog);
});

var App = function() {
	var connections = {};
	var channels = {};
	var logSize = 10;
	
	var connect = function(channel) {
		channels[channel] = $.ajax({
			url: '/sub',
			data: {channel: channel},
			type: 'GET',
			dataType: 'text',
			success: function(data) {
				if (channels[channel] !== undefined) {
					connect(channel);
					message(data);
				}
			}
		});
	};
	
	var subscribe = function() {
		var channel = $('#channel').val();

		if (channels[channel] !== undefined) {
			return;
		}		
		
		if ($('#channels-container').css('display') == 'none') {
			$('#channels-container').fadeIn();
		}

		var new_channel = $('<button type="button" class="channel" />');
		new_channel.html(channel);
		new_channel.click(function() {
			unsubscribe(channel);
			$(new_channel).remove();
	
			if ($('#channels-container button').length == 0) {
				$('#channels-container').fadeOut();
			}
		});
		
		$('#channels').append(new_channel);
		connect(channel);
	};
	
	var unsubscribe = function(channel) {
		if (channels[channel] !== undefined) {
			channels[channel].abort();
			delete channels[channel];
		}
	};
	
	var message = function(message) {
		
		if (message.indexOf('=') == 0) {
			message = message.replace('=', '');
			message = unescape(message);
		}
		
		message = $.evalJSON(message);
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
		subscribe: subscribe,
		clearLog: clearLog,
		channels: channels,
		changeLogSize: changeLogSize
	};
}();