const router = require('express').Router();
const { response } = require('express');
const { Student, Campus, Quote } = require('../db');

router.get('/', async(req, res, next) => {
    try{
        const students = await Student.findAll();
        res.send(students)
    }catch(error){
        next(error);
    }
});

router.get('/:studentId', async(req, res, next) => {
    
    try{
        const student = await Student.findByPk(req.params.studentId);
        res.send(student);
    }catch(error){
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try{
        res.status(201).send(await Student.create(req.body));
    }catch(error){
        console.log('STUDENT NOT ADDED!')
        next(error);
    }
});


router.delete('/:studentId', async(req, res, next) => {
    try{
        const student = await Student.findByPk(req.params.studentId);
        await student.destroy();
        res.send(student);
    }catch(error){
        console.log('STUDENT NOT DELETED!')
        next(error);
    }
});

router.put('/:studentId', async(req, res, next) => {
    try{
        const student = await Student.findByPk(req.params.studentId);
        res.send(await student.update(req.body));
    }catch(error){
        console.log('STUDENT NOT UPDATED!')
        next(error);
    }
})
module.exports = router;