const { User, validateUser } = require('../models/user');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');

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
            bank: req.body.bank,          
        });
        await user.save();
        res.send(user);
    } catch (error) {
        console.log('Occured eror', error);
    }
});

module.exports = router;