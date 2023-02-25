import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  Collapse,
  CardMedia
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <CardHeader
        title={keyboard.name}
        subheader={keyboard.manufacturer}
      />
      <CardMedia
        component="img"
        alt="Norbauer Heavy Grail"
        height="140"
        image="https://images.squarespace-cdn.com/content/v1/4f31dc46cb127c78280cc974/1631080589725-U6TWH5F30U6BFWZLE50P/Norbauer+Heavy+Grail.jpg?format=1000w"
      />

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
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
