const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const favSchema = new Schema({
	ownerId: {
		type: String,
		required: true
	},
	players: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Player'
		}
	],
	logo: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
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
	}
});
const CustomTeam = mongoose.model('Custom_Team', favSchema);
function validateCustomTeam(team) {
	const schema = Joi.object({
		ownerId: Joi.string().optional(),
		players: Joi.array().items(
			Joi.object({
				_id: Joi.string().required(),			
			})
        ).optional(),
        logo: Joi.string().required(),
        name: Joi.string().required(),
        ppg: Joi.number().optional(),
        rpg: Joi.number().optional(),
        apg: Joi.number().optional(),
        fg: Joi.number().optional(),
        threePt: Joi.number().optional(),
        ft: Joi.number().optional(),
    });
    return schema.validate(team);
};

exports.CustomTeam = CustomTeam;
exports.validateCustomTeam = validateCustomTeam;