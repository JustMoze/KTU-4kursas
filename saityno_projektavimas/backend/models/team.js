const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    conference: {
        type: String,
        minlength: 4,
        maxlength: 6
    },
    abbreviation: {
        type: String,
        minlength: 2,
        required: false
    },
    full_name: {
        type: String,
        minlength: 5
    },
    ppg: {
        type: Number,
        required: false
    },  
    oppg: {
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
    winP: {
        type: String,
        required: false
    }, 
    logo: {
        type: String, 
        required: false
    },
    season: {
        type: String,
        default: '2019-2020 season'
    },
    record: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true
    }
});

const Team = mongoose.model('Team', teamSchema);
function validateTeam(team) {
    const schema = Joi.object({
        conference: Joi.string().min(4).max(6).required(),
        division: Joi.string().required(),
        abbreviation: Joi.string().min(2).optional(),
        full_name: Joi.string().min(5).required(),
        ppg: Joi.number().optional(),
        oppg: Joi.number().optional(),
        rpg: Joi.number().optional(),
        apg: Joi.number().optional(),
        winP: Joi.string().optional(),
        logo: Joi.string().optional(),
        record: Joi.string().required(),
        season: Joi.string().default("2019-2020 season"),
        coach: Joi.string().required()
    });
    return schema.validate(team);
}

exports.validateTeam = validateTeam;
exports.Team = Team;