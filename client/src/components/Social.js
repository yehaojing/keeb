import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatRelative, parseISO } from "date-fns";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import postService from "../services/posts";
import NewPostModal from "./PostForm";
import StyledContainer from "./StyledContainer";

const Social = ({ login }) => {
  const [posts, setPosts] = useState([]);

  const postHook = () => {
    postService.getAll().then((response) => {
      setPosts(response);
    });
  };
  useEffect(postHook, []);

  const navigate = useNavigate();

  return (
    <>
      <StyledContainer>
        <Container
          style={{
            flexDirection: "row",
            display: "flex",
            padding: 0,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">Social</Typography>
          <NewPostModal login={login} />
        </Container>
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
                    key={`${post.id}_${post.title}`}
                    hover={true}
                    onClick={() => {
                      navigate(`/social/${post.id}`);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="h5">{post.title}</Typography>
                      <Typography variant="subtitle1">
                        {post.author_id}
                      </Typography>
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
      </StyledContainer>
    </>
  );
};

Social.propTypes = {
  posts: PropTypes.array,
};

export default Social;
