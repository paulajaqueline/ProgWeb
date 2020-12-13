const models = require('../models/index');
const Area = models.Area;

const MainController = {
    index: (req, res) => {
        res.render('index');
    },
    sobre: (req, res) => {
        res.render('sobre');
    },
    game: (req, res) => {
        res.render('game');
    },
    area: async (req, res) => {
        const areas = await Area.findAll();
        res.render('area', {
            areas: areas.map(area => area.toJSON())
        });
    }
}

module.exports = MainController