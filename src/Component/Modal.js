import React,{Component} from 'react';
export default class Modal extends Component{
	render(){
		return(
			<div className={this.props.show ? 'modal display-block' :'modal display-none'}>
				<section className="modal-body">
					{this.props.children}
				</section>
			</div>
		)
	}
}