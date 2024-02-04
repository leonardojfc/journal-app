import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from '../../../src/store/journal/journalSlice'
import { emptyNote, initialState, journalWithActiveNoteState, journalWithEmptyNoteState, journalWithNotesState, notes, updatedNote } from '../../fixtures/journalFixtures';
describe('Pruebas en journalSlice', () => { 
    test('should return initialState and named "journal"', () => { 
        const state = journalSlice.reducer( initialState, {} );
        expect(state).toEqual( initialState );
        expect(journalSlice.name).toBe('journal');
    });    
    test('should change isSaving when save a new note', () => { 
        const state = journalSlice.reducer( initialState, savingNewNote() );
        expect(state.isSaving).toBeTruthy();
    });    
    test('should add a new empty note', () => {
        const state = journalSlice.reducer( initialState, addNewEmptyNote(emptyNote) );
        expect(state.isSaving).toBeFalsy();
        expect(state.notes.length).toBe(1);
    });    
    test('should set an active note', () => {
        const state = journalSlice.reducer( initialState, setActiveNote(emptyNote) );
        expect(state.activeNote).toEqual(emptyNote);
        expect(state.messageSaved).toBe('');
    });    
    test('should set notes', () => {
        const state = journalSlice.reducer( initialState, setNotes(notes) );
        expect(state.notes).toEqual(notes);
    });    
    test('should set saving', () => {
        const state = journalSlice.reducer( initialState, setSaving() );
        expect(state.isSaving).toBeTruthy();
        expect(state.messageSaved).toBe('');
    });    
    test('should update a note', () => {
        const state = journalSlice.reducer( journalWithEmptyNoteState, updateNote(updatedNote));
        expect(state.isSaving).toBeFalsy();
        expect(state.notes).toEqual([updatedNote])
        expect(state.messageSaved).toBe(`${updatedNote.title} actualizada correctamente`);
    });    
    test('should set photos to an active note', () => {
        const newUrls = ['https://demo.jpg', 'https://image.jps']
        const state = journalSlice.reducer( journalWithActiveNoteState, setPhotosToActiveNote(newUrls));
        expect(state.isSaving).toBeFalsy();
        expect(state.activeNote.imageUrls.length).toBe(5);
    });    
    test('should clear notes', () => {
        const state = journalSlice.reducer( journalWithNotesState, clearNotesLogout());
        expect(state.isSaving).toBeFalsy();
        expect(state.messageSaved).toBe('');
        expect(state.notes.length).toBe(0);
        expect(state.activeNote).toBe(null);
    });    
    test('should delete a note by its id', () => {
        const state = journalSlice.reducer( journalWithActiveNoteState, deleteNoteById(notes[0].id));
        expect(state.activeNote).toBe(null);
        expect(state.notes.length).toBe(1);
    });    
})