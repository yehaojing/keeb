import { Card, CardContent, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import imagesService from "../../services/images";
import keyboardService from "../../services/keyboard";
import { StyledFilledButton } from "../StyledButton";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const KeyboardForm = () => {
  const [modal, setModal] = useState(false);

  return (
    <StyledCard>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <StyledFilledButton onClick={() => setModal(true)}>
          Add Keyboard
        </StyledFilledButton>
      </CardContent>
      <NewKeyboardModal openState={modal} handleClose={() => setModal(false)} />
    </StyledCard>
  );
};

const NewKeyboardModal = ({ openState, handleClose }) => {
  const [images, setImages] = useState();
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  console.log(navigate);

  const handleAddImage = async (event) => {
    setImages(event.target.files[0]);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    if (images) {
      await imagesService.postImage(images);
    }
    await keyboardService.postNewKeyboard(form);
    navigate(0);
    handleClose();
  };

  return (
    <div>
      <Dialog open={openState} onClose={handleClose}>
        <DialogTitle>{"Add Keyboard"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill out the details!
          </DialogContentText>
          <form onSubmit={(e) => handlePost(e)}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setForm({ ...form, name: event.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Manufacturer"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setForm({ ...form, manufacturer: event.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Switches"
              fullWidth
              variant="standard"
              onChange={(event) =>
                setForm({ ...form, switches: event.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              label="Stabilisers"
              fullWidth
              variant="standard"
              onChange={(event) =>
                setForm({ ...form, stabilisers: event.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              label="Keycaps"
              fullWidth
              variant="standard"
              onChange={(event) =>
                setForm({ ...form, keycaps: event.target.value })
              }
            />
            <Input
              inputProps={{ accept: ".png, .jpeg, .jpg" }}
              type="file"
              onChange={(event) => handleAddImage(event)}
            ></Input>
            <DialogActions>
              <StyledFilledButton onClick={handleClose}>
                Cancel
              </StyledFilledButton>
              <StyledFilledButton variant="outlined" type="submit" autoFocus>
                Submit
              </StyledFilledButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

KeyboardForm.propTypes = {
  handlePost: PropTypes.func,
};

NewKeyboardModal.propTypes = {
  form: PropTypes.object,
  setForm: PropTypes.func,
  openState: PropTypes.bool,
  handleClose: PropTypes.func,
  handlePostClose: PropTypes.func,
};

export default KeyboardForm;
