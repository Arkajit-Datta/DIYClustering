import { Box, Modal, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatapointModal from './DatapointModal';

function DatapointIcon({ data ,darkMode}) {
    const [elevation, setElavation] = useState(4);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Paper onClick={handleOpen} sx={{ m: 1 }}
            elevation={elevation} onMouseEnter={() => setElavation(10)}
            onMouseLeave={() => setElavation(4)} style={{ cursor: 'pointer',backgroundColor: darkMode?"rgb(187,187,187)":"rgb(46, 46, 46)" }}>
            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'center'} sx={{ height: 100 }}>
                <Typography variant="h6" gutterBottom style={{ cursor: 'pointer', color: !darkMode?"white":"black" }}>
                    Data Point: {data.id}
                </Typography>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DatapointModal data={data} handleClose={handleClose} />
            </Modal>
        </Paper>
    );
}


export default DatapointIcon;
