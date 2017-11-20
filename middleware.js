// Handle File uploads & Multipart Data
app. use (multer({ dest: './public/images/uploads'}));
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
            root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg: msg,
            value :value
        };
    }
}));

app.use(flash());
app.use(function (req, res, next){
    res.locals.messages = require('express-messages')(req,res);
    next ();
});

app.use(function(req,res, next){
    req.db=db;
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});