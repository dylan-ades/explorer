const express = require("express")
const multer = require('multer');
const router = express.Router()
const Entry = require('../models/entries')
let images;

//Middleware
const upload = multer({ dest: 'uploads/' });

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

router.put('/:id', upload.array('images'), async (req, res) => {
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
  
    images = req.files.map(file => file.filename);
  
    const updatedEntry = {
      country: req.body.country,
      city: req.body.city,
      region: req.body.region,
      images,
      imageYours: req.body.imageYours,
      visited: req.body.visited,
    };
  
    await Entry.findByIdAndUpdate(req.params.id, updatedEntry);
    res.redirect('/entries');
  });
// router.put('/:id', async (req,res) => {
//     if (req.body.imageYours === "on") {
//         req.body.imageYours = true
//       } else {
//         req.body.imageYours = false
//       }

//     if (req.body.visited === "on") {
//         req.body.visited = true
//       } else {
//         req.body.visited = false
//       }
//     await Entry.findByIdAndUpdate(req.params.id, req.body)
//     res.redirect('/entries')
// })

// C 
router.post('/', upload.array('images'), (req, res) => {
  if (req.body.imageYours === 'on') {
    req.body.imageYours = true;
  } else {
    req.body.imageYours = false;
  }

  if (req.body.visited === 'on') {
    req.body.visited = true;
  } else {
    req.body.visited = false;
  }

  images = req.files.map(file => file.filename);

  const newEntry = new Entry({
    country: req.body.country,
    city: req.body.city,
    region: req.body.region,
    images,
    imageYours: req.body.imageYours,
    visited: req.body.visited,
  });

  newEntry.save().then(() => {
    res.redirect('/entries');
  });
});

// router.post('/', (req,res)=> {
//     if (req.body.imageYours === 'on') {
// 		//if checked, req.body.completed is set to 'on'
// 		req.body.imageYours = true;
// 	} else {
// 		//if not checked, req.body.completed is undefined
// 		req.body.imageYours = false;
// 	}

//     if (req.body.visited === 'on') {
// 		//if checked, req.body.completed is set to 'on'
// 		req.body.visited = true;
// 	} else {
// 		//if not checked, req.body.completed is undefined
// 		req.body.visited = false;
// 	}
//     const createdPost = new Entry(req.body)
//     createdPost.save().then(res.redirect('/entries'))
// })

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