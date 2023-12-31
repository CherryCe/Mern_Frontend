import React from "react";

const CommentComponent = (props) => {
  const { dataHref, width } = props;
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <div
        className="fb-comments"
        data-href={dataHref}
        data-width={width}
        data-numposts="5"
      ></div>
    </div>
  );
};

export default CommentComponent;
