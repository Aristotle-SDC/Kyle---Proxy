import React, { Component } from "react";
import moment from "moment";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler() {
    // console.log("deleteId", typeof this.props.comment.id);
    this.props.remove(this.props.comment.id);
  }
  render() {
    // console.log(typeof this.props.comment.id);
    return (
      <div class="commentFlex">
        <a class="commentItem__avatar" href="">
          <div class="image " style={this.props.comment.avatar} />
        </a>
        <div class="commentList">
          <div class="userInfo">
            <span class="userName infoBox textHover">
              {this.props.comment.username}
            </span>
            <span id="at"> at </span>
            <span class="timeStamp infoBox textHover">
              {moment(this.props.dateCreated).format("hh:mm:a")}
            </span>
            <span class="timeSince infoBox">
              {moment(this.props.dateCreated).fromNow()}
            </span>
          </div>
          <div class="commentItem__body">
            <div>
              <p>{this.props.comment.textContent}</p>
            </div>
          </div>
          <div class="commentItem__controls">
            <div class="buttonContainer">
              <a
                href="#"
                class="icon-trash button-reply"
                title="Delete"
                onClick={this.deleteHandler}
              />
              <a href="#" class="icon-pencil button-reply" title="Edit Post" />
              <a href="#" class="icon-reply button-reply" title="Reply" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
