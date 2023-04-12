const express = require("express")
const axios = require('axios')
const router = express.Router()
const Entry = require('../models/entries')
let responseData;

//API CALL
// axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${namePrefix}`, {
//     headers: {
//         'x-rapidapi-key': 'ad4dc71239mshc5a1fd6d4883f1dp11d351jsnb9203a044396',
//         'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
//         'useQueryString': true
//     },
//     params: {
//         limit: 2,
//         offset: 0,
//         sort: '-population'
//     }
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });

// I 
router.get('/', async (req, res) => {
    const foundEntries = await Entry.find({})
    res.render('entries/index.ejs',{
        entries: foundEntries
    })
})

// N
router.get('/new', (req, res)=> {
    res.render('entries/new.ejs')
})


// D 
router.delete('/:id', async (req, res) => {
    await Entry.findByIdAndRemove(req.params.id)
    res.redirect('/entries')
})

// U 
router.put('/:id', async (req,res) => {
    if (req.body.imageYours === "on") {
        req.body.imageYours = true
      } else {
        req.body.imageYours = false
      }

    if (req.body.visited === "on") {
        req.body.visited = true
      } else {
        req.body.visited = false
      }
    await Entry.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/entries')
})

// C 
router.post('/', (req,res)=> {
    if (req.body.imageYours === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.imageYours = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.imageYours = false;
	}

    if (req.body.visited === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.visited = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.visited = false;
	}
    const createdPost = new Entry(req.body)
    createdPost.save().then(res.redirect('/entries'))
})
// E
router.get('/:id/edit', async (req, res) => {
    const foundEntry = await Entry.findById(req.params.id)
    res.render('entries/edit.ejs', {
        entry: foundEntry
    }) 
})
// S is for SHOW
router.get('/:id', async (req, res) => {
    const foundEntry = await Entry.findById(req.params.id).exec()
    res.render('entries/show.ejs', {
        entry: foundEntry
    }
    )
})


module.exports = router