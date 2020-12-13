const express = require('express')
const app = express()
const logger = require('morgan');
const handlebars = require('express-handlebars');
const Router = require('./config/routes');
const sass = require('node-sass-middleware');

app.use(logger('short'))

app.use(express.urlencoded({extended: false}))

app.use(Router);

app.use(sass({
    src: __dirname+"/public/sass/",
    dest: __dirname+"/public/css/",
    outputStyle: "compressed",
    prefix: '/css',
}
))

app.use('/webfonts', express.static(__dirname+"/node_modules/@fortawesome/fontawesome-free/webfonts"));
app.use('/', express.static(__dirname+"/public"));

app.use('/js', [
    express.static(__dirname+"/node_modules/jquery/dist/"),
    express.static(__dirname+"/node_modules/popper.js/dist/umd/"),
    express.static(__dirname+"/node_modules/bootstrap/dist/js/"),    
]);


app.engine('handlebars', handlebars({
    helpers: require(__dirname+"/app/views/helpers/helpers.js")
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname+"/app/views");

app.listen(5000);
console.log("Listening at port 5000");