import React, { Component } from 'react';
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
  ModalHeader,
  ModalBody,
  Label,
  Row
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    if (dish != null) {
            return (
                <Card >
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else
            return (
                <div></div>
            );
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

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    render(){
        return(
            <React.Fragment>
              <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                    <div class="container">
                      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                          <Row className="form-group">
                              <Label htmlFor="rating" className="col-12">Rating</Label>
                              <Control.select model=".rating" name="rating"
                                  className="form-control col-12">
                                  <option >1</option>
                                  <option >2</option>
                                  <option >3</option>
                                  <option >4</option>
                                  <option >5</option>
                              </Control.select>
                              
                          </Row>
                          <Row className="form-group">
                              <Label htmlFor="author" className="col-12" >Your Name</Label>
                              <Control.text model=".author" id="author" name="author"
                                  placeholder="Your Name"
                                  className="form-control col-12"
                                  validators={{
                                      minLength: minLength(3), maxLength: maxLength(15)
                                  }}
                              />
                                  
                              <Errors
                                  className="text-danger"
                                  model=".name"
                                  show="touched"
                                  messages={{
                                      minLength: 'Must be greater than 2 characters',
                                      maxLength: 'Must be 15 characters or less'
                                  }}
                              />
                          </Row>
                          <Row className="form-group">
                              <Label htmlFor="comment" className="col-12">Comment</Label>
                              
                                  <Control.textarea model=".comment" id="message" name="message"
                                      rows="6"
                                      className="form-control col-12" />
                              
                          </Row>
                          <Row className="form-group">
                                  <Button type="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                          </Row>
                      </LocalForm>
                      </div>
                  </ModalBody>
              </Modal>
            </React.Fragment>
        );
    }
}
const DishDetail = (props) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
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
                    <CommentFormModal />
                </div>
            </div>
        </div>
    );
}


export default DishDetail;