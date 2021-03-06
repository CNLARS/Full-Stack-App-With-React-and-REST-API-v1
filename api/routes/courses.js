"use strict";

const express = require('express');
const router = express.Router();
const { Course, User } = require("../db/models");
const authenticateUser = require('./middleware/authenticateUser');
const asyncHandler = require("./middleware/asyncHandler");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");

//Async handler for each route to run try/catch refactored/relocated to middleware

/* COURSE ROUTES */

/* GET "/api/courses", (200): 
Returns list of courses (including the user by association) */

router.get("/courses", asyncHandler( async(req, res) => {
    const courses = await Course.findAll({
        include: {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "emailAddress"],
        }
    });
 
        if(courses){
            res.json(courses);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
}));

/* GET "/api/courses/:id", (200): 
Returns course (including the user that owns the course) for the provided course ID */
router.get("/courses/:id", asyncHandler( async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "emailAddress"],
        },
    });
        if(course){
            res.json(course);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
}));

/* POST "/api/courses" (201): 
Creates a course, sets the Location header to the URI for the course, and returns no content */
router.post("/courses",[
    check("title")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please create a "title" for the course'),
    check("description")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please add a "description" for the course'),
    ], 
    authenticateUser, asyncHandler( async(req, res) => {
        const errors = validationResult(req);
        let course;

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({errors: errorMessages});
            } else {
                course = await Course.create(req.body);
                res.location(`/courses/${course.id}`);
                res.status(201).end();
        }    
}));

/* PUT "/api/courses/:id" (204): Updates a course and returns no content */
router.put("/courses/:id",[
    check("title")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Course requires a "title"'),
    check("description")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Course requires "description"'),
    ], authenticateUser, asyncHandler( async(req, res) => {
        const errors = validationResult(req);
        let course;

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({errors: errorMessages});
            } else {
                course = await Course.findByPk(req.params.id);
                course.update(req.body);
                res.status(204).end();
            }    
}));

/* DELETE "/api/courses/:id" (204): Deletes a course and returns no content */
router.delete("/courses/:id", authenticateUser, asyncHandler( async(req, res) => {
    let course;
    try{
        course = await Course.findByPk(req.params.id);
        course.destroy();
        res.status(204).end();
    } catch(error){
        res.status(400).end();
    }
}));

module.exports = router;