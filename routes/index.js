var db = require('../user/database_schema');

exports.index = function(req, res){
    db.find({},function (err,posts) {
        if(err){
            throw err;
        }
        res.render('index',{posts:posts});
    })
};

exports.new_post = function(req, res) {
    var post = new db({
        name : req.body.name,
        todo : req.body.todo,
    });
    post.save(function (err) {
        if(err){
            throw err;
        }
        res.redirect('/');
    })
};

exports.get_update = function (req,res) {
    db.findOne({_id:req.params.id},function(err,anss){
        if(err){
            throw err;
        }
        else{
            res.render('update',{posts:anss});
        }
    })
};

exports.post_update = function (req,res) {
    db.update({_id:req.params.id},
        {name:req.body.name,
            todo:req.body.todo},function(err,ans){
        if(err){
            throw err;
        }
        else{
            res.redirect('/');
        }
    });
};

exports.get_delete = function (req,res){
    db.remove({_id: req.params.id},function(err){
        if(err) throw err;
        else res.redirect('/');
    });
};
