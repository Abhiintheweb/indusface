var fs = require("fs")
var request = require('request');



/*
Storing api response to a global var 
and acessing it in every 2 seconds.
example:

{"status":"pending","status_code":200,"response":["Elon Musk","Tesla"]}
Above status keeps on changing according to response status


Status is dependent on Events emited by http request
*/

var result={}
fs.readFile('test.txt', 'utf8', function (err, data) {

  if (err) throw err;
  	// reading text and converting it to array
    var url = data.split("\n");


	url.forEach(function(u){
		if (u.replace(/ /g,'').length > 1){//remove whitespace  and compare length
			result[u]={"status":"pending","status_code":null,"response":null}//initialize result 
			request(u).on("response",function(data){

				result[u]={"status":"Success","status_code":data.statusCode,"response":null}
				
			}).on("data",function(d){

				result[u]["response"]=process.stdout.write(d)//write response
				
			}).on("error",function(e){

				result[u]={"status":"Error","status_code":400,"response":e}

			});
		}
			
	})

});


//set interval for 2 sec. and access global variable
setInterval(function(){
	console.log("************************")
	console.log(result)
},2000)


 
