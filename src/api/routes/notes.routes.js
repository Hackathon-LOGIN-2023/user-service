const {Router} = require('express')
const router = Router()

// const { renderNoteForm, 
//         createNoteForm, 
//         renderNotes, 
//         renderEditForm, 
//         updateNote, 
//         deleteNote } = require('../controllers/notes.controller');

const Note = require('../models/Note');

router.get('/', (req,res)=>{

    res.json({ Text: 'User Services is working!', errorCode: 0, data: true });
});

router.get('/notes', async (req,res)=>{
        console.log("entra aqui")
        const notes = await Note.find();
        res.json(notes);
        });

router.post('/note/new-note', async (req,res)=>{
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    await newNote.save();
res.json({response:true,data:newNote});
});

// router.get('/notes/add', renderNoteForm)

// router.post('/notes/new-note',createNoteForm)

// // Get All Note
// router.get('/notes',renderNotes)

// //Edit Notes
// router.get('/notes/edit/:id',renderEditForm)

// router.put('/notes/edit/:id',updateNote)

// //Delete Notes
// router.delete('/notes/delete/:id',deleteNote)

module.exports = router