import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { formatRelative, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";

import postService from "../services/posts";
import Breadcrumbs from "./Breadcrumbs";
import StyledContainer from "./StyledContainer";

export const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [crumbs, setCrumbs] = useState([]);
  const postHook = (id) => {
    return () => {
      postService
        .getPost(id)
        .then((response) => {
          setPost(response);
          setCrumbs([
            { link: "/", name: "Home" },
            { link: "/social", name: "Social" },
            { link: `/social/${response.id}`, name: `${response.title}` },
          ]);
        });
    };
  };
  useEffect(postHook(id), []);

  return (
    post && (
      <StyledContainer>
        <Breadcrumbs crumbs={crumbs} />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <PostItem post={post}></PostItem>
          {post.comments.map((comment) => {
            return (
              <CommentItem comment={comment} key={comment.id}></CommentItem>
            );
          })}
        </List>
      </StyledContainer>
    )
  );
};

const PostItem = ({ post }) => {
  return (
    <>
      <ListItem>
        <div style={{ marginRight: "5%", width: "10%" }}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={post.author.username}
            secondary={formatRelative(parseISO(post.created_on), new Date())}
            style={{ width: 100 }}
          />
        </div>
        <div>
          <ListItemText primary={post.content} />
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <>
      <ListItem>
        <div style={{ marginRight: "5%", width: "10%" }}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={comment.author.username}
            secondary={formatRelative(parseISO(comment.created_on), new Date())}
            style={{ width: 100 }}
          />
        </div>
        <div>
          <ListItemText primary={comment.content} />
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
