import React,{Component} from 'react';
import axios from "axios";
import Card from './Card';
import '../Style/Block.css'
import API from '../API';
export default class Block extends Component{
	constructor(props){
		super(props);
		this.state = {
			movies:[]
		}
	}
	componentDidMount(){
		this.pullData(this.props.endpoint);
	}
	pullData = (endpoint)=>{
		let url = `${API.movie_base + endpoint  + API.api}`;
		axios.get(url).then((res)=>this.setState({movies:res.data.results}));
	}
	render(){
		const movieList = this.state.movies.map((item,index)=>{
			return (
				<Card link={`/movie/${item.id}`} image={'https://image.tmdb.org/t/p/w370_and_h556_bestv2/'+ item.poster_path} key={index}/>
			)
		});
		return (
			<div className="block-wrapper">
				{(this.state.movies.length>0) && <div>
					<h3>{this.props.title}</h3>
					<div className="block-movie-wrapper">
						{movieList}
					</div></div>
					}
			</div>
		)
	}
}