import React, { useState } from 'react';
import axios from "axios";
import Style from './Home.module.scss';
import { Box, Button, FormControlLabel, Grid, Grow, Modal, Switch, Typography } from "@mui/material";
import { baseURL, schemas } from '../../store/data';
import AddSchemaModal from './AddSchemaModal';
import SchemaIcon from './SchemaIcon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SchemaModal from './SchemaModal';



export default function Schema({darkMode}) {

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [schemas, setschemas] = useState([]);

   React.useEffect(() => {
      axios.get(baseURL+"/allEvent/").then((response) => {
         setschemas(response.data.data);
      });
    }, []);

   return (
      <Box sx={{ height: 180, padding: 5 }}>

         <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}
            justifyContent={'center'} marginTop={5}>
            <Grid container spacing={2}>
               {schemas.map((schema, index) => {
                  return (
                     <Grow in={true} key={schema.id} {...({ timeout: index * 500 })}>
                        <Grid item xs={2} >
                           <SchemaIcon schema={schema} darkMode={darkMode} />
                        </Grid>
                     </Grow>)
               })}
               <Box style={{ height: '100%', margin: '55px' }} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                  <Button onClick={handleOpen} >
                     <Typography variant="h6" gutterBottom>
                        Add Schema
                     </Typography>
                     {/* <AddCircleOutlineIcon /> */}
                  </Button>
               </Box>
            </Grid>
            <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <SchemaModal handleClose={handleClose} data={{
                  id: schemas.length+1,
                  name: null,
                  parameters: []
               }} darkMode={darkMode} />
            </Modal>
         </Box>
      </Box>
   )
}