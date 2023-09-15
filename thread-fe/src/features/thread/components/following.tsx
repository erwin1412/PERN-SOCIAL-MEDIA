/* eslint-disable react/react-in-jsx-scope */

import { useEffectFollow } from "@/hooks/useFetchFollow";
import { IFollowing } from "@/intefaces/Follow";
import { API } from "@/lib/api";
import { Avatar, Box,  Button,  Text } from "@chakra-ui/react";

export function Following(props: IFollowing) {
  const { getFollowing } = useEffectFollow();
  async function handlePostFollower(id_User: number | undefined) {
    const response = await API.post("/follow", { idUser: id_User  });
    console.log("data Response ", response.data);
    if (response.data) {
      getFollowing()
    }
  }
  return (
    <div>
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
          <Box marginX={"10px"}>
            <Text fontSize={"13px"}>{props.fullname}</Text>
            <Text fontSize={"11px"} color={"gray.500"}>
              @{props.username}
            </Text>
          </Box>
        </Box>
        <Box>
          <Button
            width={"100px"}
            colorScheme={"red"}
            onClick={() => {
              handlePostFollower(props.id);
            }}
          >
            <Text>Unfollow</Text>
          </Button>
        </Box>
      </Box>
    </div>
  );
}
