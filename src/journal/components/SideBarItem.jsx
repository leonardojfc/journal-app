import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote } from "../../store/journal"

export const SideBarItem = ({title, body, id}) => {
    const {notes = []} = useSelector(state => state.journal);
    const dispatch = useDispatch(); 
    const newTitle = useMemo( () => {
        return title.length > 17 ? title.substring(0,17) + ' ...' : title;
    }, [title])

    const onClickNote = () =>{
        const note = notes.find((note) => note.id === id);
        dispatch( setActiveNote(note) );
    }
  return (
    <ListItem disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={body}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
