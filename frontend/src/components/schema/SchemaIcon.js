import React, { useState } from 'react';
import { Box, Modal, Paper, Typography } from '@mui/material';
import SchemaModal from './SchemaModal';

function SchemaIcon({ schema }) {
   const [elevation, setElavation] = useState(4);
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   return (
      <Paper onClick={handleOpen} sx={{ m: 1 }} elevation={elevation} onMouseEnter={() => setElavation(10)} onMouseLeave={() => setElavation(4)} style={{ cursor: 'pointer' }}>
         <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'center'} sx={{ height: 100 }}>
            <Typography variant="h6" gutterBottom>
               Schema: {schema.id}
            </Typography>
         </Box>
         <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <SchemaModal data={schema} handleClose={handleClose}/>
            </Modal>
      </Paper>
   );
}


export default SchemaIcon;
