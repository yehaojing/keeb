import { Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import commentService from "../../services/comments";
import StyledButton from "../StyledButton";

const CommentForm = ({ postId }) => {
  const [form, setForm] = useState({ content: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await commentService.postNewComment(postId, form);
    setForm({ content: "" });
    navigate(0);
  };

  return (
    <>
      <Container style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <TextField
          autoFocus
          margin="dense"
          label="Comment"
          multiline
          rows={5}
          fullWidth
          variant="filled"
          onChange={(event) => {
            setForm({ ...form, content: event.target.value });
          }}
        />
        <StyledButton style={{ marginLeft: "auto" }} onClick={handleSubmit}>Create Comment</StyledButton>
      </Container>
    </>
  );
};

export default CommentForm;
