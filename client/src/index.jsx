import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ParentComment from "./ParentComment.jsx";
import InputComment from "./InputComment.jsx";
import style from "./styles/styles.js";
const currentDate = new Date();
let targetID = window.location.pathname.slice(
  1,
  window.location.pathname.length - 1
);

const styles = style.index;
const defaultComment = [
  {
    songId: targetID,
    genre: null,
    textContent: "Be the first to comment on this song!",
    dateCreated: " :) ",
    user: "blank"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.handleNewComment = this.handleNewComment.bind(this);
    this.commentDiv = this.commentDiv.bind(this);
  }
  componentDidMount() {
    axios
      .get(`/api/comments/${targetID}`)
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleNewComment(newComment) {
    console.log("New comment Before Concat", newComment);
    this.setState({
      comments: this.state.comments
        .concat(newComment)
        .sort((a, b) => b.id - a.id)
    });
    console.log("State after concat", this.state.comments);
  }
  commentDiv(comments) {
    return comments.map((comment, i) => {
      let calendarDay = comment.dateCreated.substring(0, 10);
      let timeOfDay = comment.dateCreated.substring(11, 16);
      return (
        <ParentComment style={styles.parentComment} key={`comment#${i}`}>
          <div style={styles.userDateDiv}>
            <span>{comment.username}</span>
            <span style={styles.dateSpan}>{`${calendarDay} ${timeOfDay}`}</span>
          </div>
          <div style={styles.textContentSpan}>{comment.textContent}</div>
        </ParentComment>
      );
    });
  }
  render() {
    return (
      <div style={styles.app} id="app">
        <InputComment
          addNewComment={this.handleNewComment}
          songId={targetID}
          handleNewComment={this.handleNewComment}
        />
        {this.state.comments.length > 0
          ? this.commentDiv(this.state.comments)
          : this.commentDiv(defaultComment)}
      </div>
    );
  }
}

const root = document.querySelector("#Comments");
ReactDOM.render(<App />, root);

export default App;
