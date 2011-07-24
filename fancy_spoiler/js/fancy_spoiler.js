/*jslint browser: true, maxerr: 50, indent: 4 */
/*global PUNBB: true */

if (typeof PUNBB === 'undefined' || !PUNBB) {
	var PUNBB = {};
}


// INSTALL
PUNBB.fancy_spoiler = (function () {
	'use strict';

	//
	function visible(el) {
		return (el.offsetWidth !== 0);
	}

	//
	function spoiler_switcher_onclick(switcher) {
		return function () {
			var spoiler_block;

			spoiler_block = switcher.nextSibling;
			if (spoiler_block && PUNBB.common.hasClass(spoiler_block, 'fancy_spoiler')) {
				if (!visible(spoiler_block)) {
					spoiler_block.style.display = 'block';
					switcher.innerHTML = switcher.getAttribute('data-lang-close');
				} else {
					spoiler_block.style.display = 'none';
					switcher.innerHTML = switcher.getAttribute('data-lang-open');
				}

				return false;
			}

			return true;
		};
	}


	return {

		//
		init: function () {
			// Find all Spoiler Switchers links
			var spoiler_links = PUNBB.common.arrayOfMatched(function (el) {
				return (PUNBB.common.hasClass(el, 'fancy_spoiler_switcher'));
			}, document.getElementsByTagName('span'));

			// Bind click event
			PUNBB.common.map(function (el) {
				el.onclick = spoiler_switcher_onclick(el);
				PUNBB.common.removeClass(el, 'visual-hidden');
			}, spoiler_links);
		}

	};
}());

// One onload handler
PUNBB.common.addDOMReadyEvent(PUNBB.fancy_spoiler.init);