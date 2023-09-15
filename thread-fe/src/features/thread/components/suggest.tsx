/* eslint-disable react/react-in-jsx-scope */

import { IUser } from "@/intefaces/User";
import { API } from "@/lib/api";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";

export function Suggested(props: IUser) {
  async function handlePostFollow(id_User: number | undefined) {
    const response = await API.post("/follow", { idUser: id_User });
   

    console.log("data Response ", response.data);
   
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
        <Box marginRight={"5px"}>
          <Button
            width={"70px"}
            fontSize={"10px"}
            border={"2px"}
            borderColor={"gray.400"}
            height={"25px"}
            color={"dark"}
            borderRadius={"20px"}
            py={"3px"}
            background={"back"}
            onClick={() => {
              handlePostFollow(props.id);
            }}
          >
            {" "}
            {props.is_followed ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}
