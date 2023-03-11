const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../db/schema/employee')


//get all employees
router.get('/', async (req, res, next) => {
    try {
        const employee = await Employee.find()
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// add employee
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        let check_employee = await Employee.find({email: req.body.email})
        if(check_employee.length > 0) {
            res.status(200).send({msg: "Employee already exists"})
        }
        else{
            const date = new Date(`${req.body.date} GMT`)
            delete req.body.date
            console.log({name: req.body.name, email: req.body.email, phone:req.body.phone, hireDate: date, position: req.body.position})

            let employee = new Employee({...req.body, hireDate: date})
            employee = await employee.save()
            
            res.status(200).json(employee)
        }
        
    } catch (error){
        res.status(500).json({ error: error })
    }
})

// update employee details
router.put('/', async (req, res, next) => {
    try {
        // console.log(req.body)
        let employee = await Employee.updateOne({email: req.body.email}, {$set: req.body})
        // employee = await employee.save()

        if(employee.modifiedCount){
            res.status(200).json({msg:"employee data updated successfully",employee})
        }
        else{
            res.status(200).json({msg:"Not found any Employee"})
        }
          
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/', async (req, res, next) => {
    try {
        // console.log(req.body)
        
            let employee = await Employee.deleteOne({email: req.body.email})
            if(employee.deletedCount){
                res.status(200).json({msg:"deleted suceessfully",employee})

            }
            else{
                res.status(200).json({msg:"Not found any Employee"})
            }
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router