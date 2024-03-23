import { Button, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import './App.css';
import Segment from './Components/Segment';


function App() { 
  const [open,setOpen] =React.useState(false)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#189AB4',
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Button onClick={() => setOpen(true)} variant='outlined' sx={{marginTop: '20px'}}>Save Segment</Button>
      <Segment open={open} handleClose={() =>setOpen(false)}/>
    </div>
    </ThemeProvider>
  );
}

export default App;
