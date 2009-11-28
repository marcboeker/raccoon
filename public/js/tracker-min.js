var Tracker=function(){var j=undefined;var g=[];var d=function(){for(var a=0;a<g.length;++a){var e=g.shift();h(e[0],e[1])}g=null};var k=function(){var a=document.createElement('iframe');a.name='hidden-frame';a.id='hidden-frame';a.style.position='absolute';a.style.top='-1000px';a.style.left='-1000px';document.body.appendChild(a)};var m=function(){var a=document.getElementById('hidden-frame');a.parentNode.removeChild(a)};var n=function(a,e){if(g===null){h(a,e)}else{g.push([a,e])}};var h=function(a,e){k();var b=null;if(Tracker.url===undefined){b='http://127.0.0.1/pub?channel='+a}else{b=Tracker.url+'?channel='+a}e.channel=a;var c=document.createElement('form');c.id='hidden-form';c.action=b;c.method='post';c.enctype='text/plain';c.target='hidden-frame';document.body.appendChild(c);var f=document.getElementById('hidden-form');var i=document.createElement('input');i.type='text';i.name='';i.value=escape(JSON.stringify(e));f.appendChild(i);f.submit();c=document.getElementById('hidden-form');c.parentNode.removeChild(c);m()};return{init:d,track:n,url:''}}();window.onload=function(){Tracker.init()};if(!this.JSON){this.JSON={}}(function(){function k(a){return a<10?'0'+a:a}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+k(this.getUTCMonth()+1)+'-'+k(this.getUTCDate())+'T'+k(this.getUTCHours())+':'+k(this.getUTCMinutes())+':'+k(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var m=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,o,r={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},l;function q(b){n.lastIndex=0;return n.test(b)?'"'+b.replace(n,function(a){var e=r[a];return typeof e==='string'?e:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+b+'"'}function p(a,e){var b,c,f,i,j=h,g,d=e[a];if(d&&typeof d==='object'&&typeof d.toJSON==='function'){d=d.toJSON(a)}if(typeof l==='function'){d=l.call(e,a,d)}switch(typeof d){case'string':return q(d);case'number':return isFinite(d)?String(d):'null';case'boolean':case'null':return String(d);case'object':if(!d){return'null'}h+=o;g=[];if(Object.prototype.toString.apply(d)==='[object Array]'){i=d.length;for(b=0;b<i;b+=1){g[b]=p(b,d)||'null'}f=g.length===0?'[]':h?'[\n'+h+g.join(',\n'+h)+'\n'+j+']':'['+g.join(',')+']';h=j;return f}if(l&&typeof l==='object'){i=l.length;for(b=0;b<i;b+=1){c=l[b];if(typeof c==='string'){f=p(c,d);if(f){g.push(q(c)+(h?': ':':')+f)}}}}else{for(c in d){if(Object.hasOwnProperty.call(d,c)){f=p(c,d);if(f){g.push(q(c)+(h?': ':':')+f)}}}}f=g.length===0?'{}':h?'{\n'+h+g.join(',\n'+h)+'\n'+j+'}':'{'+g.join(',')+'}';h=j;return f}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(a,e,b){var c;h='';o='';if(typeof b==='number'){for(c=0;c<b;c+=1){o+=' '}}else if(typeof b==='string'){o=b}l=e;if(e&&typeof e!=='function'&&(typeof e!=='object'||typeof e.length!=='number')){throw new Error('JSON.stringify');}return p('',{'':a})}}if(typeof JSON.parse!=='function'){JSON.parse=function(i,j){var g;function d(a,e){var b,c,f=a[e];if(f&&typeof f==='object'){for(b in f){if(Object.hasOwnProperty.call(f,b)){c=d(f,b);if(c!==undefined){f[b]=c}else{delete f[b]}}}}return j.call(a,e,f)}m.lastIndex=0;if(m.test(i)){i=i.replace(m,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(i.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){g=eval('('+i+')');return typeof j==='function'?d({'':g},''):g}throw new SyntaxError('JSON.parse');}}}());