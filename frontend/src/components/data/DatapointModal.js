import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { baseURL, paramTypes } from '../../store/data';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '65%',
    width: '40%',
    bgcolor: 'background.paper',
    border: '.5px solid #000',
    boxShadow: 24,
    p: 4,
};
function DatapointModal({ data, handleClose }) {

    const [dataPoint, setdataPoint] = useState(data.parameters);
    const [schemas, setschemas] = useState([]);


    useEffect(() => {
        console.log("Calling schema structure for schema", data.schemaName);
        axios.get(baseURL + "/allEvent/").then((response) => {
            setschemas(response.data.data);
            if (Object.keys(data.parameters).length == 0) {
                let schema = response.data.data.find((s) => 
                    s.name == data.schemaName
                );
                let newParams = {}
                schema.parameters.map((param) => { newParams[param.name] = "" })
                setdataPoint(newParams)
            }
        }).then(() => {

        });

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let rawData = { parameters: {} };
        Object.keys(dataPoint).map((key) => {
            rawData.parameters[key] = formData.get(key);
        })
        rawData.schemaName = data.schemaName;
        rawData.id = data.id;
        updateDataPoint(rawData.parameters);
        console.log(rawData);
        rawData.parameters.Rating = parseInt(rawData.parameters.Rating)
        //code to call for API for update
        axios
            .post(baseURL + "/addDataPoint", rawData)
            .then((response) => {
                console.log("Data Point update response", "")
                handleClose()
            });

    };

    let updateDataPoint = (rawData) => {
        setdataPoint(rawData);
    }

    let closeModal = () => {
        handleClose()
    }
    return (
        <div>
            <Box sx={style}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} marginBlock={'2%'}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Data Point {data.id}
                    </Typography>
                    <Button onClick={closeModal}></Button>
                </Box>
                <Box
                    component="form"
                    noValidate
                    name='schemaForm'
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    display={'flex'}
                    flexDirection={'column'}
                    height={"100%"}
                >
                    <Box sx={{
                        maxHeight: "80%",
                        overflowY: "scroll",
                    }}
                        marginBottom={'1%'}>
                        {Object.keys(dataPoint).map((key) => {

                            return (
                                <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2%', marginBottom: '1%', alignItems: 'center', paddingInline: '8%' }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {key} :
                                    </Typography>
                                    <TextField
                                        id="outlined-basic" name={key}
                                        label={key} variant="outlined"
                                        style={{ width: '50%' }}
                                        defaultValue={dataPoint[key]} />
                                </Box>
                            )
                        })}

                    </Box>
                    <Button type='submit'>
                        <Typography variant="h6" gutterBottom>
                            Submit
                        </Typography>
                    </Button>
                </Box>

            </Box>
        </div>
    );
}


export default DatapointModal;
