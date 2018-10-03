import React,{Component} from 'react';
import { Link } from "react-router-dom";
import '../Style/Card2.css';
export default class Card2 extends Component{
	render(){
		return(
			<article className="card2" style={this.props.styling} >
				<Link to={this.props.link}/>
				<div className="movie-information">
					<ul className="list-inline">
						<li><p>Rating</p><p><i className="fa fa-star"></i> {this.props.rating}</p></li>
						<li><p>Release date</p><p>{this.props.release_date}</p></li>
					</ul>
				</div>		
			</article>
		)
	}
}