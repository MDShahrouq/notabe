//Server ,Js

const express 		= require('express');
const MongoClient 	= require('mongodb').MongoClient;
const bodyParser 	= require('body-parser');
const db			= require('./config/db');

const app 			= express();
const port 			= 8000;

app.use(bodyParser.urlencoded({extented: true}));


MongoClient.connect("mongodb://shahrouq:shahrouq@ds237808.mlab.com:37808/notable", (err,database)=>{
	// const notable = database.db('notable')
	// notable.collection('notable')
	var db=database.db('notableApp');
      var collections=db.collection('notes');

	if(err)return console.log(err);
	require('./app/routes')(app,database);
			
			app.listen(port, () => {
				console.log('We are live on Port: ' + port);
			});

})
