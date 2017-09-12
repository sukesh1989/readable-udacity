import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import add from '../icons/add.svg';
import { Link } from 'react-router-dom'

import {withRouter} from 'react-router'
class Header extends Component {

    render() {
        return (
       <div className="App-header">
       <Link className="close-search" to="/">
         <img src={logo} className="App-logo"  alt="logo" />
         </Link>
         <Link className="home-button" to="/">
         Home
         </Link>
         <Link className="close-search" to="/addpost">
         <img src={add} className="Add-icon" alt="logo" />
         </Link>
       </div>
        )
    }
}


export default withRouter(Header);