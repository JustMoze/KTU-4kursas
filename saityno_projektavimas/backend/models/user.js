const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minlength: 5,
        required: true
    },
    favTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite_Team',
        required: false
    },
    favPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: false
    }, 
    bank: {
        type: Number,
        default: 25000000
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin
        },
        config.get('jwtPrivateKey')
    );
    return token;
};

userSchema.index({'$**': 'text'});
userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', userSchema);
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        username: Joi.string().min(5).required(),
        favTeam: Joi.string().optional(),
        favPlayer: Joi.string().optional(),
        isAdmin: Joi.bool().optional(),
        bank: Joi.number().optional()
    });
    return schema.validate(user);
}
exports.User = User;
exports.validateUser = validateUser;