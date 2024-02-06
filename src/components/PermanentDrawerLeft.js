import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from "@mui/material/Toolbar"

const drawerWidth = 240;

export const PermanentDrawerLeft = ({ handleMenuClick, hidden, dataVizList }) => {
  return (
    !hidden && <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
          <Toolbar><strong>Visualizations</strong></Toolbar>
        <List>
          {dataVizList.map((viz, index) => (
            <ListItem key={viz["key"]} disablePadding onClick={() => {handleMenuClick(viz)}}>
              <ListItemButton>
                <ListItemText primary={viz["title"]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}