import React, { Component } from "react";
import style from "./styles/styles.js";

const styles = style.parentComment;
class ParentComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      replyButton: styles.invisibleReplyButton,
      deleteButton: styles.invisibleDeleteButton
    };
  }

  mouseOver() {
    this.setState({
      replyButton: styles.visibleReplyButton,
      deleteButton: styles.visibleDeletButton
    });
  }

  mouseOut() {
    this.setState({
      replyButton: styles.invisibleReplyButton,
      deleteButton: styles.invisibleDeleteButton
    });
  }
  render() {
    console.log(this.props.children);
    return (
      <div
        style={styles.parentComment}
        onMouseOver={() => this.mouseOver()}
        onMouseOut={() => this.mouseOut()}
      >
        {this.props.children}
        <span style={this.state.deleteButton}>Delete</span>
        <span style={this.state.replyButton}>Reply</span>
      </div>
    );
  }
}

export default ParentComment;
