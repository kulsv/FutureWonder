var http = require('http');
var fs = require('fs');
var path = require('path');
var util = require('util');
var state = 'OFF';

http.createServer(function (request, response) {
	var filePath = '../..' + request.url;
	if (filePath == '../../'){
        filePath = '../../index.html';
	}

    var extname = path.extname(filePath);
	var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
	fs.readFile(filePath, function(error, content) {
        if (error) {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        
        else {
		    response.writeHead(200, { 'Content-Type': contentType });
			//response.send('hello!!');
			//messageHandler(request, response);
			//response.write('callback(\'{\"msg\": \"OK\"}\')');
        	response.write(content, 'utf-8');
			response.end();
        }
    });	
	
	request.on('data', function (chunk) {
		//response.write('hi');
        console.log('GOT DATA!' + chunk);
		
		var result = [];
		var url = 'https://swapi.co/api/films/';
		var https = require('https');
		https.get(url, function(res){
			var body = '';
			res.on('data', function(chunk){
				body += chunk;
			});
			res.on('end', function(){
				var resp = JSON.parse(body);
				result = resp['results'];
				//console.log(resp['results']);
				var new_result = result.sort( sortBy("release_date") );
				var moviesArray = [];
				for(var i = 0; i < new_result.length; i++) {
					var jsonData = {};
					var obj = new_result[i];
					jsonData['id'] = obj['episode_id'];
					jsonData['name'] = obj['title'];
					moviesArray.push(jsonData);
				}
				//s.end(moviesArray);
				/*for(var i = 0; i < movies.length; i++) {
					
					var obj = movies[i];
					console.log('id :: ' + obj['id']);
					console.log('value :: ' + obj['name']);
					
				}*/
				
			});
		}).on('error', function(e){
			  console.log("Got an error: ", e);
			});	
    });
/*******
	var result = [];
	var url = 'https://swapi.co/api/films/';
	var https = require('https');
	https.get(url, function(res){
		var body = '';
		res.on('data', function(chunk){
			body += chunk;
		});
		res.on('end', function(){
			var resp = JSON.parse(body);
			result = resp['results'];
			//console.log(resp['results']);
			var new_result = result.sort( sortBy("release_date") );
			var moviesArray = [];
			for(var i = 0; i < new_result.length; i++) {
				var jsonData = {};
				var obj = new_result[i];
				jsonData['id'] = obj['episode_id'];
				jsonData['name'] = obj['title'];
				moviesArray.push(jsonData);
			}
			/*for(var i = 0; i < movies.length; i++) {
				
				var obj = movies[i];
				console.log('id :: ' + obj['id']);
				console.log('value :: ' + obj['name']);
				
			}
			
		});
	}).on('error', function(e){
		  console.log("Got an error: ", e);
		});
*******/
	 
}).listen(8080);

function sortBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}