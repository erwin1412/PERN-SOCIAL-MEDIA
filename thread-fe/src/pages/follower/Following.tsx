/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Following } from "@/features/thread/components/following";
import { useEffectFollow } from "@/hooks/useFetchFollow";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
export default function FollowingPage() {
  const followingRedux = useSelector((state: RootState) => state.following);

  const { following } = useEffectFollow();

  const [activeLink, setActiveLink] = useState("following");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Box>
      <Box bg={useColorModeValue("dark", "gray.800")}></Box>
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

        {followingRedux?.map((item, index) => {
          return (
            <Following
              key={index}
              id={item.followed.id}
              user_id={item.followed.id}
              fullname={item.followed.fullname}
              username={item.followed.username}
              email={item.followed.email}
              description={item.followed.description}
              picture={item.followed.picture}
              // is_followed = {item.is_followed}
            />
          );
        })}
      </Box>
    </Box>
  );
}
