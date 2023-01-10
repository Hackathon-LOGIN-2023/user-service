const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNoteForm = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    await newNote.save();
    res.redirect('/notes');
    //console.log(req.body);
    //console.log(newNote);
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find();
    res.render('notes/all-notes',{notes});
};

notesCtrl.renderEditForm = async (req, res) => {
    //res.send('reder edit form');
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
};

notesCtrl.updateNote = async (req, res) => {
    const{title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    //console.log(req.params.id);
    //res.send('deleting note');
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
};

module.exports = notesCtrl;