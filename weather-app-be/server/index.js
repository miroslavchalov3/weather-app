const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const fetch = require("node-fetch");
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');;
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
let cityUrl = (city) => {return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`}

let fullDataUrl = (lat, lon ) => {return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`};

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

app.use(cors());

// Fetch Data from Open Weather Api server and get City and Weather for 7 days
const getWeather = async (ctx) => {
    city = ctx.request.body.city;
    const cityCord = await fetch(cityUrl(city));
    const ConvertedCityArray = await (cityCord).json();
    let lat = ConvertedCityArray.coord.lat;
    let lon = ConvertedCityArray.coord.lon;
    let sevenDaysForeCast = await fetch(fullDataUrl(lat, lon));
    sevenDaysForeCast = await sevenDaysForeCast.json();
    ctx.body = sevenDaysForeCast;
};
 
// global error handdler
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
        ctx.body = `${user.name} 'User is alredy registered`;
        ctx.status = 400;
        return;
     }

    users.push(user);
    fs.writeFileSync(`${userPath}/users.txt`, JSON.stringify(users) , (err) => {
    });
    ctx.body = user;
    ctx.status = 200;
}

const findUser = (userHash) => {
    const result = users.find(item => item.hash === userHash);
    return result;
}

// Check Login of User
const loginUser = (ctx) => {
    let headerHash = ctx.request.headers.authorization;
    if(headerHash && checkRegisterdUser(headerHash)){
        ctx.body = findUser(headerHash);
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
    console.log(ctx);
    let userHash =  ctx.request.headers.authorization;
    console.log(userHash);
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
router.post("/weather", getWeather, handleErrors);
router.post("/register", registerUser, handleErrors);
router.get("/login", loginUser, handleErrors);
router.del("/user/:id", deleteUser, handleErrors);
router.get("/users", getAllUsers, handleErrors);

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
console.log("server is running at http://localhost:3001");