const mongoose = require('mongoose')
const matchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    homeTeamScore: {
        type: String,
        required: true
    },
    awayTeamScore: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    }
})

let Match = mongoose.model('Match', matchSchema, 'matches')

module.exports = Match