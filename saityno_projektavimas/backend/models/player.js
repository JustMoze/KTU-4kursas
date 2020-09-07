const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;


const playerSchema = new Schema({
    name: {
        type: string,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    surname: {
        type: string,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    position: {
        type: string,
        required: true,
        maxlength: 20
    },
    weight: {
        type: string,
        required: false
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

const Player = mongoose.model('Player', playerSchema);
function validatePlayer(player){
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        surname: Joi.string().min(1).max(255).required(),
        position: Joi.string().max(20).required(),
        weight: Joi.string().required(),
        teamId: Joi.string().required()
    });
    return schema.validate(player);
}

exports.Player = Player;
exports.validatePlayer = validatePlayer;
