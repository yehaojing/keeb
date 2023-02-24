import * as React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  CardContent,
  CardHeader,
  Typography,
  // Paper,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const KeyboardCard = ({ keyboard, handleDelete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
    handleDelete();
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <StyledCard>
      <CardHeader
        title={keyboard.name}
        subheader={keyboard.manufacturer}
        action={
          <>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1 }}
              onClick={handleDeleteModalOpen}
            >
              DELETE
            </Button>
          </>
        }
      />
      <CardContent
        sx={{
          paddingTop: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="body1">Switches</Typography>
          <Typography variant="caption">{keyboard.switches}</Typography>
        </div>
        <div>
          <Typography variant="body1">Stabilisers</Typography>
          <Typography variant="caption">{keyboard.stabilisers}</Typography>
        </div>
        <div>
          <Typography variant="body1">Keycaps</Typography>
          <Typography variant="caption">{keyboard.keycaps}</Typography>
        </div>
        <DeleteKeyboardModal
          openState={deleteModalOpen}
          handleClickOpen={handleDeleteModalOpen}
          handleClose={handleDeleteModalClose}
          handleDeleteClose={handleDeleteClose}
        />
      </CardContent>
    </StyledCard>
  );
};

const DeleteKeyboardModal = ({ openState, handleClose, handleDeleteClose }) => {
  return (
    <div>
      <Dialog open={openState} onClose={handleClose}>
        <DialogTitle>{"Remove this keyboard?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to remove this keyboard?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

KeyboardCard.propTypes = {
  keyboard: PropTypes.object,
  handleDelete: PropTypes.func,
};

DeleteKeyboardModal.propTypes = {
  openState: PropTypes.bool,
  handleClose: PropTypes.func,
  handleDeleteClose: PropTypes.func,
};

export default KeyboardCard;
