/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from "react";
import {
  Box,
  Button,
  
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
// import { AxiosResponse } from "axios";
import { useEffectThreads } from "@/hooks/useFetchThreads";
import { RootState } from "@/stores/types/rootState";
import { useSelector } from "react-redux";
import { Thread } from "./thread";
import { FaImage } from "react-icons/fa";



export function ThreadCard() {
  const [threadList, setThreadList] = useState([])
  const threadsRedux = useSelector((state: RootState) => state.thread);

  const loggedInUser = useSelector((state: RootState) => state.auth);
  console.log("Logged in user:", loggedInUser);

  const { previewImage, handleNewPostSubmit, threads, handleChange , form} =
    useEffectThreads();

  useEffect(() => {
    console.log("threads Redux : ", threadsRedux);

    setThreadList(threads);
  }, [threads , threadsRedux]);

  
  return (
    <>
      <Box>
        <form encType="multipart/form-data" onSubmit={handleNewPostSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={6}
            boxShadow="md"
            borderRadius="md"
            
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Create a New Post
            </Text>
            
            <Box display={"Flex"}>
            <FormControl mb={4}>
                <Input
                    color={"red"}
                    placeholder="Your Content"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    width={"500px"}
                />
            </FormControl>
            <FormControl mb={4} marginLeft={"10px"}>
                <label htmlFor="image">
                    <Input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        display="none"
                    />
                    <Button as="span" colorScheme="teal">
                        <FaImage />
                    </Button>
                </label>
            </FormControl>
            <Button type="submit" colorScheme="blue" marginLeft={"10px"} marginRight={"50%"} paddingRight={"5%"} paddingLeft={"5%"}>
                POST
            </Button>
            </Box> 
          </Box>
          {previewImage && (
            <Image
              src={previewImage}
              mt={4}
              mx="auto"
              maxW="400px"
              borderRadius="md"
              boxShadow="md"
            />
          )}
        
        </form>

        <h1>Threads</h1>
        {threadsRedux?.map((item, index) => {
          return (
            <Thread
              key={index}
              user={item.user}
              content={item.content}
              posted_at={item.posted_at}
              image={item.image}
              likes_count={item.likes_count}
              replies_count={item.replies_count}
              id={item.id}
              is_like={item.is_like}
              replies={[]}
              likes={[]}
            />
          );
        })}
      </Box>
    </>
  );
}
