import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div />;
}

function RenderComments({ comments }) {
  if (comments != null) {
    return comments.map(comment => {
      let date = new Date(comment.date).toDateString(); // converts the date (not the time) into a readable string
      return (
        <ul key={comments.id} class="list-unstyled">
          <li>
            <em>{comment.comment}</em>
          </li>
          <li>
            {" "}
            - {comment.author} {date}
          </li>
        </ul>
      );
    });
  } else return <div />;
}

const DishDetail = props => {
  if (props.dish != null)
    return (
      <div class="container">
        <div className="row">
          <div className="col-sm-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-sm-12 col-md-5 m-1">
            <h4>Comments</h4>
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  else return <div />;
};

export default DishDetail;
