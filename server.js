	var application = {
		middleware: require('express'),
	        http: require('http'),
		fs: require('fs'),
   		cron: require('node-cron'),
		geodist: require('geodist'),
		path: require('path'),
                  database: require('mongodb').MongoClient,
	   websocketserver: require('ws').Server
	             }  	

var websocket = require('ws');
var public = application.path.join(__dirname, '/');
var app = application.middleware();

app.get('/', function(req, res) {
    res.sendFile(application.path.join(public, 'index.html'));
    return void 0;
});


app.use('/', application.middleware.static(public));

const assert = require('assert');

const dbName = 'test';

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.OPENSHIFT_NODEJS_IP || '192.168.1.54';

var url = 'mongodb://127.0.0.1:27017/test';

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  url = process.env.OPENSHIFT_MONGODB_DB_URL + 'test';
}

const server = application.http.createServer(app);
const wss = new application.websocketserver({ server });

wss.on('connection', function (ws) {
           ws.on('message', function (msg) {
 
     var message;
        try {
            message = JSON.parse(msg);
        } catch (e) {
            message = JSON.parse(JSON.stringify(msg));
        }
        
        var event = message.event;
        switch(event){
         case 'location':
         application.database.connect(url, function(err, db) {
         if (err) {  }
	 var dbo, myobj, query, newvalue;	 
	 dbo = db.db("test");
         myobj = { unit: message.data.unit, route: message.data.route, company: message.data.company, longitude: message.data.longitude, latitude: message.data.latitude, callastupdate: new Date(message.data.lastupdate), lastupdate: message.data.lastupdate };
         dbo.collection('location').findOne({ unit: message.data.unit, route: message.data.route, company: message.data.company }, function(err, result) {
         if (err) {  }
         if(result === null){
	 dbo.collection('location').ensureIndex( { 'unit': 1 }, { unique: true, sparse: true } )
         dbo.collection("location").insertOne(myobj, function(err, res) {
         if (err) {  }
         db.close();
	 return void 0;	 
          });
          } else {
          query = { unit: message.data.unit };
	  newvalue = { $set: { longitude: message.data.longitude, latitude: message.data.latitude, calclastupdate: new Date(message.data.lastupdate), lastupdate: message.data.lastupdate } };	  
          dbo.collection("location").updateOne(query, newvalue,function(err, res) {
          if (err) { }
          db.close();
	  return void 0;	  
          });

	  }
          });
          return void 0;
	 });
         break;
	 case 'read':
	
	     switch(message.data.store) {
	 case 'timelinestore':
         application.database.connect(url, function(err, db) {
         if (err) { console.log(err); }
         var dbo, reportdate;
	 dbo = db.db('test');
	 reportdate = new Date(message.data.timeelapsed); 
	 reportdate.setHours(0,0,0,0);

         dbo.collection('report').find({ $or: [{ user: message.data.user }, { user: message.data.assignedid }], unit: message.data.unit, company: message.data.company, route: message.data.route, calcdate: { $gte: reportdate }  }).toArray(function(err, result) {
         if (err) {  }
		 //console.log(result);
	    if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read' ,
                data: {
			data: result,
                        success: true
                }
            }));
	   }
	 db.close();
	 return void 0; 
         });
         return void 0;
         });
	 break;
	 case 'reportresetuser':
         application.database.connect(url, function(err, db) {
         if (err) { console.log(err); }
         var dbo = db.db('test');
         dbo.collection('userreset').find({}).toArray(function(err, result) {
         if (err) { console.log(err); }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read' ,
                data: {
			data: result,
                        success: true
                }
            }));
	    }
	 db.close();
	 return void 0; 
         });
         return void 0;
         });

	      break;

	 case 'locationdata':
         function precisionRound(number, precision) {
         var factor = Math.pow(10, precision);
         return Math.round(number * factor) / factor;
         }
       
	 application.database.connect(url, function(err, db) {
         if (err) { console.log(err); }
	 var dbo, cursor, locationmain, locations, date;	 
         dbo = db.db('test');
         date = new Date(message.data.timeelapsed);
	 date.setHours(0,0,0,0);

         cursor = dbo.collection('location').find({ calclastupdate: { $gte: date } });
         locationmain = {lat: message.data.userlocation.latitude, lon: message.data.userlocation.longitude}
	 locations = []; 
	 cursor.each(function(err, item) {
         if(item == null) { 
         if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({
                event: 'read' ,
                data: {
			data: locations,
                        success: true
                }
            }));
	 }
         db.close();
	 return void 0;	 
       } else {
       locations.push({ unit: item.unit, distance: precisionRound(application.geodist(locationmain, {lat: item.latitude, lon: item.longitude}, { exact: true, unit: 'meters'}),0), lastupdate: item.lastupdate }) 

       }
        return void 0;		 
	});

        return void 0;
        });

	      break;
	     case 'searchusers':
         application.database.connect(url, function(err, db) {
         if (err){ };
         var dbo = db.db('test');
         dbo.collection('users').find({}).project({ key: 0 }).toArray(function(err, result) {
         if (err){ console.log(err); }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read' ,
                data: {
			data: result,
                        success: true
                }
            }));
	    }
 
		 db.close();
		 return void 0;
          });
          return void 0;
          });

	 break;
         case 'pilotsdata':
         application.database.connect(url, function(err, db) {
         if (err){  }
         var dbo = db.db('test');
         dbo.collection('users').find({ position: { '$ne': message.data.position } }).project({ key: 0 }).toArray(function(err, result) {
         if (err){ console.log(err); }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
		 db.close();
		 return void 0;
        });
        return void 0;
        });
	 break;
         case 'unitroutes':
         application.database.connect(url, function(err, db) {
         if (err){  }
         var dbo = db.db('test');
         dbo.collection('routes').find({ }).toArray(function(err, result) {
         if (err){ console.log(err); }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
		 db.close();
		 return void 0;
        });
       return void 0;
       });
	 break;
         case 'company':
         application.database.connect(url, function(err, db) {
         if (err){  }
         var dbo = db.db('test');
         dbo.collection('company').find({ }).toArray(function(err, result) {
         if (err){ console.log(err); }
         if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	 }
		 db.close();
		 return void 0;
        });
        return void 0;
        });
	      break;
         case 'reportpercontrol':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days, passedvalue, regexvalue;	 
         dbo = db.db('test');
         collection = dbo.collection('gatereport');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);

         if(message.data.unitnumber){


cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, unit: message.data.unitnumber }
	          },{
                  $group: {
		    _id: { status:"$status", unit: '$unit', company: '$company', route: '$route', reportdate: '$reportdate' },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			unit: '$_id.unit',  
			company: '$_id.company',
			 route: '$_id.route',
			  reportdate: '$_id.reportdate',  
			  status: '$_id.status',
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
			    console.dir(docs);
                       if(ws.readyState === websocket.OPEN) {
                       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			   
			db.close();    
		       return void 0;    
		    });
		     

            } else {

                cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate } }
	          },{
                  $group: {
	              _id: { status:"$status", unit: '$unit', company: '$company', route: '$route', reportdate: '$reportdate' },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			unit: '$_id.unit',  
			company: '$_id.company',
			  reportdate: '$_id.reportdate',
			 route: '$_id.route',
			  status: '$_id.status',
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
			    console.dir(docs);
                       if(ws.readyState === websocket.OPEN) {
                       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
	
		       db.close();    
		       return void 0;    
		    });
           }
          return void 0;		 
       });
	break;

	 case 'reportperunit':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days, passedvalue, regexvalue;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);

         if(message.data.unitnumber){

	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, unit: message.data.unitnumber }
	          },{
                  $group: {
		    _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',  
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
                       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			
		       db.close();    
		       return void 0;    
		    });
		     

            } else {
             
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate } }
	          },{
                  $group: {
		    _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',  
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
                       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			
		       db.close();    
		       return void 0;    
		    });
           }
          return void 0;		 
       });
	break;
        case 'reportperroute':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
         if(message.data.route){

	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, route: new RegExp(message.data.route, 'i') }
	          },{
                  $group: {
		    _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',  
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
                       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			 
			db.close();    
		       return void 0;    
		    });

            } else {
             
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate } }
	          },{
                  $group: {
		    _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',  
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
                       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			  
			db.close();    
		       return void 0;    
		    });
           }
          return void 0;		 
       });
	break;
        case 'reportpercost':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
            console.log(message.data.price);
		 var calc = message.data.price
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate } }
	          },{
                  $group: {
		       _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company", price: '$price' },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			    price: '$totalprice',
			  route: '$_id.route',
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			db.close();    
		       return void 0;    
		    });
          return void 0;		 
       });
	break;
         case 'reportgatedata':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('gatereport');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, unit: message.data.unit }
	          },{
                  $group: {
		      _id: { status:"$status", unit: '$unit', company: '$company', route: '$route' },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			unit: '$_id.unit',  
			company: '$_id.company',
			 route: '$_id.route',
			  status: '$_id.status',
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }
			   
			db.close();    
		       return void 0;    
		    });
          return void 0;		 
       });
	break;
        case 'reportcumulativeunit':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
            console.log(message.data.company);
		 var calc = message.data.price
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, unit: message.data.unit }
	          },{
                  $group: {
		    _id: { unit: "$unit" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			unit: '$_id.unit',
			 unit: '$_id.unit',
			  route: '$_id.route',
			   price: '$totalprice', 
			    aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }

			db.close();    
		       return void 0;    
		    });
          return void 0;		 
       });
	break;
	 case 'reportcumulativecompany':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
            console.log(message.data.company);
		 var calc = message.data.price
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, company: new RegExp(message.data.company, 'i') }
	          },{
                  $group: {
		    _id: { company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',
			   price: '$totalprice', 
			    aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                      if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		      }

			db.close();    
		       return void 0;    
		    });
          return void 0;		 
       });
	break;
        case 'reportcumulativeroute':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
            console.log(message.data.company);
		 var calc = message.data.price
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, route: new RegExp(message.data.route, 'i') }
	          },{
                  $group: {
		    _id: { route: "$route" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			route: '$_id.route',
			 unit: '$_id.unit',
			  route: '$_id.route',
			   price: '$totalprice', 
			    aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }

			db.close();    
		       return void 0;    
		    });
          return void 0;		 
       });
	break;

	case 'reportcumulativecost':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
            console.log(message.data.price);
		 var calc = message.data.price
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate } }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',
			  price: '$totalprice',
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }

			db.close();    
		       return void 0;    
		    });
          return void 0;		 
       });
	break;
        case 'reportpercompany':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, reportdate, days, passedvalue, regexvalue;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
	 (message.data.days) ? days = message.data.days : days = 0	 
	 reportdate = new Date(message.data.reportdate); 
         reportdate.setDate(reportdate.getDate() - days);	
	 reportdate.setHours(0,0,0,0);
         if(message.data.company){

	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate }, company: new RegExp(message.data.company, 'i') }
	          },{
                  $group: {
		    _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',  
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }

			db.close();    
		       return void 0;    
		    });

            } else {
             
	    cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: reportdate } }
	          },{
                  $group: {
		    _id: { reportdate:"$reportdate", unit: "$unit", route: "$route", company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			reportdate: '$_id.reportdate',  
			company: '$_id.company',
			 unit: '$_id.unit',
			  route: '$_id.route',  
			aboard: '$aboard',
		       charged: '$charged',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                       
                       if(ws.readyState === websocket.OPEN) {
		       ws.send(JSON.stringify({
                       event: 'read',
                       data: docs
                       }));
		       }

			db.close();    
		       return void 0;    
		    });
           }
          return void 0;		 
       });
	break;
        case 'aboardData':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo = db.db('test');
         if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
         dbo.collection('report').find({ position: 'piloto', calcdate: { $gte: new Date(message.data.timeelapsed) } }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
          db.close();
          return void 0;
	 });

	 } else {	 
        dbo.collection('report').find({ position: 'piloto', calcdate: { $gte: new Date(message.data.timeelapsed) }, route: message.data.route, company: message.data.company, unit: message.data.unit }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
          db.close();
          return void 0;
	 });
	 }	 
        return void 0;
        });
	 break;
	 case 'charData':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo = db.db('test');
         if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
	 dbo.collection('report').find({ position: 'ayudante', calcdate: { $gte: new Date(message.data.timeelapsed) } }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
           db.close();
           return void 0;
	 });

	 } else {
	 dbo.collection('report').find({ position: 'ayudante', calcdate: { $gte: new Date(message.data.timeelapsed) }, route: message.data.route, company: message.data.company, unit: message.data.unit }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
           db.close();
           return void 0;
	 });
	 }	 
        return void 0;
        });
	 break;
         case 'chartotalData':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo = db.db('test');
	 var date = new Date(message.data.timeelapsed);
	 date.setHours(0,0,0,0);
         if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
         dbo.collection('report').find({ position: 'ayudante', calcdate: { $gte: date } }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
           db.close();
           return void 0;
	 });

	 } else {	 
	 dbo.collection('report').find({ position: 'ayudante', calcdate: { $gte: date }, route: message.data.route, company: message.data.company, unit: message.data.unit }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
           db.close();
           return void 0;
	 });
	 }	 
        return void 0;
        });
         break;
         case 'aboardTotalData':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo = db.db('test');
	 var date = new Date(message.data.timeelapsed);
	 date.setHours(0,0,0,0);
         if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
         dbo.collection('report').find({ position: 'piloto', calcdate: { $gte: date } }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));
	    }
           db.close();
           return void 0;
	 });

	 } else {	 
	 dbo.collection('report').find({ position: 'piloto', calcdate: { $gte: date }, route: message.data.route, company: message.data.company, unit: message.data.unit }).toArray(function(err, result) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
  	    ws.send(JSON.stringify({
                event: 'read',
                data: result
            }));}
           db.close();
           return void 0;
	 });
	 }	 
        return void 0;
        });
         break;

         case 'networkData':
         application.database.connect(url, function(err, db) {
         if (err){ console.log(err) }
         var dbo = db.db('test');
	 if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
          dbo.collection('inform').find({  calcdate: { $gte: new Date(message.data.timeelapsed)  } }).toArray(function(err, res) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
		    ws.send(JSON.stringify({
                event: 'read',
                data: res
            }));}
		 db.close();
		 return void 0;
          });

	 } else {	 
         dbo.collection('inform').find({ calcdate: { $gte: new Date(message.data.timeelapsed) }, status: 'closed' , unit: message.data.unit, route: message.data.route, company: message.data.company }).toArray(function(err, res) {
         if (err){ }
            if(ws.readyState === websocket.OPEN) {
	    ws.send(JSON.stringify({
                event: 'read',
                data: res
            }));}
		 db.close();
		 return void 0;
          });
	  }	 
         return void 0;
	 });
	      break;	     
	     }		
         
	 break;		
         case 'temporarynewpassword':
         application.database.connect(url, function(err, db) {
         if (err){  }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { user: message.data.user };
             newvalue = { $set: {key: message.data.password } };
        
	 dbo.collection("users").updateOne(query, newvalue, function(err, res) {
         if (err){ }
                 if(ws.readyState === websocket.OPEN) {
		 ws.send(JSON.stringify({ event: 'temporarynewpasswordset' }));
		 }
		 db.close();
		 return void 0;
          });
	 return void 0;
	 });
	 break;	
	 case 'authentication':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor;
	 dbo = db.db('test');
         dbo.collection('users').findOne({user: message.data.user, key: message.data.key}, function(err, result) {
         if (err){ }
	 if(result === null){ 
	 if(ws.readyState === websocket.OPEN) {
         ws.send(JSON.stringify({ event: 'login', data: { msg: 'no existe', success: false } })); }
	 db.close();	 
	 } else { if(ws.readyState === websocket.OPEN) { ws.send(JSON.stringify({ event: 'login', data: { msg: 'login', success: true, profile: { id: result._id, user: result.user, firstname: result.firstname, secondname: result.secondname, firstlastname: result.firstlastname, secondlastname: result.secondlastname, position: result.position, assignedid: result.assignedid, unit: result.unit, route: result.route, company: result.company, price: result.price } } }));}
         if(message.data.key === 'clave'){  if(ws.readyState === websocket.OPEN) { ws.send(JSON.stringify({ event: 'temporarypassword' }));} }
	 db.close();	 
	 }
	 db.close();
	 return void 0;	 
         });
         return void 0;	 
	 });

	 break;		
         case 'newaccountgate':
         application.database.connect(url, function(err, db) {
         if (err){  }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = {user: message.data.data.user, firstname: message.data.data.firstname, secondname: message.data.data.secondname, firstlastname: message.data.data.firstlastname, secondlastname: message.data.data.secondlastname, position: message.data.data.position, key: 'clave'  };	 
dbo.collection('users').findOne({ user: message.data.data.user }, function(err, result) {
         if (err){  }
         if(result === null){
         dbo.collection("users").insertOne(myobj, function(err, res) {
         if (err){ }
         if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'useradded' }));}
		 db.close();
		 return void 0;
          }); 
	 } else {
	 if(ws.readyState === websocket.OPEN) {
         ws.send(JSON.stringify({ event: 'erroruser', data: { msg: 'usuario ya existe' } }));}
		 db.close();
	 }
         return void 0; 
          });	
         return void 0;	 
	 });

	 break;	
	 case 'newaccountadmon':
         application.database.connect(url, function(err, db) {
         if (err){  }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = {user: message.data.data.user, firstname: message.data.data.firstname, secondname: message.data.data.secondname, firstlastname: message.data.data.firstlastname, secondlastname: message.data.data.secondlastname, position: message.data.data.position, key: 'clave'  };	 
dbo.collection('users').findOne({ user: message.data.data.user }, function(err, result) {
         if (err){  }
         if(result === null){
         dbo.collection("users").insertOne(myobj, function(err, res) {
         if (err){ }
	 if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'useradded' }));}
		 db.close();
		 return void 0;
          }); 
	 } else {
         if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'erroruser', data: { msg: 'usuario ya existe' } }));}
		 db.close();
	 }
         return void 0; 
          });	
         return void 0;	 
	 });

	 break;	
         case 'reportbusvalidation':
         function precisionRound(number, precision) {
         var factor = Math.pow(10, precision);
         return Math.round(number * factor) / factor;
         }
       
	 application.database.connect(url, function(err, db) {
         if (err) {  }
	 var dbo, cursor, locationmain, locations, xmin, minobject;	 
         dbo = db.db('test');
         cursor = dbo.collection('location').find({ calclastupdate: { $gte: new Date(message.data.timeelapsed)  }});
         locationmain = {lat: message.data.userlocation.latitude, lon: message.data.userlocation.longitude}
	 locations = []; 
	 cursor.each(function(err, item) {
         if(item == null) { 
	 xmin = Math.min.apply(null, locations.map(function(o) { return o.distance }));
         minobject = locations.filter(function(o) { return o.distance === xmin; })[0];

         if(minobject.distance <= 20){
         if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'reportbusvalidation', data: { minobject } }));}
	 db.close();	 
         } else {
	 if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'reportbusvalidationerror' }));}
	 db.close();	 
	 }
       } else {
       locations.push({ unit: item.unit, distance: precisionRound(application.geodist(locationmain, {lat: item.latitude, lon: item.longitude}, { exact: true, unit: 'meters'}),0), route: item.route, company: item.company, lastupdate: item.lastupdate }) 

       }
        return void 0;		 
	});

        return void 0;
        });
	 break;	
	 case 'newaccount':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = {user: message.data.data.user, firstname: message.data.data.firstname, secondname: message.data.data.secondname, firstlastname: message.data.data.firstlastname, secondlastname: message.data.data.secondlastname, position: message.data.data.position, unit: message.data.data.unit, key: 'clave'  };	 
dbo.collection('users').findOne({ user: message.data.data.user }, function(err, result) {
         if (err){ }
         if(result === null){
         dbo.collection("users").insertOne(myobj, function(err, res) {
         if (err){ }
	 if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'useradded' })); }
		 db.close();
          }); 
	 } else {
	if(ws.readyState === websocket.OPEN) { 
	ws.send(JSON.stringify({ event: 'erroruser', data: { msg: 'usuario ya existe' } })); }
		 db.close();
	 }
         return void 0;
         });	
	 return void 0; 
	 });
	 break;	
         case 'userreset':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = { user: message.data.user, reportdate: message.data.reportdate };	 
         dbo.collection("userreset").insertOne(myobj, function(err, res) {
         if (err){ }
	 if(ws.readyState === websocket.OPEN) {
		 ws.send(JSON.stringify({ event: 'userreset' }));}
		 db.close();
          }); 
	 return void 0; 
	 });
	 break;	
         case 'passwordreset':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, myobj, newvalue;
	 dbo = db.db('test');
	 myobj = { user: message.data.user };
	 newvalue = { $set: { key: 'clave' } };	 
         dbo.collection("users").updateOne(myobj, newvalue, function(err, res) {
         if (err){ }
         dbo.collection("userreset").deleteOne(myobj, function(err, res) {
         if (err){ }
                 if(ws.readyState === websocket.OPEN) {
	         ws.send(JSON.stringify({ event: 'passwordreset' }));}
		 db.close();
           });
	   return void 0;	 
          }); 
	 return void 0; 
	 });
	 break;	
	 case 'gatereport':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = { unit: message.data.unit, route: message.data.route, company: message.data.company, calcdate: new Date(message.data.time), time: message.data.time, reportdate: message.data.reportdate, status: message.data.status };	 
         dbo.collection("gatereport").insertOne(myobj, function(err, res) {
         if (err){ }
	 if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'gatereport' }));}
		 db.close();
          }); 
	 return void 0; 
	 });
	 break;	
	 case 'addroute':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = { route: message.data.data.route };	 
         dbo.collection("routes").insertOne(myobj, function(err, res) {
         if (err){ }
	 if(ws.readyState === websocket.OPEN) {
	 ws.send(JSON.stringify({ event: 'routeadded' }));}
		 db.close();
          }); 
	 return void 0; 
	 });
	 break;		
         case 'addcompany':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, myobj;
	 dbo = db.db('test');
	 myobj = { company: message.data.data.company };	 
         dbo.collection("company").insertOne(myobj, function(err, res) {
         if (err){ }
	 if(ws.readyState === websocket.OPEN) {
         ws.send(JSON.stringify({ event: 'companyadded' }));}
		 db.close();
          }); 
	 return void 0; 
	 });
	 break;			
         case 'editaccount':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, query, newvalue;
	 dbo = db.db('test');
	 query = { user: message.data.data.user }	
	 newvalue = { $set: { user: message.data.data.newuser, firstname: message.data.data.firstname, secondname: message.data.data.secondname, firstlastname: message.data.data.firstlastname, secondlastname: message.data.data.secondlastname, unit: message.data.data.unit } };	 
dbo.collection('users').updateOne(query, newvalue, function(err, result) {
         if (err){ }
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
	 client.send(JSON.stringify({ event: 'updateclient' }));}
         return void 0;
	 }); 
         db.close();	
	 return void 0;
         });	
	 return void 0;
	 });
	 break;	
	 case 'editaccountadmon':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo, cursor, query, newvalue;
	 dbo = db.db('test');
	 query = { user: message.data.data.user }	
	 newvalue = { $set: { user: message.data.data.newuser, firstname: message.data.data.firstname, secondname: message.data.data.secondname, firstlastname: message.data.data.firstlastname, secondlastname: message.data.data.secondlastname } };	 
dbo.collection('users').updateOne(query, newvalue, function(err, result) {
         if (err){ }
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
	 client.send(JSON.stringify({ event: 'updateclient' }));}
         return void 0;
	 }); 
         db.close();
	 return void 0;
         });	
	 return void 0;
	 });
	 break;			
	 case 'aboardhourindicator':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor;	 
         dbo = db.db('test');
         collection = dbo.collection('report');
                 if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
                 cursor = collection.aggregate([{ 
	          $match: { position: 'piloto', calcdate: { $gte: new Date(message.data.timeelapsed) } }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
			ws.send(JSON.stringify({event: 'aboardhourindicator', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });

		 } else {	 
		 cursor = collection.aggregate([{ 
	          $match: { position: 'piloto', calcdate: { $gte: new Date(message.data.timeelapsed) }, route: message.data.route, company: message.data.company, unit: message.data.unit }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
			ws.send(JSON.stringify({event: 'aboardhourindicator', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });
		 }	 
          return void 0;		 
       });
         break;		
	 case 'chargedhourindicator':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor;	 
         dbo = db.db('test');
         collection = dbo.collection('report');
                 if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
                  cursor = collection.aggregate([{ 
	          $match: { position: 'ayudante', calcdate: { $gte: new Date(message.data.timeelapsed) } }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
                        ws.send(JSON.stringify({event: 'chargedhourindicator', data: docs[0]  }));}
			db.close();   
			return void 0;    
		    });

		 } else {	 
		 cursor = collection.aggregate([{ 
	          $match: { position: 'ayudante', calcdate: { $gte: new Date(message.data.timeelapsed) }, route: message.data.route, company: message.data.company, unit: message.data.unit }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
                        ws.send(JSON.stringify({event: 'chargedhourindicator', data: docs[0]  }));}
			db.close();   
			return void 0;    
		    });
	        }
          return void 0;		 
         });
	 break;		
	 case 'aboarddayindicator':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, date;	 
         dbo = db.db('test');
         collection = dbo.collection('report');
         date = new Date(message.data.timeelapsed);
	 date.setHours(0,0,0,0);
                 if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
		 cursor = collection.aggregate([{ 
	          $match: { position: 'piloto', calcdate: { $gte: date } }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
			ws.send(JSON.stringify({event: 'aboarddayindicator', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });

		 } else {
		 cursor = collection.aggregate([{ 
	          $match: { position: 'piloto', calcdate: { $gte: date }, route: message.data.route, company: message.data.company, unit: message.data.unit }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
                        ws.send(JSON.stringify({event: 'aboarddayindicator', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });
		 }	 
          return void 0;		 
       });
	 break;	
         case 'chargeddayindicator':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, date;	 
         dbo = db.db('test');
         collection = dbo.collection('report');
         date = new Date(message.data.timeelapsed);
	 date.setHours(0,0,0,0);
                 if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
            	 cursor = collection.aggregate([{ 
	          $match: { position: 'ayudante', calcdate: { $gte: date } }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {

                        if(ws.readyState === websocket.OPEN) {
                        ws.send(JSON.stringify({event: 'chargeddayindicator', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });

		 } else {	 
		 cursor = collection.aggregate([{ 
	          $match: { position: 'ayudante', calcdate: { $gte: date }, route: message.data.route, company: message.data.company, unit: message.data.unit }
	          },{
                  $group: {
		    _id: { unit: "$unit", route: "$route", company: "$company" },
                    count: { $sum: "$number" }
                       }
                    },{
		    $project: {
			count: '$count',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
			ws.send(JSON.stringify({event: 'chargeddayindicator', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });
	 }
          return void 0;		 
       });
	 break;	
	 case 'collectedpercentagebar':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, collection, cursor, date;	 
         dbo = db.db('test');
         collection = dbo.collection('inform');
         date = new Date(message.data.timeelapsed);
	 date.setHours(0,0,0,0);
                 if(message.data.position === 'administrador' || message.data.position === 'control de garita'){
                 cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: date } }
	          },{
                  $group: {
		    _id: { company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			    percentage: { $divide: ['$charged', '$aboard'] },
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
			ws.send(JSON.stringify({event: 'collectedpercentagebar', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });

		 } else {	 
		 cursor = collection.aggregate([{ 
	          $match: { calcdate: { $gte: date }, route: message.data.route, company: message.data.company, unit: message.data.unit }
	          },{
                  $group: {
		    _id: { company: "$company" },
                    aboard: { $sum: "$aboard" },
                    charged: { $sum: "$charged" },
                    totalprice: { $max: "$price" },
                    count: { $sum: 1 }
                       }
                    },{
		    $project: {
			    percentage: { $divide: ['$charged', '$aboard'] },
			    charged: '$charged',
			    aboard: '$aboard',
			   _id: 0
		    }
		    }]).toArray(function(err, docs) {
                        if(ws.readyState === websocket.OPEN) {
			ws.send(JSON.stringify({event: 'collectedpercentagebar', data: docs[0]  }));}
                        db.close();
			return void 0;    
		    });
		   }	 
          return void 0;		 
       });
	 break;			
	 case 'report':
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo = db.db("test");
		 var myobj = { user: message.data.data.user, firstname: message.data.data.firstname, firstlastname: message.data.data.firstlastname, route: message.data.data.route, company: message.data.data.company, unit: message.data.data.unit, number: message.data.data.number, position: message.data.data.position, reportdate: message.data.data.reporttime, price: message.data.data.price, date: message.data.data.time, calcdate: new Date(message.data.data.time) };
         dbo.collection("report").insertOne(myobj, function(err, res) {
         if (err){ }
		 db.close();
		 if(ws.readyState === websocket.OPEN) {
		 ws.send(JSON.stringify({ event: 'addedreport' }));}
		 return void 0;
          });
         return void 0;
	 });

	 break;
         case 'inform':	
         application.database.connect(url, function(err, db) {
         if (err){ }
         var dbo = db.db("test");
		 var myobj = { unit: message.data.data.unit, aboard: message.data.data.aboard, price: message.data.data.price, route: message.data.data.route, company: message.data.data.company, status: message.data.data.status, reportdate: message.data.data.reporttime, date: message.data.data.time, calcdate: new Date(message.data.data.time) };
         dbo.collection("inform").insertOne(myobj, function(err, res) {
         if (err){ }
		 db.close();
          });
         });

	 break;
         case 'validatereport':
         application.database.connect(url, function(err, db) {
         if (err){  }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { unit: message.data.data.unit, route: message.data.data.route, company: message.data.data.company, status: 'open' };
        
	dbo.collection('inform').findOne({ status: 'open', unit: message.data.data.unit, route: message.data.data.route, company: message.data.data.company }, function(err, result) {
         if (err){ }
	 if(result === null) { 
         if(ws.readyState === websocket.OPEN) {
         ws.send(JSON.stringify({event: 'validate', data: { msg: 'validate' } })); }
	 db.close();
	 } else {
	  if(ws.readyState === websocket.OPEN) {
          ws.send(JSON.stringify({event: 'reportvalid', data: { msg: 'validate' } })); }
	  db.close();
	 }
	 return void 0;	
         });
	 return void 0;
	 });
	 break;		
         case 'updateinform':
         application.database.connect(url, function(err, db) {
         if (err){  }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { unit: message.data.data.unit, route: message.data.data.route, company: message.data.data.company, status: 'open' };
             newvalue = { $set: {status: 'closed', charged: message.data.data.charged } };
        
	dbo.collection('inform').findOne({ status: 'open', unit: message.data.data.unit, route: message.data.data.route, company: message.data.data.company }, function(err, result) {
         if (err){ }
	 if(result === null) { 
         if(ws.readyState === websocket.OPEN) {
		 ws.send(JSON.stringify({event: 'validate', data: { msg: 'validate' } })); }
		 db.close();
	 } else {
	 dbo.collection("inform").updateOne(query, newvalue, function(err, res) {
         if (err){ }
		 db.close();
          });
	 } 	 
         });
	 });
	 break;		
         case 'updatepilot':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { user: message.data.data.assigment };
             newvalue = { $set: {assigned: message.data.data.assignedname, assignedid: message.data.data.assigned } };
         dbo.collection("users").updateOne(query, newvalue, function(err, res) {
         if (err){ }
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
         client.send(JSON.stringify({ event: 'updateclient' }));}
         }); 
         db.close();
          });
	 return void 0; 
	 });
	 break;	
	 case 'updaterecordcompany':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { user: message.data.data.user };
             newvalue = { $set: {company: message.data.data.company } };
        dbo.collection("users").updateOne(query, newvalue, function(err, res) {
         if (err){ }
		wss.clients.forEach(function each(client) {
                if(client.readyState === websocket.OPEN) {
		client.send(JSON.stringify({ event: 'updateclient' }));}
                }); 
		db.close();
          });
	 });
	 break;	
	 case 'updaterecordroute':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { user: message.data.data.user };
             newvalue = { $set: {route: message.data.data.route } };
        dbo.collection("users").updateOne(query, newvalue, function(err, res) {
         if (err){ }
           wss.clients.forEach(function each(client) {
           if(client.readyState === websocket.OPEN) {
	   client.send(JSON.stringify({ event: 'updateclient' }));}
           }); 
		db.close();
          });
	 });
	 break;			
	 case 'updateposition':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, query, newvalue;
             dbo = db.db("test");
             query = { user: message.data.data.user };
             newvalue = { $set: {position: message.data.data.newposition } };
        dbo.collection("users").updateOne(query, newvalue, function(err, res) {
         if (err){ }
	 
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
         client.send(JSON.stringify({ event: 'updateclient' }));}
         }); 	
	 db.close();
	  return void 0;	
          });
	 return void 0;
	 });
	 break;
	 case 'deleterecord':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, query, newvalue;
         dbo = db.db("test");
         query = { user: message.data.data.user };
         dbo.collection("users").deleteOne(query, function(err, res) {
         if (err){ }
	 
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
         client.send(JSON.stringify({ event: 'updateclient' }));}
         }); 	
	 db.close();
	 return void 0;	 
          });
	 return void 0;
	 });
	 break;
         case 'priceofroute':
         application.database.connect(url, function(err, db) {
         if (err){ }
	 var dbo, newvalue;
         dbo = db.db("test");
         newvalue = { $set: { price: message.data.data.price } };
         dbo.collection("users").updateMany({ }, newvalue, function(err, res) {
         if (err){ }
	 
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
	 client.send(JSON.stringify({ event: 'updateclient' }));}
         }); 	
	 db.close();
	 return void 0;	 
          });
	 return void 0;
	 });
	 break;
         case 'mainreportvalidator':
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
         client.send(JSON.stringify({ event: 'mainreportvalidator', data: { user: message.data.data.user } }));}
         }); 	
	 break;
         case 'locationreportvalidator':
         wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
         client.send(JSON.stringify({ event: 'locationreportvalidator', data: { user: message.data.data.user } }));}
         }); 	
	 break;

	}
         return void 0;
           });
       
     application.cron.schedule('*/1 * * * *', function(){
      wss.clients.forEach(function each(client) {
         if(client.readyState === websocket.OPEN) {
	      client.send(JSON.stringify({ event: 'location' }));}
      }); 
      return void 0;
     });
     return void 0;
     });


server.listen(port, ip);
