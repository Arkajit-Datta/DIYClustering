import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Grow, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { info } from "../../info/Info";
import DatapointIcon from './DatapointIcon';
import Loader from '../loader/Loader';
import { baseURL, dataPointsSchema1, schemas } from '../../store/data';
import DatapointModal from './DatapointModal';
import Style from './About.module.scss'

export default function Data({ darkMode }) {

    const [loading, setLoading] = useState(false);
    const [dataPoints, setdataPoints] = useState([]);
    const [schema, setschema] = useState('');
    const [open, setOpen] = React.useState(false);
    const [schemas, setschemas] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        console.log("Calling for all Schemas");
        setLoading(true);

        axios.get(baseURL + "/allEvent/").then((response) => {
            setschemas(response.data.data);
            setLoading(false)
        });
    }, []);


    useEffect(() => {
        console.log("Calling daatpoints for schema", schema);
        if (schema != '') {
            setLoading(true)

            axios.get(baseURL + "/getAllDataPoints/" + schema).then((response) => {
                setdataPoints(response.data.data);
            }).finally(()=>{
                setLoading(false)
            });
        }
    }, [schema]);



    const handleSchemaChange = (e) => {
        setschema(e.target.value);
    }

    console.log(schema)

    return (
        <Box
            sx={{ height: 180, padding: 5 }}
        >
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: "2%"
            }}>
                <TextField
                    id="outlined-basic"
                    select
                    style={{ width: '40%' }}
                    label="Select"
                    onChange={handleSchemaChange}
                    focused
                    color='warning'
                    disabled={loading}
                >
                    {schemas.map((option, i) => (
                        <MenuItem
                            key={i} value={option.name}>
                            <Typography style={{ color: darkMode ? 'rgb(0, 196, 144)' : 'black' }}>{option.name}</Typography>
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            {loading && <Loader />}
            {!loading &&
                <Box>

                    <Grid container spacing={2}>
                        {dataPoints.map((dataPoint, index) => {
                            return (
                                <Grow in={true} {...({ timeout: index * 500 })} key={index}>
                                    <Grid item xs={2} >
                                        <DatapointIcon data={dataPoint} darkMode={darkMode} />
                                    </Grid>
                                </Grow>)
                        })}
                        {schema != '' && <Box style={{ height: '100%', margin: '55px' }} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                            <Button onClick={handleOpen} >
                                <Typography variant="h6" gutterBottom>
                                    Add Point
                                </Typography>
                                {/* <AddCircleOutlineIcon /> */}
                            </Button>
                        </Box>}
                    </Grid>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <DatapointModal handleClose={handleClose} data={{
                            id: dataPoints.length + 1,
                            schemaName: schema,
                            parameters: {}
                        }} darkMode={darkMode} />
                    </Modal>
                </Box>}
        </Box>
    );
}