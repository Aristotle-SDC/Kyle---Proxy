import React, { Component } from "react";
import style from "./styles/styles.js";

const styles = style.parentComment;
class ParentComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      replyButton: styles.invisibleReplyButton
    };
  }

  mouseOver() {
    this.setState({ replyButton: styles.visibleReplyButton });
  }

  mouseOut() {
    this.setState({ replyButton: styles.invisibleReplyButton });
  }
  render() {
    return (
      <div
        style={styles.parentComment}
        onMouseOver={() => this.mouseOver()}
        onMouseOut={() => this.mouseOut()}
      >
        {this.props.children}
        <span style={this.state.replyButton}>Reply</span>
      </div>
    );
  }
}

export default ParentComment;
