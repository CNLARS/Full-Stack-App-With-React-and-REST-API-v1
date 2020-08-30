"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
    // id (Integer, primary key, auto-generated)
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

    // title (String)
        title: {
            type: Sequelize.STRING,
            allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Please do include a title.",
                    },
                    notNull: {
                        msg: "Course must have title.",
                    },
                },
        },
    // description (Text)
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "A description is requested to create a new Course.",
                    },
                    notNull: {
                        msg: "Course must have a valid description.",
                    },
                },
        },

    // estimatedTime (String, nullable)
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    // materialsNeeded (String, nullable)
        materialsNeeded: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, { sequelize } );

    //Associates:
    Course.associate = (models) => {
        /*Define a belongsTo association between Course and User models
         (i.e. a "Course" belongs to a single "User").*/
         Course.belongsTo(models.User, {
             as: "user",
            foreignKey: { 
                fieldName: "userId",
                allowNull: false,
            }
         });
    };
    return Course;
}