import React,{Component} from 'react';
import { Link } from "react-router-dom";
import '../Style/Card.css';
export default class Card extends Component{
	render(){
		return(
			<article className="card">
					<Link to={this.props.link}/>
					<img src={this.props.image} className="img img-responsive"/>
			</article>
		)
	}
}