const mongoose = require('mongoose');
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const playerSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    position: {
        type: String,
        required: true,
        maxlength: 5
    },
    number: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    mpg: {
        type: Number,
        required: false
    },
    fg: {
        type: Number,
        required: false
    },
    threePt: {
        type: Number,
        required: false
    },
    ft: {
        type: Number,
        required: false
    },
    ppg: {
        type: Number,
        required: false
    },
    rpg: {
        type: Number,
        required: false
    },
    apg: {
        type: Number,
        required: false
    },
    bpg: {
        type: Number,
        required: false
    },
    foto: {
        type: String,
        required: false
    },
    team: {
        type: String,
        required: false
    }
});
playerSchema.index({'$**': 'text'});
playerSchema.plugin(mongoosePaginate);
const Player = mongoose.model('Player', playerSchema);
function validatePlayer(player){
    const schema = Joi.object({
        fullName: Joi.string().min(2).max(255).required(),
        position: Joi.string().max(5).required(),
        number: Joi.string().required(),
        weight: Joi.string().required(),
        height: Joi.string().required(),
        age: Joi.string().required(),
        mpg: Joi.number().optional(),
        fg: Joi.number().optional(),
        threePt: Joi.number().optional(),
        ft: Joi.number().optional(),
        ppg: Joi.number().optional(),
        rpg: Joi.number().optional(),
        bpg: Joi.number().optional(),
        apg: Joi.number().optional(),
        foto: Joi.string().optional(),
        team: Joi.string().optional()
    });
    return schema.validate(player);
}

exports.Player = Player;
exports.validatePlayer = validatePlayer;
