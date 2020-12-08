const { User, validateUser } = require('../models/user');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const bcrypt = require('bcrypt');
const admin = require('../middleware/admin');
const _ = require("lodash");
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:page', (req, res) => {
    try {
		const options = {
			page: req.params.page,
			limit: 15,
			collation: {
				locale: 'en',
			},
		};
		User.paginate({}, options, (er, result) => {
			if(!er){
				res.json(result.docs);
			}
		})
	} catch (ex) {
		throw new Error(ex);
	}
});
router.patch('/giveextra/:id/:bankSize', [validateObjectId, auth, admin], async (req, res) => {
    let {bankSize, id} = req.params;
    if(!isNaN(bankSize)){
        try {
            const user = await User.findById(id);
            let newBank = (parseFloat(user.bank) + parseFloat(bankSize)).toFixed(2);
            await User.findByIdAndUpdate({_id: id}, {bank: newBank}, { useFindAndModify: true });   
            res.send("Successfully updated");
        } 
        catch (error) {
            res.send(error);
        }     
    } else res.send("Bad format");
});
router.patch('/win/:id', [validateObjectId, auth], async (req, res) => {
    let {id} = req.params;
    try {
        await User.findByIdAndUpdate(id, {
            $inc: {
                wins: 1
            }
        });
        res.status(200).json({message: 'user is updated'});
    } catch (ex) {
        res.status(200).json({message: ex.message})
    }
})
router.patch('/lose/:id', [validateObjectId, auth], async (req, res) => {
    let {id} = req.params;
    try {
        await User.findByIdAndUpdate(id, {
            $inc: {
                losses: 1
            }
        });
        res.status(200).json({message: 'user is updated'});
    } catch (ex) {
        res.status(200).json({message: ex.message})
    }
})
router.get('/id/:id', [validateObjectId, admin], async (req, res) => {
    let {id} = req.params;
    try {
        let user = await User.findById(id);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});
router.get('/record/:id', [validateObjectId, auth], async (req, res) => {
    let {id} = req.params;
    try {
        let user = await User.findById(id);
        res.status(200).json({wins: user.wins, losses: user.losses});
    } catch(ex) {
        res.status(404).json(ex.message)
    }
});

router.post('/', async (req, res) => {
    console.log("req.body", req.body)
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('User already registerd.');
        user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
            wins: 0,
            losses: 0         
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log("user to save -> ", user);
        await user.save();

        const token =  user.generateAuthToken();
        console.log("token -> ", token);
        res.header("x-auth-token", token)
        .send(_.pick(user, ["_id", "username", "email", "isAdmin"]));
    } catch (ex) {
        res.send(400);
    }
});

module.exports = router;