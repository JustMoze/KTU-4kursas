const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    id: {
        type: number
    },
    abbreviation: {
        type: string,
        minlength: 3,
        maxlength: 5,
    },
    city: {
        type: 'string',
        maxlength: 255
    },
    conference: {
        type: string,
        minlength: 4,
        maxlength: 6
    },
    full_name: {
        type: string,
        minlength: 5
    },
    name: {
        type: string,
        minlength: 5
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }]
});

const Team = mongoose.model('Team', teamSchema);
function validateTeam(team) {
    const schema = Joi.object({
        id: Joi.number().required(),
        abbreviation: Joi.string().required().min(3).max(5),
        city: Joi.string().max(255).required(),
        conference: Joi.string().min(4).max(6).required(),
        full_name: Joi.string().min(5).required(),
        name: Joi.string().min(5).required(),
        players: Joi.array().items(
            Joi.object({
                name: Joi.string().min(2).max(255).required(),
                surname: Joi.string().min(1).max(255).required(),
                position: Joi.string().max(20).required(),
                weight: Joi.string().required(),
                teamId: Joi.string().required()
            })
        )
    });
    return schema.validate(team);
}

exports.validateTeam = validateTeam;
exports.Team = Team;