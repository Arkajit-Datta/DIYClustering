import React, {useEffect, useState} from 'react';
import Style from './BaseLayout.module.scss'
import Navbar from "./Navbar";
import {Route, Routes} from "react-router-dom";
import {Box, Grid} from "@mui/material";
import Data from './data/Data';
import Schema from './schema/Schema';
import Cluster from './cluster/Cluster';
import ClusterView from './cluster/ClusterView';

export default function BaseLayout() {
   let [darkMode, setDarkMode] = useState(false);

   function handleToggleDarkMode() {
      let oppositeOfCurrentDarkMode = !darkMode
      console.log(oppositeOfCurrentDarkMode)
      localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`)
      setDarkMode(oppositeOfCurrentDarkMode)
   }

   useEffect(() => {
      let detectedDarkMode = eval(localStorage.getItem('darkMode'));

      if (detectedDarkMode) {
         setDarkMode(detectedDarkMode)
      } else {
         localStorage.setItem('darkMode', 'false')
      }
   }, [])

   return (
      <Box className={darkMode ? Style.dark : Style.light}>
         <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'}
               justifyContent={'space-between'}>
            <Grid item>
               <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode}/>
            </Grid>
            <Grid item flexGrow={1}>
               <Routes>
                  <Route exact path={'/'} element={<Schema darkMode={darkMode}/>}/>
                  <Route exact path={'/about'} element={<Data darkMode={darkMode}/>}/>
                  <Route exact path={'/cluster'} element={<Cluster darkMode={darkMode}/>}/>
                  <Route exact path={'/cluster/:id'} element={<ClusterView darkMode={darkMode}/>}/>
               </Routes>
            </Grid>
         </Grid>
      </Box>
   )
}

