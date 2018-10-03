import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../Style/Header.css';
class Header extends Component{
	render(){
		return(
			<header id="header">
	            <nav>
	              <ul className="list-inline">
	                <li className="logo">
	                  <Link to="/"> Moview </Link>
	                </li>
	                <li>
	                  <ul className="list-inline text-right">
	                    <li>
	                      <Link to="/upcoming-movies">Upcoming movies</Link>
	                    </li>
	                  </ul>
	                </li>
	              </ul>
	            </nav>
          </header> 
		)
	}
}

export default Header;