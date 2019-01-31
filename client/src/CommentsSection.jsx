import React, { Component } from "react";
import Comments from "./Comments.jsx";
import axios from "axios";
import moment from "moment";
import GenerateColor from "./styles/color.js";

let targetID = window.location.pathname.slice(
  1,
  window.location.pathname.length - 1
);
class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: "",
      comments: []
    };
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addAvatar = this.addAvatar.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/comments/${targetID}`)
      .then(response => {
        this.setState({
          comments: this.addAvatar(response.data)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addAvatar(commentArray) {
    return commentArray.map(comment => {
      let modifiedComment = Object.assign({}, comment);
      modifiedComment.avatar = {
        background: GenerateColor(),
        height: "50px",
        width: "50px",
        borderRadius: "50%"
      };
      return modifiedComment;
    });
  }

  deleteComment(id) {
    this.setState({
      comments: this.state.comments.filter(el => el.id !== id)
    });
    this.removeComment(id);
  }

  handleNewComment(newComment) {
    this.setState({
      comments: this.state.comments
        .concat(this.addAvatar(newComment))
        .sort((a, b) => b.id - a.id)
    });
  }

  handleChange(e) {
    this.setState({ commentText: e.target.value });
  }

  postComment() {
    axios
      .post("/api/comments/:id", {
        songId: targetID,
        textContent: this.state.commentText,
        dateCreated: String(moment().format("LLL")),
        user: "DefaultUser"
      })
      .then(res => {
        this.handleNewComment(res.data);
        this.setState({ commentText: "" });
      })
      .catch(err => {
        console.log("client side error: ", err);
      });
  }

  removeComment(commentId) {
    // console.log("Deleting comment:", commentId);
    axios
      .post("/api/comments/remove/:id", { id: commentId, songId: targetID })
      .then(res => {
        console.log(res.status);
      })
      .catch(err => {
        console.log("Error deleting comment: ", err);
      });
  }

  render() {
    return (
      <div class="commentsSection">
        <div class="listenEngagement__commentForm">
          <div class="commentForm__avatar" />
          <div class="commentForm__wrapper">
            <div class="commentForm">
              <div class="commentForm__inputWrapper">
                <a class="commentForm__recipient" href="#" />
                <input
                  type="text"
                  title=" Write a comment"
                  placeholder="Write a comment"
                  onChange={this.handleChange}
                  value={this.state.commentText}
                  class="commentForm__input"
                />
                <input
                  type="submit"
                  value="Submit"
                  class="submitButton"
                  onClick={() => this.postComment()}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.comments.length > 0 ? (
          <Comments
            comments={this.state.comments}
            remove={this.deleteComment}
          />
        ) : (
          <div class="default">Nobody Has Commented On This Song!</div>
        )}
      </div>
    );
  }
}

export default CommentsSection;
