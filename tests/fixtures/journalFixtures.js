export const notes = [
    {
        id: '25yw7Kgy3YTsaFiJIQvj',
        imageUrls: [
            'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/g5xfr8cya2ympfwhjorj.jpg',
            'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/vnkj4pb0ogp8aghbso3j.jpg',
            'https://res.cloudinary.com/x-app-react-x/image/upload/v1707061666/journal-app/hcsb21dlo6xiw0ayahkw.jpg'
        ],
        date: 1706767409023,
        body: 'Mi increible compañerita',
        title: 'Mi compañerita'
    },
    {
        id: 'IoxopXTPxwh7emtVeROe',
        imageUrls: [],
        date: 1706767409023,
        body: 'Creando una nueva nota desde producción',
        title: 'Nueva nota'
    }
]

export const emptyNote = {
    id: 'fx27JFuAPHNYtWEPcZwh',
    imageUrls: [],
    date: 1707087918744,
    body: '',
    title: ''
}

export const updatedNote = {
    id: 'fx27JFuAPHNYtWEPcZwh',
    imageUrls: [],
    date: 1707087918744,
    body: 'This is an updated Note',
    title: 'Updated Note'
}

export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
}

export const journalWithEmptyNoteState = {
    isSaving: false,
    messageSaved: '',
    notes: [emptyNote],
    activeNote: null
}

export const journalWithNotesState = {
    isSaving: false,
    messageSaved: '',
    notes: notes,
    activeNote: null
}

export const journalWithActiveNoteState = {
    isSaving: false,
    messageSaved: '',
    notes: notes,
    activeNote: notes[0]
}