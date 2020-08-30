"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
    // id (Integer, primary key, auto-generated)
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        //Refactored to feature validation messages:
        
    // firstName (String)
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide "Name" for Sign Up.',
                    },
                    notNull: {
                        msg: 'Sign Up with a valid "Name".',
                    },
                },
        },
    // lastName (String)
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please provide a "Surname" / "Last Name" / "Family Name" to Sign Up',
                    },
                    notNull: {
                        msg: 'Invalid "Name" entry, please try again.',
                    },
                },
        },
    // emailAddress (String)
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "E-Mail is required for creating an account and Sign In.",
                },
                isEmail: true,
            },
        },
    // password (String)
        password: {
            type: Sequelize.STRING,
            allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Please do include a secure password.",
                    },
                },
        },

    }, { sequelize } );

    User.associate = (models) => {
        /*Define a HasMany association between User and Course models
         (i.e. a "User" has many "Courses").*/

         User.hasMany(models.Course, {
             as: "user",
            foreignKey: { 
                fieldName: "userId",
                allowNull: false,
            }
         });
    }

    return User;
}