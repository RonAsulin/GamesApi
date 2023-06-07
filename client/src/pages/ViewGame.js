import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ViewGame() {
  const location = useLocation();
  const { gameName, gamePrice, genreName, gameDescription, gameImage, _id } = location.state;
  const baseURL = "http://localhost:3001/api";
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    // Fetch existing comments or set initial comments here
    // For example:
    axios
      .get(baseURL + "/comments", { params: { gameId: _id } })
      .then((response) => {
        setAllComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [_id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      // Save new comment to the backend
      // For example:
      axios
        .post(baseURL + "/createComment", {
          gameId: _id,
          content: newComment,
          author: "John Doe",
        })
        .then((response) => {
          setAllComments([...allComments, response.data]);
          setNewComment("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Row>
        <Col sm={12} md={6}>
          <div style={{ color: "#ffff", marginTop: "50%", display: "grid", gap: "10px" }}>
            <h1 style={{ fontSize: "32px" }}>Game Details</h1>
            <table>
              <tbody>
                <tr>
                  <td style={{ fontSize: "24px" }}>Game Name:</td>
                  <td style={{ fontSize: "24px" }}>{gameName}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "24px" }}>Price:</td>
                  <td style={{ fontSize: "24px" }}>${gamePrice}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "24px" }}>Genre:</td>
                  <td style={{ fontSize: "24px" }}>{genreName}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "24px" }}>Description:</td>
                  <td style={{ fontSize: "24px" }}>{gameDescription}</td>
                </tr>
              </tbody>
            </table>

            <div>
              <h2>Comments</h2>
              {allComments.length > 0 ? (
                allComments.map((comment, index) => (
                  <div key={index}>
                    <p>{comment.content}</p>
                    <p>Author: {comment.author}</p>
                    <p>Date: {comment.date}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
              <Form.Group controlId="commentForm">
                <Form.Label>Add a comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={handleCommentChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddComment}>
                Add Comment
              </Button>
            </div>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div style={{ marginTop: "50%" }}>
            <img src={gameImage} alt="Game Image" className="img-fluid" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
