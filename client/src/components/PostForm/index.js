import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postService from "../../services/posts";
import StyledButton from "../StyledButton";

const NewPostModal = ({ login }) => {
  const navigate = useNavigate();
  const [openState, setOpenState] = useState(false);
  const [form, setForm] = useState({});

  const handleOpen = () => {
    setOpenState(true);
  };

  const handleClose = () => {
    setOpenState(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await postService.postNewPost(form);
    console.log(resp);
    setForm({});
    handleClose();
    navigate(`/social/${resp.id}`);
  };

  return (
    <>
      {login.access_token && (
        <StyledButton variant="contained" onClick={handleOpen}>
          New Post
        </StyledButton>
      )}
      <Dialog open={openState} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill out the details!
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setForm({ ...form, title: event.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Content"
              multiline
              rows={10}
              fullWidth
              variant="standard"
              onChange={(event) => {
                setForm({ ...form, content: event.target.value });
              }}
            />
            <DialogActions>
              <StyledButton onClick={handleClose}>Cancel</StyledButton>
              <StyledButton variant="outlined" type="submit" autoFocus>
                Submit
              </StyledButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewPostModal;
