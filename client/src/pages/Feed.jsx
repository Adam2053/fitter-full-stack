import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Unstable_Grid2";
import SocialNav from "../components/SocialNav";
import Post from "../components/Post";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Followers from "../components/Followers";
import UserCard from "../components/UserCard";

const Feed = () => {
  return (
    <>
      <div className="flex justify-center top-0 z-20 sticky">
        <SocialNav />
      </div>
      <Flex justify={"center"} className="relative">
        <div className="sticky top-20" style={{height:"fit-content"}}>
          <Followers />
        </div>
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
          <br />
          <Post />
        </Flex>
        <div className="sticky top-20 w-[300px]" style={{height:"fit-content"}}>
          <UserCard />
        </div>
      </Flex>
    </>
  );
};

export default Feed;
