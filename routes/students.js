const express = require('express');
const router = express.Router();

const Student = require('../models/student');


//get routes starts here
router.get('/', (req, res)=> {
    Student.find({})
        .then(students => {
            res.render('index', {students : students});
        })
        .catch(err=> {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        })
    
});

router.get('/student/new', (req,res)=> {
    res.render('new');
});

router.get('/student/search', (req,res)=> {
    res.render('search', {student:""});
});

router.get('/student', (req,res)=> {
    let searchQuery = {name : req.query.name};

    Student.findOne(searchQuery)
        .then(student => {
            res.render('search', {student:student});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

router.get('/edit/:id', (req, res)=> {

    let searchQuery = {_id : req.params.id};
    Student.findOne(searchQuery)
        .then(student => {
            res.render('edit', {student:student});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

//get routes ends here


//post routes starts here
router.post('/student/new', (req,res)=> {
    let newStudent = {
        name : req.body.name,
        class : req.body.class,
        roll_num : req.body.roll_num,
        reg_num: req.body.reg_num,
        mob_num: req.body.mob_num,
        address: req.body.address
    };

    Student.create(newStudent)
        .then(student => {
            req.flash('success_msg', 'Student data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//post routes end here

//put routes starts here

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Student.updateOne(searchQuery, {$set: {
        name : req.body.name,
        class : req.body.class,
        roll_num : req.body.roll_num,
        reg_num: req.body.reg_num,
        mob_num: req.body.mob_num,
        address: req.body.address
    }})
    .then(student => {
        req.flash('success_msg', 'Student data updated successfully.')
        res.redirect('/');
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: '+err)
        res.redirect('/');
    });
});

//put routes ends here


//delete routes starts here
router.delete('/delete/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Student.deleteOne(searchQuery)
        .then(student=>{
            req.flash('success_msg', 'Student deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//delete routes ends here
module.exports = router;