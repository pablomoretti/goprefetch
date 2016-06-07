function goprefetch() {
	'use strict';

	function addDate(node, localDate){
		if(node.href.indexOf("?") != -1){
			node.href += "&prefetchDate=" + localDate;
		} else{
			node.href += "?prefetchDate=" + localDate;
		}
	}

	var nodes = window.document.querySelectorAll('[data-prefetch]');

	var i = 0,
		len = nodes.length,
		node,
		hint,
		SET_ATTRIBUTE = "setAttribute",
		cache = {},
		localDate = new Date().getTime()
		;

	for (i; i < len; i += 1) {
		node = nodes[i];

		addDate(node, localDate);

		if( !cache[node.href] ) {

			cache[node.href] = true;

			hint = document.createElement('link');
			hint[SET_ATTRIBUTE]('rel', 'prefetch');
			hint[SET_ATTRIBUTE]('href', node.href);
			hint[SET_ATTRIBUTE]('as', node.getAttribute('data-prefetch'));
			document.getElementsByTagName('head')[0].appendChild(hint);
		}
	}

	return nodes;
}