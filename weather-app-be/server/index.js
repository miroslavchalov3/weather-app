const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const fetch = require("node-fetch");
const bodyParser = require('koa-bodyparser')
const fs = require('fs');
const userPath = __dirname + '/users';
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

// Fetch Data from Open Weather Api server
const getWeather = async (ctx, next) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Bad response");
    }
    ctx.state.weather = await res.json();
    await next();
};
 
// Send weather data to user call
const sendWeatherData = ctx => {
    ctx.status = 200;
    ctx.body = ctx.state.weather;
};

// Handdle weather error
const handleErrors = async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.status = 502;
    }
  };

const checkDuplicateUsers = (user) => {
    const match = users.find(item => item.name === user.name);
    return !!match;
}

// Register and check user for duplicate
 const registerUser = (ctx) => {
     let user = ctx.request.body;
     user.id = users.length; 

     if(checkDuplicateUsers(user)){
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

// Check Login of User
const loginUser = (ctx) => {
    let headers = ctx.request.headers.authorization;
    if(headers && checkRegisterdUser(headers)){
        ctx.body = "Successful login";
        ctx.status = 200;
    } else {
        ctx.body = "Username"
        ctx.status = 401 ;
    }
}

// Check if user is register with hash check
const checkRegisterdUser = (userHash) => {
    const match = users.find(item => item.hash === userHash);
    return !!match;
};


const checkAdmin = (userHash) => {
    const match = users.find(item => ( item.hash === userHash) && item.isAdmin);
    return !!match;
}

const findAndDeleteUser = (userId) => {
    const match = users.findIndex(item => parseInt(item.id) === parseInt(userId));
    users.splice(match, 1);
    fs.writeFileSync(`${userPath}/users.txt`, JSON.stringify(users) , (err) => {
    });
}

const getAllUsers = (ctx) => {
    ctx.body = users;
    ctx.status = 200;
}

const deleteUser = (ctx) => {
    let userHash =  ctx.request.headers.authorization;
    let deletedUserId = ctx.params.id;
    if(checkAdmin(userHash)){
        findAndDeleteUser(deletedUserId)
        ctx.body = "User is deleted";
        ctx.status = 200;
    } else {
        ctx.body = "You cannot delete that user you are not admin";
        ctx.status = 401;
    }
}

// Auth Guard
app.use(async (ctx, next) => {
    let userHash = ctx.request.headers.authorization;
    if(ctx.url === '/register'){
        await next();
    } else {
        // Check user while is login for all request
        if(userHash && checkRegisterdUser(userHash)){
            await next();
         } else {
             ctx.status = 401;
             ctx.body = "Please login"
         }
    }
})

// Routers
router.get("/weather", handleErrors, getWeather,sendWeatherData);
router.post("/register", registerUser);
router.get("/login", loginUser);
router.del("/user/:id", deleteUser);
router.get("/users", getAllUsers);

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);