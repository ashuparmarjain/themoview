import React, {Component} from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import Modal from './../Component/Modal';
import YouTube from 'react-youtube';
import Card from './../Component/Card';
import './../Style/Movie.css';
import API from './../API';

export default class Movie extends Component{
	constructor(props){
		super(props)
		this.state = {
			movieId: this.props.match.params.id,
			movie: '',
			loaded:false,
			similarMovies:[],
			videoId:'',
			show:false,
			rateShow:false,
			rating:0,
			rated:false,
			submitting:false
		}
		this.showModal.bind(this);
	}
	componentDidMount(){
		this.cacheData(this.state.movieId);
	}
	cacheData = (movieId) => {
		let movieDB = JSON.parse(localStorage.getItem('movieDB')) || [];
		let movieData = movieDB.filter(obj=>obj.id == movieId);
		if(movieData.length){
			this.setState({
				movie:movieData[0],
				loaded:true
			});
		} else {
			let url = `${API.movie_base + movieId +  API.api}`;
			axios.get(url).then(res=>{
				this.setState({
					movie:res.data,
					loaded:true
				});
				movieDB.push(this.state.movie);
				localStorage.setItem('movieDB',JSON.stringify(movieDB));
			});
		}
		this.getSimilarMovies(movieId);
		this.getVideo(movieId);
	}
	showModal = (num) => {
		if(num===1){
			this.setState({ show: true });
    		this.youtube.internalPlayer.playVideo();
		} else {
			this.setState({ rateShow: true });
		}
    	
  	};
  	hideModal = (num) => {
  		if(num === 1){
  			this.setState({ show: false });
			this.youtube.internalPlayer.pauseVideo();
  		} else {
  			this.setState({ rateShow: false });
  		}
    	
  	};
	getSimilarMovies=(movieId)=>{
		let url = `${API.movie_base + movieId + '/similar' + API.api }`;
		axios.get(url).then(res=>{
			this.setState({
				similarMovies:res.data.results
			})
		})
	}
	getVideo=(movieId)=>{
		let url = `${API.movie_base + movieId + '/videos' + API.api} `;
		axios.get(url).then(res=>{
			let trailer = res.data.results.find((obj)=>obj.type==='Trailer');
			if(trailer !== undefined){
				this.setState({
					videoId:trailer.key
				})
			}
			
		})
	}
	rateMovie = (movieId)=>{
			this.setState({
				submitting:true
			})		
		axios.get(API.authentication).then((res)=>{
			
			if(res.data.guest_session_id){
				let url = `${API.movie_base + movieId + '/rating' + API.api + '&guest_session_id=' + res.data.guest_session_id}`;
				axios.post(url,{value:this.state.rating}).then(res=>{
					if(res.data.status_code === 1){
						this.setState({
							rated:true
						})
					}
				})
			}
		});
		
	}
	onStarClick(nextValue, prevValue, name) {
    	this.setState({rating: nextValue});
  	}
	render(){
		const opts = {
	      height: '390',
	      width: '640',
	      playerVars: { // https://developers.google.com/youtube/player_parameters
	        autoplay: 0,
	        controls:1,
	        showinfo:0,
	        rel:0
	      }
	    };
		 const similarMovies = this.state.similarMovies.map((item,index)=>{
			return(
				<div className="col-md-2 col-xs-6" key={index}>
					<Card link={`/movie/${item.id}`} image={'https://image.tmdb.org/t/p/w370_and_h556_bestv2/'+ item.poster_path} key={index}/>
				</div>
			)
		});	
		return(
			<div className="page-movie">
				{!this.state.loaded && <div className="page-loading">
					<p>Loading...</p>
				</div>}
				{this.state.loaded && <div>
					<div className="movie-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2/${this.state.movie.backdrop_path})`,backgroundPosition:"center"}}></div>
					<div className="container">
						<div className="row">
							<div className="col-md-12 movie-data-wrapper">
								<div className="row">
									<div className="col-md-4">
										<div className="movie-image">
											<img src={'https://image.tmdb.org/t/p/w370_and_h556_bestv2/'+ this.state.movie.poster_path} className="img img-responsive"/>
										</div>
									</div>
									<div className="col-md-8">
										<div className="movie-info">
											<h1>{this.state.movie.title} ({this.state.movie.release_date.split('-')[0]})</h1>
											<p>{this.state.movie.tagline}</p>
											<ul className="list-unstyled movie-rating">
												<li>			
													<StarRatingComponent 
											          name="rate1" 
											          editing={false}
											          starCount={10}
											          value={Math.round(this.state.movie.vote_average)}
											          renderStarIcon={() => <span><i className="fa fa-star"></i></span>}
											        />											
												</li>
												<li>
													{this.state.movie.vote_average}<span>/10
													({this.state.movie.vote_count} users)</span>
												</li>
											</ul>
											<ul className="list-inline movie-genre">
												{this.state.movie.genres.map((genre,index)=><li key={index}>{genre.name}</li>)}
											</ul>
											<p>{this.state.movie.overview}</p>
											<ul className="list-inline movie-events">
												<li onClick={()=>this.showModal(2)}>Rate this movie<span> <i className="fa fa-star"></i></span></li>
												<li onClick={()=>this.showModal(1)}>Watch Trailer<span> <i className="fa fa-play" aria-hidden="true"></i></span></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>					
					</div>
					<div style={{backgroundColor:'#000'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-12 similar-movie">
									<div className="row">
										<div className="col-md-12 page-subheading">
											<h3>More like this</h3>
										</div>
									</div>
									<div className="row">
										{similarMovies}
									</div>
								</div>
							</div>
						</div>
					</div>	
				</div>}
				<Modal show={this.state.show}>
		          <button onClick={()=>this.hideModal(1)} className="pull-right"> x </button>
		           <YouTube
				        videoId={this.state.videoId}
				        opts={opts}
				        ref ={ youtube=>this.youtube = youtube}
				      />
		        </Modal>
		        <Modal show={this.state.rateShow}>
		          <button onClick={()=>this.hideModal(2)} className="pull-right"> x </button>
		          {!this.state.rated && <div>
			          <h3> How would you rate this movie?</h3>
			           <StarRatingComponent 
				          name="rate2" 
				          starCount={10}
				          value={this.state.rating}
				          onStarClick={this.onStarClick.bind(this)}
				          renderStarIcon={() => <span><i className="fa fa-star"></i></span>}
				        />
				        <p>{this.state.rating}</p>
				        {!this.state.submitting &&<button onClick={()=>this.rateMovie(this.state.movieId)}> Submit </button>}
				        {this.state.submitting &&<button > Submiting... </button> }
			        </div>}
			        {this.state.rated &&
			        	<div>
			        		<h3>You Rated </h3>
			        		<p className="rated"><i className="fa fa-star"></i> {this.state.rating}</p>
			        	</div>
			        }
		        </Modal>
		        
			</div>
		)
	}
}