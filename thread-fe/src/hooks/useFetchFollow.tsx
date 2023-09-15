/* eslint-disable react/react-in-jsx-scope */
import { IFollower, IFollowing } from "@/intefaces/Follow";
import { API } from "@/lib/api";
import { GET_FOLLOWER, GET_FOLLOWING } from "@/stores/rootReducer";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
export function useEffectFollow() {
  const [following, setFollowing] = useState<IFollowing[]>([]);
  const [follower, setFollower] = useState<IFollower[]>([]);
  const dispath = useDispatch()
  

  async function getFollower() {
    try {
      const response = await API.get("/followers");
      console.log("API data follower :", response.data);
      setFollower(response.data);
      dispath(GET_FOLLOWER({
        followers: response.data
      }));
    } catch (error) {
      console.error("Error fetching suggest:", error);
    }
  }
  useEffect(() => {
    getFollower();
  }, []);


  async function getFollowing() {
    try {
      const response = await API.get("/followings");
      console.log("API data Following:", response.data);
      setFollowing(response.data);
      dispath(GET_FOLLOWING({
        following: response.data
      }));
    } catch (error) {
      console.error("Error fetching suggest:", error);
    }
  }
  useEffect(() => {
    getFollowing();
  }, []);

  return {
    following,
    follower,
    getFollower,
    getFollowing,
  };
}
