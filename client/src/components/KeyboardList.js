import { Table, TableRow } from "@mui/material";
import * as React from "react";
// import useStyles from "./style";

const KeyboardList = ({ keyboards }) => {
  // const classes = useStyles();
  return (
    <Table>
      {keyboards.map((keyboard) => {
        return (
          <>
            <TableRow>{keyboard}</TableRow>
          </>
        );
      })}
    </Table>
  );
};

export default KeyboardList;
