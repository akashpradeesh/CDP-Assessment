import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { AppBar, Button, IconButton, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';


export default function Segment({ open, handleClose }) {
    const [segmentName, setSegmentName] = React.useState('')
    const [schema, setSchema] = React.useState([])
    const [schemaOptions, setSchemaOptions] = React.useState([
        { label: 'First Name', value: { 'first_name': 'First Name' } },
        { label: 'Last Name', value: { 'last_name': 'Last Name' } },
        { label: 'Gender', value: { 'gender': 'Gender' } },
        { label: 'Age', value: { 'age': 'Age' } },
        { label: 'Account Name', value: { 'account_name': 'Account Name' } },
        { label: 'City', value: { 'city': 'City' } },
        { label: 'State', value: { 'state': 'State' } }])

    const handleAddSchema = () => { //Adds a new empty schema
        let prevSchema = schema
        prevSchema.push({ label: '', value: '' })
        setSchema([...prevSchema])
    }
    const handleSubmit = () => {  //to submit the final segment form
        let postData = { segment_name: segmentName, schema: schema }
        postData.schema = schema
        axios.post('https://webhook.site/8ea38d80-43f6-4e23-bc25-774a63b609aa', postData).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleRemoveSchema = (index) => { //Removes a schema
        let currentSchema = schema
        currentSchema.splice(index, 1)
        setSchema([...currentSchema])
    }
    const handleChangeSchema = (selectedValue, index) => { //changes the schema when option is changed 
        console.log(selectedValue)
        let prevSchema = [...schema]
        prevSchema[index] = selectedValue
        setSchema(prevSchema)
    }
    const checkNotEmpty = () => { //Check whether the schemas has a valid values selected in it
        let findAny = schema.findIndex(sch => sch.label === '' || sch.value === '')
        console.log(findAny)
        return findAny >= 0
    }
    const handleChangeSegmentName = (event) => {
        setSegmentName(event.target.value)
    }
    console.log(schema)
    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={handleClose}
        >
            <Box>
                <AppBar position="static" sx={{ padding: '20px' }}>
                    <Typography variant='h6'>Saving Segment</Typography>
                </AppBar>
            </Box>
            <Box
                sx={{ width: 500, padding: '5px 15px 0px', overflowY: 'auto', height: '75%' }}
                role="presentation"
            >
                <Typography >Enter the name of the Segment
                    <TextField placeholder='Name of the segment' variant='outlined' onChange={handleChangeSegmentName} fullWidth sx={{ marginTop: '5px' }} />
                </Typography>
                <Typography>
                    To save your segmment, you need to add the schemas to build the query
                </Typography>
                {schema.map((sch, index) => (
                    <div style={{ display: 'flex', gap: '5px', padding: 2 }}>
                        <div style={{ backgroundColor: sch.label !== '' ? "#90EE90" : "#FF7F7F", borderRadius: '50%', width: '10px', height: '10px', marginTop: '20px' }}></div>
                        <Select
                            fullWidth
                            key={index}
                            value={sch}
                            sx={{ marginTop: '5px' }}
                            onChange={(e) => handleChangeSchema(e.target.value, index)}>
                            {schemaOptions
                                .filter(option => !schema.find(s => s === option.value && sch !== s))
                                .map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                        </Select>
                        <IconButton onClick={() => handleRemoveSchema(index)}>
                            <RemoveIcon />
                        </IconButton>
                    </div>
                ))}
                {<Link color='#75E6DA' style={{ cursor: 'pointer' }} onClick={handleAddSchema}>+Add new schema</Link>}
            </Box>
            <Paper sx={{ width: 530, position: 'absolute', bottom: 0, right: 0 }} elevation={1}>
                <div style={{ padding: '5px', width: 'auto', left: 0, display: 'flex', gap: 15 }}>
                    <Button variant='contained'
                        sx={{ float: 'left' }}
                        disabled={schema.length === 0 || checkNotEmpty() || segmentName === ''}
                        onClick={handleSubmit}
                    >
                        Save the segment
                    </Button>
                    <Button variant='outlined' color='error' sx={{ float: 'left' }}>Cancel</Button>
                </div>
            </Paper>
        </Drawer >)
}