const express = require('express');

//Loading environment file
const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios').default;

const logger = require('./httpLogger');
const app = express();

//app.use(require('morgan')('common'))
app.use(logger);

app.get('/',(req,res) => {
    //console.log("Hello Express");
    //res.send("Hello express!!!!");
    res.send({msg:"Hello express!!!!"});
});

app.get('/getuser',async(req,res) => {
    // let result = await axios.get('https://randomuser.me/api?results='+req.query.rows);
    // console.log(result.data);
    //console.log(result.data);
    //res.send(result.data);

    //let response = { name : result.data.results[0].name.first,year: result.data.results[0].dob.date.split('-')[0]}
    
    
    // let date = new Date(result.data.results[0].registered.date);
    // let tomorrow = new Date(date.getTime() + 60 * 60 * 24 * 1000).toISOString();
    // let response = { current : result.data.results[0].registered.date,sameTimeTommorrow: tomorrow};

    let today = new Date().toISOString();
    let now = new Date(today).getTime();
    let check = new Date('2022-11-30 16:00:00').getTime();
    
    let diff = (((check - now)/1000)/60);
    
    let response = {now:today,difference:diff,'hm':new Date().getHours()+" "+new Date().getMinutes()};
    res.send(response);
});


app.set("view engine","ejs");

app.use('/userView',async(req,res) => {
    const response = await axios.get('https://randomuser.me/api?results=1');
    const json = response.data;
    const user = json.results[0];
    
    res.render('user.ejs',{user});
})

app.use('/userList',async(req,res) => {
    const response = await axios.get('https://randomuser.me/api?results=5');
    const json = response.data;
    const users = json.results;
    
    let avg = 0;
    let c = 1;
    for(const user of users){
        avg = avg + user.dob.age;
        c++;
    }
    avg = Math.round(avg/c)
    //res.render('userList.ejs',{users});
    res.render('userTable.ejs',{users:users,avg:avg})
})

app.listen(process.env.PORT || 4000,() => {
    console.log(process.env.MONGO_URL);
    console.log("Application running at : ",process.env.PORT);
});

app.use(express.json());
app.use(require('./routes/index'))
require('./connection');