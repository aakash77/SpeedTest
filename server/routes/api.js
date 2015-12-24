var express = require('express');

var api = express.Router();

/**SpeedTest request handler**/
api.post('/',function(req,res){
	
	/** Calculating Upload Speed **/
	//In ms
	var current_timestamp = Date.now();
	
	//In ms
	var client_timestamp = req.body.client_timestamp;
	
	//In bytes
	var payload = req.body.payload;
	
	//In sec
	var time_diff_in_sec = (current_timestamp - client_timestamp)/1000;
	
	//1 byte = 8 bits
	//In bits
	var payload_size_in_bits = payload.length*8;
	
	//In bits per second
	var upload_speed = payload_size_in_bits/time_diff_in_sec;
	
	//Sending the payload back for calculating download speed at client end
	res.json({upload_speed : upload_speed,server_send_timestamp : Date.now(),payload : payload});
});

module.exports = (function() {
	return api;
})();