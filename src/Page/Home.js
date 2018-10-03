import React, {Component} from 'react';
import axios from 'axios';
import Block from './../Component/Block';
import './../Style/Home.css';
import Card from './../Component/Card';
import API from './../API';
export default class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			query:'',
			query_result:[],
			isSearching:false
		}
	}
	updateQuery = () =>{
		if(!this.search.value){
			this.setState({
				isSearching:false
			})
		} else {
			this.setState({
				query:this.search.value,
				isSearching:true
			},() => {
		      if (this.state.query && this.state.query.length > 1) {
		        if (this.state.query.length % 2 === 0) {
		          this.searchQuery()
		        }
		      } 
			})
		}
	}
	searchQuery = (query)=>{
		let url=`${API.search + this.state.query}`;
		axios.get(url).then((res)=>this.setState({query_result:res.data.results}));
	}
	render(){
		const movieList = this.state.query_result.map((item,index)=>{
			return (
				<Card link={`/movie/${item.id}`} image={'https://image.tmdb.org/t/p/w370_and_h556_bestv2/'+ item.poster_path} key={index}/>
			)
		});
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-12 page-home">
						<div className="searchMovie">
							<form id="serachform">
								<fieldset>
									<input type="text" placeholder="Search for a movie" ref={input=>this.search=input} onChange={this.updateQuery}/>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				{!this.state.isSearching && <div className="row">
					<div className="col-md-12 ">
						<Block title="Trending now" endpoint="popular"/>
						<Block title="Top rated" endpoint="top_rated"/>
						<Block title="Now Playing" endpoint="now_playing"/>
					</div>
				</div>}
				{this.state.isSearching && <div className="row">
					<div className="col-md-12 search-list">
						{movieList}
					</div>
				</div>}
			</div>
		)
	}
}