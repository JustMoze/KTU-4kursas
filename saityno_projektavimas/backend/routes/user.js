const { User, validateUser } = require('../models/user');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const bcrypt = require('bcrypt');

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
router.patch('/giveextra/:id/:bankSize', validateObjectId, async (req, res) => {
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
router.get('/id/:id', validateObjectId, async (req, res) => {
    let {id} = req.params;
    try {
        let user = await User.findById(id);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})
router.post('/', async (req, res) => {
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
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    } catch (error) {
        console.log('Occured eror', error);
    }
});

module.exports = router;