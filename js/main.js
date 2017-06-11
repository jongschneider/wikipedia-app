$(document).ready(function() {
	//when search is clicked run code
	$('#searchTerm').val('');
	$('#search').on('click', function() {
		// when search button is clicked, the following resets the output
		show_output();
		$('#row1').hide();
		$('#row2').hide();
		$('#row3').hide();
		$('#row4').hide();
		$('#row5').hide();
		$('#row6').hide();
		$('#row7').hide();
		$('#row8').hide();
		$('#row9').hide();
		$('#row10').hide();

		// Gets search input
		var searchTerm = $('#searchTerm').val();
		var url =
			'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
			searchTerm +
			'&format=json&callback=?';

		$.ajax({
			type: 'GET',
			url: url,
			async: false,
			dataType: 'json',
			success: function(data) {
				for (var i = 0; i < data[1].length; i++) {
					if ($('#row' + (i + 1) + ' button').attr('aria-expanded') == 'true') {
						$('#row' + (i + 1) + ' button').trigger('click');
					}
					$('#title-' + (i + 1)).text(data[1][i]);
					// clears the info to avoid bug of adding another instance
					// each time the search button is clicked.
					$('#info' + (i + 1)).text('');
					$('#info' + (i + 1)).append(
						'<a href ="' +
							data[3][i] +
							'" target="_blank">' +
							data[2][i] +
							'</a>'
					);
					// only shows the number of responses
					$('#row' + (i + 1)).show();
				}
			},
			error: function(errorMessage) {
				alert('Error');
			}
		});
		// moves the information up so that there is now just a 100px top margin
		$('.headline').css({
			'margin-top': '100px',
			'transition-duration': '1s'
		});
	});
	// allows you to search by clicking "enter" while focus is on searchInput
	$('#searchTerm').keyup(function(event) {
		if (event.keyCode == 13) {
			$('#search').click();
		}
	});
});

// the output starts hidden.
$(document).ready(function() {
	$('#output').hide();
});

// the click handler shows the output
var show_output = function() {
	$('#output').show();
};
