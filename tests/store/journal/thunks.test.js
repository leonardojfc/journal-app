import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "../../../src/store/journal/journalSlice";
import { startDeletingNote, startLoadingNotes, startNewNote, startSaveNote, startUploadingFiles } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";
import { notes } from "../../fixtures/journalFixtures";
import { loadNotes } from "../../../src/helpers/loadNotes";

jest.mock('../../../src/helpers/loadNotes')

describe('Pruebas en Journal Thunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks());
    test('startNewNote should create an empty note', async () => { 
        const uid = 'TEST-UID'
        getState.mockReturnValue({auth: {uid}});
        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: []
        }))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: []
        }))

        //Deleting from Firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs(collectionRef);
        
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );
    });    
    test('startLoadingNotes should set the notes', async () => {
        await loadNotes.mockResolvedValue(notes)
        await startLoadingNotes()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setNotes(notes));
    });    
    test('startSaveNote should save a note', async () => {
        const activeNote = {
            id: '25yw7Kgy3YTsaFiJIQvj',
            imageUrls: [
                'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/g5xfr8cya2ympfwhjorj.jpg',
                'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/vnkj4pb0ogp8aghbso3j.jpg',
                'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/hcsb21dlo6xiw0ayahkw.jpg'
            ],
            date: 1706767409023,
            body: 'Mi increible compañerita',
            title: 'Mi compañerita'
        }
        const uid = 'TEST-UID'
        getState.mockReturnValue({auth: {uid}, journal: {activeNote}});
        await startSaveNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith(updateNote(activeNote));

        //Deleting from Firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs(collectionRef);
        
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );
    });    
    test('startUploadingFiles should upload files', async () => {
        const imageUrl = "https://media.istockphoto.com/id/583809524/es/foto/desierto-de-alberta-cerca-de-banff.jpg?s=612x612&w=0&k=20&c=mvDownbgLZRz1Wci6yV68NRRngqWNrl_lRF6QtrdJkw="
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'landscape.jpg');
        await startUploadingFiles([file])(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith(setPhotosToActiveNote(expect.any(Array)));
    });    
    test('startDeletingNote should delete a note', async () => {
        const activeNote = {
            id: '25yw7Kgy3YTsaFiJIQvj',
            imageUrls: [
                'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/g5xfr8cya2ympfwhjorj.jpg',
                'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/vnkj4pb0ogp8aghbso3j.jpg',
                'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/hcsb21dlo6xiw0ayahkw.jpg'
            ],
            date: 1706767409023,
            body: 'Mi increible compañerita',
            title: 'Mi compañerita'
        }
        const uid = 'TEST-UID'
        getState.mockReturnValue({auth: {uid}, journal: {activeNote}});
        await startDeletingNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(deleteNoteById(activeNote.id));
    });    
})