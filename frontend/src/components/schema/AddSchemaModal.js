import { Box, Typography } from '@mui/material';
import React from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '80%',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AddSchemaModal() {
    return (
        <div>
            <Box sx={style}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {/* {data.name} */}
                    </Typography>
                </Box>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </div>
    );
}


export default AddSchemaModal;
