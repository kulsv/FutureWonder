// User code here

// HINT: start here: https://swapi.co/api/films/
/*
$(document).ready(function(){
	alert('in client js!!' );
	var data = {};
	data.title = "title";
	data.message = "message";
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: 'http://127.0.0.1:8080/js/test/main-test',
		success: function (data) {
			console.log('success');
			console.log(JSON.stringify(data));
		}
	});
			
			
});*/


$(document).ready(function() {
	
	$( "#swFilms" ).click(function() {
	  alert( "Handler for .click() called." );
			
		$.ajax({
			url: 'http://127.0.0.1:8080/',
			//dataType: "jsonp",
			dataType: "json",
			data: '{"data": "TEST"}',
			type: 'POST',
			//jsonpCallback: 'callback', // this is not relevant to the POST anymore
			success: function (data) {
				var ret = JSON.parse(data);
				//$('#lblResponse').html(ret.msg);
				console.log('Success: ' + ret)
			},
			error: function (xhr, status, error) {
				console.log('Error: ');
				//$('#lblResponse').html('Error connecting to the server.');
			},
		});
	});
	//console.log('in client js!');
   
});