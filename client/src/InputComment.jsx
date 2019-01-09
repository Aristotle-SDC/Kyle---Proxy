import React, {Component} from 'react';
import axios from 'axios';
class InputComment extends Component {
	constructor(props){
		super(props)
		this.state = {
			commentText: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.postComment = this.postComment.bind(this);
	}

	handleChange(e) {
    //console.log(e.target.value);
    this.setState({commentText: e.target.value});
}

	retrieveNewComment(commentId) {
		axios.get(
					'/api/singleComment',
					{params: {
						'commentId':commentId.toString()
					}
					}
				)
		.then(res => this.props.addNewComment(res.data))
	}


	postComment() {
		let timeOfPost = new Date().toISOString().slice(0, 19).replace('T', ' ');
		axios.post('/api/comments',{
		'textContent': this.state.commentText,
    'dateCreated': timeOfPost,
    'user': 'DefaultUser',
    'idParentComment' : 0
  })
		.then(
			res => {
				console.log(res.data);
				this.setState({commentText: ''});
				//console.log(this.props);
				// 1. retrieve comment from database
				this.retrieveNewComment(res.data);
				// add a method here to write
				// new comments into the UI 
				// based on res.data
			})
		.catch(err => {
			console.log('client side error: ',err)
		})
  }

  render() {
  	return (
  		<div>
  			<input type='text' onChange={this.handleChange} placeholder="Write a comment" value={this.state.commentText}/>
  			<button 
  			onClick={()=>this.postComment()}
  			>Post</button>
  		</div>
  	)
  }
}


export default InputComment;