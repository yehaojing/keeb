import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  formatRelative,
  parseISO,
} from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import * as React from "react";

const Social = ({ posts }) => {
  console.log(posts);
  const [selectedRow, setSelectedRow] = useState({});
  selectedRow;

  return (
    <>
      <Container>
        <Typography variant="h3">Social</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Post</TableCell>
                <TableCell align="right">Created On</TableCell>
                <TableCell align="right">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts
                .sort((a, b) => {
                  return parseISO(b.created_on) - parseISO(a.created_on);
                })
                .map((post) => (
                  <TableRow
                    key={post.id}
                    hover={true}
                    onClick={() => {
                      console.log(post);
                      setSelectedRow(post);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="h5">{post.title}</Typography>
                      <Typography variant="subtitle1">{post.author_id}</Typography>
                    </TableCell>

                    <TableCell align="right">
                      {formatRelative(parseISO(post.created_on), new Date())}
                    </TableCell>
                    <TableCell align="right">{post.comments.length}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

Social.propTypes = {
  posts: PropTypes.array,
};

export default Social;
