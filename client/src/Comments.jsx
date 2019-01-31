import React, { Component } from "react";
import Comment from "./Comment.jsx";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }

  render() {
    return (
      <div class="commentItem">
        {this.props.comments.length > 0
          ? this.props.comments.map((comment, i) => {
              return (
                <Comment
                  comment={comment}
                  ref="comment"
                  key={i}
                  remove={this.props.remove}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default Comments;
