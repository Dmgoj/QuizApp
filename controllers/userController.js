var UserModel = require('../models/userModel.js');
const bcrypt = require('bcrypt')

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    test: (req,res)=>{
        res.end("NOT LOGGED IN")
    },

    /**
     * userController.profile()
     */
    profile: function(req,res) {
        console.log("In profile function");
        console.log("req.session.userId:", req.session.userId);
        res.json({ message: "IT WORKS", session: req.session.userId })
        
    },

    /**
     * userController.register()
     */
    register: async (req, res) => {
        try{
        const {name,password} = req.body
        console.log(`${name}`)
        
        // Check for empty input
        if(!name || !password) {
            res.status(400)
            throw new Error("Please enter both fields")
        }

        // Check if user already exists
        const userExists = await UserModel.findOne({name})
        if(userExists){
            res.status(400)
            throw new Error("User already exists")
        }

        // Password hash
        const salt = await bcrypt.genSalt()
        const hashedPassword= await bcrypt.hash(password,salt)

        // Create user
        const user = await UserModel.create({
            name,
            password: hashedPassword,
        })

        return res.status(201).json(user); 
    } catch (Error) {
        res.status(400).json(Error.message)
        
    }

        
    },

    /**
     * userController.login()
     */
    login: async(req,res) =>{

        try{
        const {name,password} = req.body
        // Check for empty input
        if(!name || !password) {
            res.status(400)
            throw new Error("Please enter both fields")
        }
        
        // Check name and password
        user = await UserModel.findOne({name})
        

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
        
            if (passwordMatch) {
              req.session.userId = user._id;
              res.status(200).json({
                name: user
              });
            } else {
              res.status(401);
              throw new Error("Wrong credentials!!");
            }
            } else {
                res.status(401);
                throw new Error("Wrong credentials!")
            }
        } catch (Error) {
            res.json(Error.message)
        }
    },


    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
