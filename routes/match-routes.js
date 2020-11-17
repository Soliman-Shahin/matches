const express = require("express")
const router = express.Router()
const Match = require('../models/match-model')

//create new match
router.get('/create', (req, res) => {
    res.render('match/create', {
        errors: req.flash('errors')
    })
})

// route to home match
router.get('/:pageNo?', (req, res) => {
    let pageNo = 1

    if (req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo == 0) {
        pageNo = 1
    }

    let q = {
            skip: 5 * (pageNo - 1),
            limit: 5
        }
        //find total documents
    let totalDocs = 0

    Match.countDocuments({}, (err, total) => {

    }).then((response) => {
        totalDocs = parseInt(response)
        Match.find({}, {}, q, (err, matches) => {
            //     res.json(matches)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < matches.length; i += chunkSize) {
                chunk.push(matches.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('match/index', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo
            })
        })
    })
})


// save match to db
router.post('/create', (req, res) => {

    let newMatch = new Match({
        date: req.body.date,
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        homeTeamScore: req.body.homeTeamScore,
        awayTeamScore: req.body.awayTeamScore,
        isActive: req.body.isActive,
        league: req.body.league
    })

    newMatch.save((err) => {
        if (!err) {
            console.log('match was added')
            req.flash('info', ' The match was created successfully')
            res.redirect('/matches')
        } else {
            console.log(err)
        }
    })
})

// show single match
router.get('/show/:id', (req, res) => {
    Match.findOne({ _id: req.params.id }, (err, match) => {

        if (!err) {

            res.render('match/show', {
                match: match
            })

        } else {
            console.log(err)
        }

    })

})

// edit route

router.get('/edit/:id', (req, res) => {

    Match.findOne({ _id: req.params.id }, (err, match) => {

        if (!err) {

            res.render('match/edit', {
                match: match,
                errors: req.flash('errors'),
                message: req.flash('info')
            })

        } else {
            console.log(err)
        }

    })

})

// update the form

router.post('/update', (req, res) => {
    let newfeilds = {
        date: req.body.date,
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        homeTeamScore: req.body.homeTeamScore,
        awayTeamScore: req.body.awayTeamScore,
        isActive: req.body.isActive,
        league: req.body.league
    }
    let query = { _id: req.body.id }

    Match.updateOne(query, newfeilds, (err) => {
        if (!err) {
            req.flash('info', " The match was updated successfully"),
                res.redirect('/matches/edit/' + req.body.id)
        } else {
            console.log(err)
        }
    })
})

//delete match
router.delete('/delete/:id', (req, res) => {

    let query = { _id: req.params.id }

    Match.deleteOne(query, (err) => {

        if (!err) {
            res.status(200).json('deleted')
        } else {
            res.status(404).json('There was an error .Match was not deleted')
        }
    })
})

module.exports = router