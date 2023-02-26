import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(10),
  color: theme.palette.text.secondary,
}));

export default StyledContainer;