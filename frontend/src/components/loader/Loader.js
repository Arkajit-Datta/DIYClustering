import { Box } from '@mui/material';
import RotateLoader from "react-spinners/RotateLoader";



function Loader() {
    return (
        <Box
            style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                marginTop:'18%'
            }}
        >
            <RotateLoader color="#36d7b7"  />
        </Box>
    );
}


export default Loader;
