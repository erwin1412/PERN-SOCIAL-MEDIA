/* eslint-disable react/react-in-jsx-scope */
"use client";

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
} from "@chakra-ui/react";


export default function LayouteRight() {
    
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
              ✨ <Text fontSize={"15px"}> Erwin </Text> ✨
            </Box>
            <Text fontSize={"11px"} color={"gray.500"}>
              @Erwin
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
          </Box>
        </Box>
        <Box justifyContent={"space-between"} gap={"5px"} padding={"10px"}>
          <Text>Suggested for you</Text>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Avatar
                width={"26px"}
                height={"26px"}
                src={
                  "https://img.freepik.com/free-photo/portrait-optimistic-businessman-formalwear_1262-3600.jpg"
                }
                css={{
                  border: "2px solid white",
                }}
              />
              <Box marginX={"10px"}>
                <Text fontSize={"13px"}>Erwin</Text>
                <Text fontSize={"11px"} color={"gray.500"}>
                  @Erwin
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
              >
                {" "}
                Follow
              </Button>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Avatar
                width={"26px"}
                height={"26px"}
                src={
                  "https://img.freepik.com/premium-photo/successful-businessman-suit-tie-holding-out-hand-handshake-office_151013-48252.jpg"
                }
                css={{
                  border: "2px solid white",
                }}
              />
              <Box marginX={"10px"}>
                <Text fontSize={"13px"}>Erwin</Text>
                <Text fontSize={"11px"} color={"gray.500"}>
                  @Erwin
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
                backgroundColor={"green"}
                color={"dark"}
                borderRadius={"20px"}
                py={"3px"}
                background={"back"}

              >
                {" "}
                Following
              </Button>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Avatar
                width={"26px"}
                height={"26px"}
                src={
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                }
                css={{
                  border: "2px solid white",
                }}
              />
              <Box marginX={"10px"}>
                <Text fontSize={"13px"}>Erwin</Text>
                <Text fontSize={"11px"} color={"gray.500"}>
                  @Erwin
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
              >
                {" "}
                Follow
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
