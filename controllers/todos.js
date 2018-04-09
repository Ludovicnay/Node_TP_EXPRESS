var express = require('express')
var router = express.Router()
const db = require('../models/index.js')

  //Pour voir les todos
  router.get('/', (req, res) => {
    let todos = [];
    let where = {};

    if (req.session.userId !== undefined){
        where.userId = req.session.userId;
    }

    if(req.query.completion !== undefined){
        where.completion = req.query.completion;
    }
    db.Todo.findAll({
    }).then(result => {
        result.forEach(row => {
            todos.push(row.dataValues) ;
        });
        res.format({
            html: () => {
                    return res.render('todos/', {
                    title: 'Liste des todos : ',
                    todos:todos
                });
                },
            json: () => { res.json(todos); }
        });
    }).catch((error) => {
        res.send(error);
    });
});

  //Voir qu'un seul todo
router.get('/:id', (req, res) => {
    db.Todo.find({
      where: {
        id: req.params.id
      }
    }).then((todo) => todo ? res.json(todo) : res.status(404).json({error: "Essai un autre"}))
  })
    
    
// Pour créer un todo
router.post('/create', (req, res) =>{
    db.Todo.create({
      title: req.body.title,
      UserId: req.body.user_id
    }).then((todo) =>res.json(todo))
  })
  

// Pour modifier ou effacer
  router.put('/:id', (req, res) =>{
    db.Todo.find({
      where: {
        id: req.params.id
      }
    }).then((todo) => {
      if(todo){
        todo.updateAttributes({
          title: req.body.title,
          complete: req.body.complete
        }).then(function(todo) {
          res.send(todo)
        })
      } else
        res.status(404).json({error: "Essai un autre"})
    })
  })

  router.delete('/:id', (req, res) => {
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then((todo) => todo ? res.json(todo) : res.status(404).json({error: "Essai un autre"}))
})


  module.exports = router