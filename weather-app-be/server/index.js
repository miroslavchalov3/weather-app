const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const fetch = require("node-fetch");
const bodyParser = require('koa-bodyparser')
const fs = require('fs');
const userPath = __dirname + '/users';
const auth = require('koa-basic-auth');
let users = [];



// Init users
fs.readFile(`${userPath}/users.txt`, 'utf8', (err, data) => {
    users = data;
    users = JSON.parse(users);
});


const app = new Koa();
const router = new KoaRouter();
const apiKey = "dff7d764b61b4c7883f558d4ed207bfa";
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=42.6975&lon=23.3242&appid=${apiKey}`

// JSON Prettier Middleware
app.use(json());
app.use(bodyParser());

// Set request Headers
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept, Authorization');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

// Error handling middleware
app.use(function *(next){
    try {
       console.log(next);
       yield next;
    } catch (err) {
       if (401 == err.status) {
          this.status = 401;
          this.set('WWW-Authenticate', 'Basic');
          this.body = 'You have no access here';
       } else {
          throw err;
       }
    }
 });
 

// Handdle global error
const handleErrors = async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.status = 502;
    }
  };
  
const getWeather = async (ctx, next) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Bad response");
    }
    ctx.state.weather = await res.json();
    await next();
};
  
const sendWeatherData = ctx => {
    ctx.status = 200;
    ctx.body = ctx.state.weather;
};

const checkDuplicateUsers = (users, user) => {
    let duplicate = false;
    let result = users.filter(item => {
        if(item.name === user.name){
            duplicate = true;
        } else {
            duplicate = false;
        }
      })
      return duplicate;
}

 const registerUser = (ctx) => {
     let user = ctx.request.body;

     if(checkDuplicateUsers(users, user)){
        ctx.body = `${user.name} 'User is alredy Register`;
        ctx.status = 400;
        return;
     }

    users.push(user);
    fs.writeFileSync(`${userPath}/users.txt`, JSON.stringify(users) , (err) => {
    });
    ctx.body = `${user.name} 'User is Register`;
    ctx.status = 200;
}

const deleteUser = (ctx) => {

    
}


router.get("", handleErrors, getWeather,sendWeatherData);
router.post("/users", registerUser);
router.post("/login", auth())

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);