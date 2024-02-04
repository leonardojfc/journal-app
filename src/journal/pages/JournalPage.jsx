import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {
  const {isSaving, activeNote} = useSelector(state => state.journal);
  const dispatch = useDispatch();
  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      {/* <Typography>
        Aute cillum Lorem nulla mollit exercitation proident eiusmod velit proident ad ad magna elit duis.
        Excepteur proident dolore quis voluptate magna eu.
      </Typography> */}
      {
        !!activeNote 
        ? <NoteView/>
        :<NothingSelectedView/>
      }

      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={isSaving}
        onClick={onClickNewNote}
        >
          <AddOutlined sx={{ fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  )
}
