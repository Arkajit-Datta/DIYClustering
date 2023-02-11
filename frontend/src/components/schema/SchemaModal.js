import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { paramTypes } from '../../store/data';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '80%',
    width: '70%',
    bgcolor: 'background.paper',
    border: '.5px solid #000',
    boxShadow: 24,
    p: 4,
};
function SchemaModal({ data, handleClose }) {

    const [schemaData, setSchemaData] = useState(data.parameters);


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let rawData = {
            type: formData.getAll("type"),
            name: formData.getAll("name"),
            defaultValue: formData.getAll("defaultValue"),
            cluster: formData.getAll("cluster"),
            schemaName: formData.get('schemaName')
        };
        updateSchema(rawData);
        if(data.name==null){
            data.name=rawData.schemaName
        }
        data.parameters=schemaData;
        console.log(data);
        //code to call for API for update
        handleClose()
    };

    let updateSchema = (rawData) => {
        setSchemaData((data) => {
            data = data.map((param, index) => {
                param.name = rawData.name[index];
                param.type = rawData.type[index];
                param.default = rawData.defaultValue[index];
                param.cluster = rawData.cluster.includes(String(param.id));
                return param
            });
            return data;
        });
    }

    let removeParameter = (name) => {
        setSchemaData((data) => {
            data = data.filter((param) => param.name != name);
            return data;
        });
    }

    console.log(schemaData)
    let addParameter = () => {
        let newData=schemaData;
        setSchemaData([...schemaData,
            {
                id: newData.length + 1,
                name: "",
                type: "text",
                default: "",
                cluster: false
            }
        ]);
        
    }

    return (
        <div>
            <Box sx={style}>

                <Box
                    component="form"
                    noValidate
                    name='schemaForm'
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                        maxHeight: "80%",
                        overflowY: "scroll",
                    }}
                >
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} marginBlock={'2%'}>
                        {data.name!=null ?
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {data.name}
                            </Typography> :
                            <TextField placeholder='Schema Name'
                                id="outlined-basic" name='schemaName'
                                label="Schema Name" variant="outlined"
                                style={{ width: '25%' }}
                            />
                        }
                    </Box>
                    {schemaData.map((parameter) => {

                        return (
                            <Box style={{ display: 'flex', justifyContent: 'space-evenly', marginBlock: '1%', alignItems: 'center' }}>
                                <TextField placeholder='Enter Name'
                                    id="outlined-basic" name='name'
                                    label="Name" variant="outlined"
                                    style={{ width: '25%' }}
                                    defaultValue={parameter.name} />
                                <TextField
                                    id="outlined-basic"
                                    select
                                    style={{ width: '25%' }}
                                    label="Select"
                                    name='type'
                                    defaultValue={parameter.type}
                                >
                                    {paramTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField id="outlined-basic" name='defaultValue' label="Default Value" variant="outlined" style={{ width: '25%' }} defaultValue={parameter.default} />
                                <FormControlLabel
                                    label="cluster"
                                    control={<Checkbox name='cluster' value={parameter.id} defaultChecked={parameter.cluster} />}
                                />
                                <RemoveCircleIcon style={{ color: "red" }} onClick={() => removeParameter(parameter.name)} />
                            </Box>

                        )
                    })}
                    <AddCircleIcon style={{ color: "black", width: "100%", marginBlock: '1%' }} onClick={addParameter} />
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


export default SchemaModal;
