import React, { Component } from "react";
import axios from "axios";
class InputComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  handleChange(e) {
    this.setState({ commentText: e.target.value });
  }

  //   retrieveNewComment(commentId) {
  //     axios
  //       .get("/api/singleComment", {
  //         params: {
  //           commentId: commentId.toString()
  //         }
  //       })
  //       .then(res => this.props.addNewComment(res.data));
  //   }

  postComment() {
    // console.log(this.state);
    axios
      .post("/api/comments/:id", {
        songId: this.props.songId,
        // genre: this.props.comment.genre,
        textContent: this.state.commentText,

        dateCreated: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        user: "DefaultUser"
      })
      .then(res => {
        console.log("POST", res.data);
        this.props.handleNewComment(res.data);
        this.setState({ commentText: "" });
      })
      .catch(err => {
        console.log("client side error: ", err);
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="Write a comment"
          value={this.state.commentText}
        />
        <button onClick={() => this.postComment()}>Post</button>
      </div>
    );
  }
}

export default InputComment;
