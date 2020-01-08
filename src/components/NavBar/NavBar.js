import React, {useState} from 'react';

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useLocation } from "react-router-dom";

/* Auto-generates unique ids & aria controls for tabs */
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

/* Includes links to addEntry and manageGenre */
export default function NavBar(){
    const location = useLocation();
    const [value, setValue] = useState(location.pathname==='/manageGenres'?1:0);

    return (
        <nav>
            <Paper>
                <Tabs
                    value={value}
                    onChange={(e, v)=>setValue(v)}
                    indicatorColor="primary"
                    centered
                >
                    <Tab label="Add Entry" href="#addEntry" value={0} {...a11yProps(0)} />
                    <Tab label="Manage Genres" href="#manageGenres" value={1} {...a11yProps(1)} />
                </Tabs>
            </Paper>
        </nav>
    )
}