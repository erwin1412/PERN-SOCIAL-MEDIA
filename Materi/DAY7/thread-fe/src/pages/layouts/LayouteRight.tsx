/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Suggested } from "@/features/thread/components/suggest";
import { useEffectSuggest } from "@/hooks/useFetchSuggest";
import { setAuthToken } from "@/lib/api";
import { RootState } from "@/stores/types/rootState";
// import { RootState } from "@/stores/types/rootState";
// import { useEffectThreads } from "@/hooks/useFetchThreads";
import {
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function LayouteRight() {
  setAuthToken(localStorage.token);
  const loginSession = useSelector((state: RootState) => state.auth);

  const {suggest} =
    useEffectSuggest();

  return (
    <Center py={6} width={"350px"}>
      <Box
        maxW={"90%"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"100px"}
          w={"full"}
          src={
            "https://img.freepik.com/premium-photo/beautiful-space-background-cosmic-horizon-futuristic-journey-through-space-copy-space-generative-ai_894903-3647.jpg"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"start"} mt={-12} ml={"10px"}>
          <Avatar
            width={"30%"}
            height={"30%"}
            src={
              "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
            }
            css={{
              border: "4px solid white",
            }}
          />
        </Flex>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={"5px"}
          padding={"10px"}
        >
          <Box>
            <Box display={"flex"} fontWeight={"bold"}>
              ✨ <Text fontSize={"15px"}>
                {loginSession.fullname}
                 </Text> ✨
            </Box>
            <Text fontSize={"11px"} color={"gray.500"}>
              @{loginSession.username}
            </Text>
            <Text fontSize={"13px"}>
              Here you can easily remove choose file
            </Text>
            <Box display={"flex"} gap={"5px"}>
              <Text fontSize={"13px"}> 120</Text>
              <Text fontSize={"13px"} color={"gray.500"}>
                {" "}
                Following
              </Text>
              <Text fontSize={"13px"}> 23 </Text>
              <Text fontSize={"13px"} color={"gray.500"}>
                {" "}
                Followers
              </Text>
            </Box>
          </Box>
          <Box marginRight={"5px"}>
          <Link href='/profiles'>

     
            <Button
              fontSize={"12px"}
              height={"30px"}
              color={"dark"}
              borderRadius={"20px"}
              py={"3px"}
              background={"back"}
              boxShadow="dark-lg"
            >
              {" "}
              Edit Profile
            </Button>
            </Link>
          </Box>
          
        </Box>
        <Box justifyContent={"space-between"} gap={"5px"} padding={"10px"}>
          <Text>Suggested for you</Text>
          {suggest?.map((item, index) => {
          return (
            <Suggested
              key={index}
              fullname={item.fullname}
              username={item.username}
              email={item.email}
              description={item.description}
              picture={item.picture}
              is_followed = {item.is_followed}
            />
          );
        })}
        </Box>
      </Box>
    </Center>
    
  );
}
