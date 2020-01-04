import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
    return (
        <nav>
            <Link to="/addEntry">Add Entry</Link>
            <Link to="/manageGenres">Manage Genres</Link>
        </nav>
    )
}