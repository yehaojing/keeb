import * as React from "react";
import { Table, TableRow } from "@mui/material";
// import useStyles from "./style";

const KeyboardList = ({ keyboards }) => {
  // const classes = useStyles();
  return (
    <Table>
      {
        keyboards.map(keyboard => {
          return (
            <>
              <TableRow></TableRow>
            </>
          )
        })}

    </Table>
  )
}


export default KeyboardList
