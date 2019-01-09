import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ParentComment from './ParentComment.jsx';
import InputComment from './InputComment.jsx';
const currentDate = new Date();

const styles = {
  app: {
    paddingTop: 40,
    textAlign: 'center',
    border: '1px solid rgba(121, 124, 127, .2)',
    borderRadius: '5px',
    marginLeft: '15px',
    maxWidth: '55%',
    minWidth: '40%'
  },
  parentComment: {
    display: 'flex',
    flexDirection:'column',
    borderRadius: '25px',
    minHeight: '40px',
    padding: '6px',
    color: '#797c7f',
    marginBottom: '6px'
  },
  dateSpan: {
    display: 'flex',
    flexDirection:'row',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: '14px'
  },
  userSpan: {
    alignSelf: 'flex-start',
    justifySelf: 'flex-start',
    fontSize: '14px'
  },
  userDateDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  textContentSpan: {
    color: 'black',
    fontSize: '16px',
    display: 'flex',
    alignContent: 'flex-start',
    paddingLeft: '4px'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [{dateCreated: '15',user:'shaggy',textContent:'nope'}]
    };
    this.handleNewComment = this.handleNewComment.bind(this);
  }
  componentDidMount() {
    axios.get('/api/comments')
    .then(response => {
      console.log("Array of comments: ",response.data);
      this.setState({comments: response.data.reverse()});
    })
    .catch(err => {
    console.log(err)
    })
  }

  handleNewComment(newComment) {
    this.setState({comments: this.state.comments.reverse().concat(newComment).reverse()})
  }


  render() {
    return (
      <div style={styles.app} id='app'>
        
        <InputComment addNewComment={this.handleNewComment}/>

        {this.state.comments.map((comment,i) => {
          let date = comment.dateCreated;
          let calendarDay = date.substring(0,10);
          let timeOfDay = date.substring(11,16);
          console.log(date);
          return (
            <ParentComment 
              style={styles.parentComment} 
              key={`comment#${i}`}>
              
            
              <div style={styles.userDateDiv}>
                <span>{comment.user}:</span>
                <span style={styles.dateSpan}>{`${calendarDay}: ${timeOfDay}`}</span>
                
              </div>
              


              <div style={styles.textContentSpan}>{comment.textContent}</div>
            </ParentComment>
        )
      })}
      </div>
    )
  }
}

const root = document.querySelector('#Comments')
ReactDOM.render(<App />, root)

export default App;