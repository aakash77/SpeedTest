# SpeedTest

It has two components client and server both of which are implemented using node.js at the base.

Steps to run

Server

1. npm install
It is going to install all the required libraries

2. npm start
It starts the server at port 8080

Client

1. npm install
It is again going to install all the required libraries for the client application

2. node client.js --server-ip=<ip of the server> --server-port=<port>
It starts the client server at port 3000. It requires two configuration
	server-ip requires the ip address of the system where the server has been hosted
	server-port requires the port on server is hosted (8080)
