/* eslint-disable react/react-in-jsx-scope */

import { useEffectFollow } from "@/hooks/useFetchFollow";
import { IFollower } from "@/intefaces/Follow";
import { API } from "@/lib/api";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";

export function Follower(props: IFollower) {
  
  const { getFollower } = useEffectFollow();
  async function handlePostFollower(id_User: number | undefined) {
    const response = await API.post("/follow", { idUser: id_User  });
    console.log("data Response ", response.data);
    if (response.data) {
      getFollower()
    }
  }
  return (
    <div style={{ width:"80%" }}>
      <Text key={props?.id}></Text>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"}>
          <Avatar
            width={"26px"}
            height={"26px"}
            src={props.picture}
            css={{
              border: "2px solid white",
            }}
          />
          <Box margin={"10px"} paddingRight={"50px"}>
            <Text fontSize={"13px"}>{props.fullname}</Text>
            <Text fontSize={"11px"} color={"gray.500"}>
              @{props.username}
            </Text>
          </Box>
          <div></div>
        </Box>
        <Box>
          <Button
            width={"100px"}
            colorScheme={props.is_follow ? "red" : "blue"}
            onClick={() => {
              handlePostFollower(props.id);
            }}
          >
            <Text>{props.is_follow ? 'Unfollow' : 'Follow'}</Text>
          </Button>
        </Box>
      </Box>
    </div>
  );
}
