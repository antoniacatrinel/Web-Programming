$(document).ready(function() {
	let highlightedClass = 'highlight';
	
	$('body').on('dblclick', function() {
		// Remove any existing highlights
		$('.' + highlightedClass).replaceWith(function() {
			return $(this).text();
		});
		
		let selectedText = $.trim(window.getSelection().toString());
		if (selectedText !== '') {
			let textNodes = $('body').find('*').contents().filter(function() {
				return this.nodeType === 3;
			});
			
			textNodes.each(function() {
				let nodeText = $(this).text();
				let replacedText = nodeText.replace(new RegExp(selectedText, 'g'), '<span class="' + highlightedClass + '">' + selectedText + '</span>');
				$(this).replaceWith(replacedText);
			});
		}
	});
});

