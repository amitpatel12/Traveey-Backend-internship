const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../db/schema/task')

//get all task to a specific user
router.get('/:id', async (req, res, next) => {
    try {
        const task = await Task.find({employeeId: req.params.id})
        res.status(200).json({msg: "fetch successfully",task})
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// assign tasks to the employee
router.post('/:id', async (req, res, next) => {
    try {
            const id = req.params.id
            const date = new Date(`${req.body.dueDate} GMT`)
            delete req.body.dueDate
            console.log({...req.body,dueDate:date})

            let task = new Task({title: req.body.title, description: req.body.description, dueDate: date, employeeId: id})

            task = await task.save()
            console.log(task)

            res.status(200).json({msg:"task added to employee", task})
        
        
    } catch (error){
        res.status(500).json({ error: error })
    }
})

// update a specific task 
// pass in the params _id of the task
router.put('/:id', async (req, res, next) => {
    try {

        let task = await Task.updateOne({_id: req.params.id}, {$set: req.body})

        if(task.modifiedCount){
            res.status(200).json({msg:"Task data updated successfully",task})
        }
        else{
            res.status(200).json({msg:"Not found any task"})
        }
          
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


router.delete('/:id', async (req, res, next) => {
    try {
        // console.log(req.body)
        
            let task = await Task.deleteOne({_id:req.params.id})
            if(task.deletedCount){
                res.status(200).json({msg:"task deleted suceessfully",task})

            }
            else{
                res.status(200).json({msg:"Not found any task"})
            }
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router

// 7309339971 manoj kumar
// 8853175648 shikha verma