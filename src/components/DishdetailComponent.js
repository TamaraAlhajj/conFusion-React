import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button, 
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

let isModalOpen = false;
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function toggleModal() {
    isModalOpen = !isModalOpen
}

function handleSubmit(values) {
  console.log('Current State is: ' + JSON.stringify(values));
  alert('Current State is: ' + JSON.stringify(values));
}

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
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
            <Button outline secondary onClick={toggleModal()}><i class="fa fa-pencil"></i> Submit Comment</Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal()}>
              <ModalHeader toggle={toggleModal()}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="rating" md={2}>Rating</Label>
                    <Input type="select" name="select" id="rating">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="firstname" md={2}>Name</Label>
                    <Col md={10}>
                        <Control.text model=".name" id="name" name="name"
                            placeholder="Your name"
                            className="form-control"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                              />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                                required: ' Required.',
                                minLength: ' Must be greater than 2 characters.',
                                maxLength: ' Must be 15 characters or less.'
                            }}
                          />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="message" md={2}>Comment</Label>
                    <Col md={10}>
                        <Control.textarea model=".message" id="message" name="message"
                            rows="12"
                            className="form-control" />
                    </Col>
                  </Row>
                  <Row className="form-group">
                      <Col md={{size:10, offset: 2}}>
                          <Button type="submit" color="primary">
                          Submit
                          </Button>
                      </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  else return <div />;
};

export default DishDetail;
