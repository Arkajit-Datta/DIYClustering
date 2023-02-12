import { Box, Grid, Grow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, useParams } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";
import Loader from '../loader/Loader';
import { baseURL, dataPointsSchema1 } from '../../store/data';
import axios from 'axios';
import DatapointIcon from '../data/DatapointIcon';



function ClusterView({darkMode}) {

    let { id } = useParams();

    let [loading, setLoading] = useState(true);
    const [dataPoints, setdataPoints] = useState(dataPointsSchema1);
    const [paths, setpaths] = useState([]);

    useEffect(() => {
        let orignalPath=id.split(',');
        let queryName = "/"+orignalPath[orignalPath.length - 1]+"/"+orignalPath[orignalPath.length - 2]
        orignalPath.pop();
        setpaths(orignalPath);
        //Fetch for Cluster with id
        setLoading(true);
        axios.get(baseURL+queryName).then((response) => {
            setdataPoints(response.data.data);
         }).finally(()=>{
            setLoading(false)
         });
    },[]);

    const timer = setTimeout(() => {
        setLoading(false)
    }, 1000);
    console.log(id)
    return (
        <Box
            sx={{ height: 180, padding: 5 }}
        >
            {loading && <Loader />}
            {!loading &&
                <Box>
                    <Typography id="modal-modal-title" variant="h5" component="h1"
                        style={{ display: "flex", marginBottom: "2%" }}>
                        List Of Data Points for &nbsp;
                        <Typography id="modal-modal-title" variant="h5" component="h1" style={{color:"rgb(0, 196, 144)"}}>
                            '{paths.map((v, i) => {
                                return i > 0 ? "+" + v : v;
                            })}'&nbsp;
                        </Typography> Cluster
                    </Typography>

                    <Grid container spacing={2}>
                        {dataPoints.map((dataPoint, index) => {
                            return (
                                <Grow in={true} {...({ timeout: index * 500 })} key={index}>
                                    <Grid item xs={2} >
                                        <DatapointIcon data={dataPoint} darkMode={darkMode}/>
                                    </Grid>
                                </Grow>)
                        })}
                    </Grid>
                </Box>}
        </Box>
    );
}


export default ClusterView;
