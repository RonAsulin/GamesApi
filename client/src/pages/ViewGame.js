import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function ViewGame() {
  const location = useLocation();
  const { gameName, gamePrice, genreName, gameDescription, gameImage, gameId } = location.state;
  const baseURL = "http://localhost:3001/api";
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const fetchComments = () => {
    axios.get(baseURL + '/account/comments', { params: { gameId: gameId } })
      .then((response) => {
        setAllComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      axios
        .post(baseURL + "/account/createComment", {
          gameId: gameId,
          content: newComment,
          author: "John Doe",
        })
        .then((response) => {
          const newCommentData = response.data.data;
          setAllComments([...allComments, newCommentData]);
          setNewComment("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Header />
      <div style={{ background: "#C6ECAE", minHeight: "100vh" }}>
        <Container style={{ paddingTop: "50px" }}>
          <Row>
            <Col md={6}>
              <Card className="p-4 mb-4" style={{ background: "#94C9A9", color: "#fff" }}>
                <h1 className="text-center mb-5">Game Details</h1>
                <div className="mb-4">
                  <h5 className="font-weight-bold">Game Name:</h5>
                  <p>{gameName}</p>
                </div>
                <div className="mb-4">
                  <h5 className="font-weight-bold">Price:</h5>
                  <p>${gamePrice}</p>
                </div>
                <div className="mb-4">
                  <h5 className="font-weight-bold">Genre:</h5>
                  <p>{genreName}</p>
                </div>
                <div className="mb-4">
                  <h5 className="font-weight-bold">Description:</h5>
                  <p style={{ maxHeight: "150px", overflowY: "auto" }}>{gameDescription}</p>
                </div>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="p-4" style={{ background: "#885053", color: "#fff",marginBottom:10 }}>
                <div className="text-center">
                  <img src={gameImage} alt="Game Image" className="img-fluid" style={{ width: "100%", maxHeight: "400px" }} />
                </div>
              </Card>
              <Card className="p-4" style={{ background: "#777DA7", color: "#fff"}}>
                <h2 className="mb-4">Comments</h2>
                {allComments.length > 0 ? (
                  allComments.map((comment, index) => (
                    <div key={index} className="mb-4">
                      <h5 className="font-weight-bold">Comment:</h5>
                      <p>{comment.content}</p>
                      <h5 className="font-weight-bold">Author:</h5>
                      <p>{comment.author}</p>
                      <h5 className="font-weight-bold">Date:</h5>
                      <p>{comment.date}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
                <Form.Group controlId="commentForm">
                  <Form.Label>Add a comment</Form.Label>
                  <Form.Control as="textarea" rows={3} value={newComment} onChange={handleCommentChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
