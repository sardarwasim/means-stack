const express = require('express');
const app = express();
const mongojs = require('mongojs');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var db = mongojs('mydb',['users']);

app.use((req,res,next)=>{

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
    });

app.get('/',(req,res) =>{

    console.log('Welcome to server.');
    res.send('Welcome to server API.');
});

app.get('/api/users',(req,res) =>{

db.users.find((err,users)=>{

    if(err)
    {
        res.send(err);
    }

  res.json(users);
});


});


app.get('/api/user/:id',(req,res) =>{

    db.users.find({_id: mongojs.ObjectId(req.params.id)},(err,users)=>{
    
        if(err)
        {
            res.send(err);
        }
    
      res.json(users);
    });
    
    
    });


app.post('/api/save',(req,res) =>{

    var data = req.body;

    db.users.save(data,(err,user)=>{

        if(err)
        {
            console.log(err);
            res.json(err);
        }

        res.json(user);

    });

  
    });

    app.put('/api/update/:id',(req,res) =>{

        var data = req.body;
    
        db.users.update({_id: mongojs.ObjectId(req.params.id)},data,(err,user)=>{
    
            if(err)
            {
                console.log(err);
                res.json(err);
            }
    
            res.json(user);
    
        });
    
      
        });

    app.post('/api/search',(req,res) =>{

        var data = req.body;

    
    
        db.users.find(data,(err,user)=>{
    
            if(err)
            {
                console.log(err);
                res.json(err);
            }
    
            res.json(user);
    
        });
    
      
        });

    app.delete('/api/delete/:id',(req,res)=>{

        db.users.remove({_id: mongojs.ObjectId(req.params.id)},(err,user)=>{

            if(err)
            {
                console.log(err);
                res.json(err);
            }

            res.json(user);

        });



    });


const port = process.env.port || 3000;

app.listen(port,()=>{
console.log('Listing on port '+port);
});


