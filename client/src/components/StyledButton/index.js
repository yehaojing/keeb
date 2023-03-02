import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFilledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "white",
  marginBottom: theme.spacing(1),
  backgroundColor: "#888FC7",
  "&:hover": {
    backgroundColor: "#77A888",
  },
}));

export const StyledOutlinedButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#888FC7",
  border: "1px solid #888FC7",
  marginBottom: theme.spacing(1),
  "&:hover": {
    color: "white",
    backgroundColor: "#888FC7",
  },
}));
