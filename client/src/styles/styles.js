let index = {
  app: {
    paddingTop: 40,
    textAlign: "center",
    border: "1px solid rgba(121, 124, 127, .2)",
    borderRadius: "5px",
    marginLeft: "15px",
    maxWidth: "55%",
    minWidth: "40%"
  },
  parentComment: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    minHeight: "40px",
    padding: "6px",
    color: "#797c7f",
    marginBottom: "6px"
  },
  dateSpan: {
    display: "flex",
    flexDirection: "row",
    justifySelf: "flex-end",
    alignSelf: "flex-end",
    fontSize: "14px"
  },
  userSpan: {
    alignSelf: "flex-start",
    justifySelf: "flex-start",
    fontSize: "14px"
  },
  userDateDiv: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  textContentSpan: {
    color: "black",
    fontSize: "16px",
    display: "flex",
    alignContent: "flex-start",
    paddingLeft: "4px"
  }
};

let parentComment = {
  parentComment: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    minHeight: "40px",
    padding: "6px",
    color: "#797c7f",
    marginBottom: "6px"
  },
  dateSpan: {
    display: "flex",
    flexDirection: "row",
    justifySelf: "flex-end",
    alignSelf: "flex-end"
  },
  userSpan: {
    alignSelf: "flex-start",
    justifySelf: "flex-start"
  },
  userDateDiv: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  textContentSpan: {
    color: "black",
    fontSize: "16px",
    display: "flex",
    alignContent: "flex-start",
    paddingLeft: "4px"
  },
  visibleReplyButton: {
    cursor: "pointer",
    justifySelf: "flex-end",
    alignSelf: "flex-end",
    position: "relative",
    bottom: "10px"
  },
  visibleDeleteButton: {
    cursor: "pointer",
    width: "50px",
    marginLeft: "10px",
    justifySelf: "flex-start",
    alignSelf: "flex-start",
    position: "left",
    bottom: "10px"
  },
  invisibleReplyButton: {
    marginRight: "10px",
    justifySelf: "flex-end",
    alignSelf: "flex-end",
    position: "relative",
    bottom: "0px",
    color: "white"
  },
  invisibleDeleteButton: {
    cursor: "pointer",
    idth: "50px",
    marginLeft: "10px",
    justifySelf: "flex-start",
    alignSelf: "flex-start",
    position: "left",
    bottom: "0px",
    color: "white"
  }
};

module.exports = { index, parentComment };
