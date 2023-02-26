import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "white",
  marginBottom: theme.spacing(1),
  backgroundColor: "#888FC7",
  "&:hover": {
    backgroundColor: "#77A888",
  },
}));

export default StyledButton;
