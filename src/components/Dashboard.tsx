import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tablilla from './table';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const fetchIncidences = async (token : String) => {
    try {
      const response = await fetch('http://192.168.1.134:5009/api/incidencias', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch incidences:', error);
      return [];
    }
  };
  

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);
  const [incidences, setIncidences] = useState([]); // State to store the incidences
  

  useEffect(() => {
    if (value === 0) { // If the first tab is selected
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (token) {
        fetchIncidences(token).then(data => {
          setIncidences(data);
        });
      }
    }
  }, [value]); // This effect runs when `value` changes

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = async (ids: string[]) => {
    const token = localStorage.getItem('token');
    for (let index = 0; index < ids.length; index++) {
      if(token){
     deleteIncidence(token,ids[index]);}
    }
   
    window.location.reload();
  };

  const deleteIncidence = async (token: string , incidenceId: string) => {
    try {
      const url = `http://192.168.1.134:5009/api/incidencias/${incidenceId}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
     
      
    
    } catch (error) {
      console.error('Failed to delete incidence:', error);
      throw error; 
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ver incidencias" {...a11yProps(0)} />
          <Tab label="Añadir Incidencias" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tablilla rows={incidences} onDelete={handleDelete}></Tablilla>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}