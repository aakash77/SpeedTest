var	request = require('request'),
	argv = require('yargs')
			.usage('Usage: $0 --server-ip=[ip] --server-port=[port]')
			.demand(['server-ip','server-port'])
			.argv;

/**Data to transmit for testing speed**/
var payload_data = "";
var final_upload_speed=0;
var final_download_speed=0;
var ITERATION = 2;
var speed_temp_array=[];

/**Adding 10 MB data**/
for(var i=0;i<10485760;i++){
	payload_data +="x"; 
}

/**base url of the server**/
var base_url = 'http://'+argv['server-ip']+':'+argv['server-port'];

/**Server request options**/
var options = {
	uri: '/speedtest',
	method: 'POST',
	baseUrl : base_url,
	json: {
		"payload" : payload_data,
		"client_timestamp" : Date.now()
		}
};


var promiseSpeedTest = new Promise(function(resolve,reject){

	for(var i=0;i<ITERATION;i++){
		/**Sending request and its callback**/
		request(options,function(error,response,body){
			if(error){
				console.log("Error while requesting information. Please check the IP and Port and try again");
				process.exit();
			}else{
				/**Computing Download Speed**/
				var current_timestamp = Date.now();
				//Server reply timestamp
				var server_timestamp = body.server_send_timestamp;
				//Same payload but used for downloading
				var payload = body.payload;
				
				//In sec
				var time_diff_in_sec = (current_timestamp - server_timestamp)/1000;
				
				//1 byte = 8 bits
				//In bits
				var payload_size_in_bits = payload.length*8;
				
				//In bits per seconds
				var download_speed = payload_size_in_bits/time_diff_in_sec;
				final_upload_speed = parseFloat(final_upload_speed + body.upload_speed);
				final_download_speed = parseFloat(final_download_speed + download_speed);
				speed_temp_array.push(i);
				if(speed_temp_array.length===ITERATION){
					resolve("data");
				}
			}
		});
	}
});

Promise.all([promiseSpeedTest]).then(function(done){
	final_upload_speed/=ITERATION;
	final_download_speed/=ITERATION;
	console.log("Download Speed: "+final_download_speed.toFixed(2) + " bits per second");
	console.log("Upload Speed: "+final_upload_speed.toFixed(2) + " bits per second");
});