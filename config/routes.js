var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
var _ = require('underscore');

module.exports = function(app) {
    //pre handle  user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        var warn=req.session.warn;
        delete req.session.warn;  
        if (_user) {
            app.locals.user = _user;
        } else {
            app.locals.user = "";
        }
        if (warn) {
            console.log(req.session.warn);
            app.locals.warn = warn;
        } else {
            app.locals.warn = "";
        }

        next();
    });
    //Index
    app.get('/', Index.index);
    //Movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie/new', User.signinRequire, User.adminRequire, Movie.new);
    app.get('/admin/movie/update/:id', User.signinRequire, User.adminRequire, Movie.update);
    app.post('/admin/movie/save', User.signinRequire, User.adminRequire, Movie.save);
    app.get('/admin/movie/list', User.signinRequire, User.adminRequire, Movie.list);
    app.delete('/admin/movie/list', User.signinRequire, User.adminRequire, Movie.del);
    //User
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/admin/user/list', User.signinRequire, User.adminRequire, User.userlist);
    app.get('/logout', User.logout);
    app.delete('/admin/user/list', User.signinRequire, User.adminRequire, User.del);
    //Comment
    app.post('/user/comment', User.signinRequire, Comment.save);
    //Category
    app.get('/admin/category/new', User.signinRequire, User.adminRequire, Category.new);
    app.get('/admin/category/list', User.signinRequire, User.adminRequire, Category.list);
    app.post('/admin/category/save', User.signinRequire, User.adminRequire, Category.save);

    //result
    app.get('/results',Index.search);
}