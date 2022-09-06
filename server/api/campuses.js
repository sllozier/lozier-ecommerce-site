const router = require('express').Router();
const { Campus, Student } = require('../db');

router.get('/', async(req, res, next) => {
    try{
        const campuses = await Campus.findAll();
        res.send(campuses);
    }catch(error){
        next(error);
    }
});

router.get('/:campusId', async (req, res, next) => {
    try{
        const campus = await Campus.findByPk(req.params.campusId, {
            include: {
                model: Student
            }
        });
        res.send(campus);
    }catch(error){
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try{
        res.status(201).send(await Campus.create(req.body));
    }catch(error){
        next(error);
    }
});


router.delete('/:campusId', async(req, res, next) => {
    try{
        const campus = await Campus.findByPk(req.params.campusId);
        await campus.destroy();
        res.send(campus);
    }catch(error){
        next(error);
    }
});

router.put('/:campusId', async(req, res, next) => {
    try{
        const campus = await Campus.findByPk(req.params.campusId, {
            include: {
                model: Student
            }
        });
        res.send(await campus.update(req.body));
    }catch(error){
        next(error);
    }
});


module.exports = router;
