/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Follower } from "@/features/thread/components/follower";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
import { useEffectFollow } from "@/hooks/useFetchFollow";
export default function FollowerPage() {
  const followerRedux = useSelector((state: RootState) => state.followers);

  const { follower } = useEffectFollow();

  const [activeLink, setActiveLink] = useState("follower");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Box>
      <Box bg={useColorModeValue("white", "gray.800")}></Box>
      <Box>
        <div
          className="link-container"
          style={{ border: "2px solid white", justifyContent: "space-around" }}
        >
          <Link
            to="/following"
            onClick={() => handleLinkClick("following")}
            className={activeLink === "following" ? "active" : ""}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Text color={"white"}>Following</Text>
          </Link>
          <Link
            to="/follower"
            onClick={() => handleLinkClick("follower")}
            className={activeLink === "follower" ? "active" : ""}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Text color={"white"}>Follower</Text>
          </Link>
        </div>

        <Box marginBottom={"5%"}></Box>

        {followerRedux?.map((item, index) => {
          return (
            <Follower
              key={index}
              id={item.follower.id}
              user_id={item.follower.id}
              fullname={item.follower.fullname}
              username={item.follower.username}
              email={item.follower.email}
              description={item.follower.description}
              picture={item.follower.picture}
              is_follow={item.is_follow}
            />
          );
        })}
      </Box>
    </Box>
  );
}
