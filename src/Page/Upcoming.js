import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import Card2 from './../Component/Card2';
import './../Style/Upcoming.css';
import API from './../API';

export default class UpcomingMovies extends Component{
	constructor(props){
		super(props);
		this.state = {
			items:[],
			total_pages:'',
			has_more:false,
			page:1,
			sort:''
		}
		
	}
	componentDidMount(){
		this.loadUpcomingMovies()
	}
	loadUpcomingMovies = ()=>{
		let url = `${API.upcoming + this.state.page}`
		axios.get(url)
		.then(res=>{
			this.setState({
				items:this.state.items.concat(res.data.results),
				total_pages:res.data.total_pages,
				page:this.state.page+1,
				has_more: (res.data.total_pages !== res.data.page)
			});
		})
	}
	sortBy = (by)=>{
		let items = this.state.items;
		if(by===2){
			items.sort((a,b) => {
				if(a.title < b.title) return -1;
			    if(a.title > b.title) return 1;
			    return 0;
			})
			this.setState({
				sort:2,
				items:items
			});
		} else {
			items.sort((a,b) => {
				if(a.release_date < b.release_date) return -1;
			    if(a.release_date > b.release_date) return 1;
			    return 0;
			})
			this.setState({
				sort:1,
				items:items
			});
		}
	}
	render(){
		const movieCard = this.state.items.map((item,index)=>{
			return(
				<div className="col-md-3" key={index}>
					<Card2 styling={{backgroundImage: `url(https://image.tmdb.org/t/p/w370_and_h556_bestv2/${item.poster_path})`,backgroundPosition:"center"}} release_date={item.release_date} rating={item.vote_average} link={`/movie/${item.id}`} />
				</div>
			)
		});	
		return(
			<div>
				{(this.state.items.length>0)&&<div className="container page-upcoming">
					<div className="row">
						<div className="col-md-12 page-title-wrapper">
							<h1 className="page-title"> Upcoming Movies </h1>
							<hr/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 filter-option">
							<ul className="list-inline">
								<li>Sort By</li>
								<li onClick={()=>this.sortBy(1)} className={(this.state.sort == 1)?'active':''}>Year</li>
								<li onClick={()=>this.sortBy(2)} className={(this.state.sort == 2)?'active':''}>A-Z</li>
							</ul>
						</div>
					</div>
					<div className="row">
					  	<InfiniteScroll
					        pageStart={this.state.page}
					        loadMore={this.loadUpcomingMovies}
					        hasMore={this.state.has_more}
					        loader={<div className="loader" key={0}>Loading ...</div>}
					    >
					        {movieCard}
					    </InfiniteScroll>					
					</div>
				</div>}
			</div>
		)
	}
}