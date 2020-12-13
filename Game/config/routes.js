const express = require('express');
const CursoController = require('../app/controllers/curso');
const MainController = require('../app/controllers/main');
const Router = express.Router()

Router.get('/',                 MainController.index);
Router.get('/sobre',            MainController.sobre);
Router.get('/game',             MainController.game);
Router.get('/areas',            MainController.area);
Router.get('/curso',            CursoController.index);
Router.get('/curso/read/:id',   CursoController.read);
Router.get('/curso/create',     CursoController.create);
Router.post('/curso/create',    CursoController.create);
module.exports = Router;