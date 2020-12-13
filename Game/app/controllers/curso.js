const area = require('../models/area');
const curso = require('../models/curso');
const models = require('../models/index')
const Area = models.Area;
const Curso = models.Curso;

const CursoController = {
    index: async (req, res) => {
        const cursos = await Curso.findAll();
        res.render('curso/index', {
            cursos: cursos.map(curso => curso.toJSON())
        });
    },
    create: async (req, res) => {
        let areas = await Area.findAll()
        if (req.route.methods.get) {
            res.render('curso/create', {
                areas: areas.map(area => area.toJSON()),
            });
        } else {
            try {
                const {sigla, nome, descricao, areaId} = req.body;
                await Curso.create({
                    sigla: sigla,
                    nome: nome,
                    descricao: descricao,
                    areaId: areaId,
                });
                res.redirect('/curso');
            } catch (e) {
                console.log(e);
                res.render('curso/create', {
                    areas: areas.map(area => area.toJSON()),
                    errors: e.errors,
                });
            }
        }
    },
    read: async (req, res) => {
        let curso = await Curso.findByPk(req.params.id, {include: Area});
        res.render('curso/read', {
            curso: curso.toJSON(),
        })
    }
}

module.exports = CursoController;