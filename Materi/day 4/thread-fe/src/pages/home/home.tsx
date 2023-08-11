/* eslint-disable react/react-in-jsx-scope */

import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    FormControl,
    Image,
    Input,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { FaHeart } from "react-icons/fa";
  import { GoComment } from "react-icons/go";
  import { Link } from "react-router-dom";
  // import { AxiosResponse } from "axios";
  import { useEffectThreads } from "@/hooks/useFetchThreads";
  import { useState } from "react";
  export function Home() {
    const [showImage, setShowImage] = useState<boolean>(true);
    const {
      handleLikeClick,
      handleNewPostSubmit,
      threads,
      newPostContent,
      setNewPostContent,
    } = useEffectThreads();
    return (
      <>
        <Box>
          <form onSubmit={handleNewPostSubmit}>
            <Box display={"flex"}>
              <FormControl isRequired>
                <Input
                  placeholder="Your Content"
                  name="content"
                  onChange={(e) =>
                    setNewPostContent({
                      ...newPostContent,
                      content: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Image URL"
                  name=""
                  onChange={(e) =>
                    setNewPostContent({
                      ...newPostContent,
                      image: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Box>
          </form>
          <h1>Threads</h1>
          {threads.map((thread, index) => (
            <div key={index}>
              <Box>
                <Text key={thread?.id}></Text>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    borderRadius={"50%"}
                    objectFit="cover"
                    maxW={{ sm: "50px" }}
                    maxH={{ sm: "50px" }}
                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                    alt="Caffe Latte"
                  />
  
                  <Stack>
                    <CardBody>
                      <Box display={"flex"}>
                        <Text size="md">{thread.user?.fullname}</Text>
                        <Text paddingLeft={"10px"}>@{thread.user?.username}</Text>
                        <Text paddingLeft={"10px"}>
                          ●{" "}
                          {new Date(thread.posted_at).toLocaleDateString(
                            undefined,
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </Text>
                      </Box>
                      <Text py="2">{thread.content}</Text>
                      {showImage && (
                      <Image
                    objectFit="cover"
                    maxW={{ sm: "100%" }}
                    maxH={{ sm: "100%" }}
                    src={thread.image}
                    onError= {() => setShowImage(false)}
                    alt="Caffe Latte"
                  />
  )}
  
                    </CardBody>
  
                    <CardFooter>
                      <Button
                        background={"white"}
                        marginLeft={"10px"}
                        onClick={() => handleLikeClick(index)}
                      >
                        <FaHeart
                          style={
                            thread.is_like ? { color: "red" } : { color: "grey" }
                          }
                        />
                        <h4 style={{ paddingLeft: "20px" }}>
                          {thread.likes_count}
                        </h4>
                      </Button>
                      <Link to={`/detail/${thread.id}`}>
                        <Button backgroundColor={"white"}>
                          <GoComment />
                          {thread.replies_count}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Stack>
                </Card>
              </Box>
            </div>
          ))}
        </Box>
      </>
    );
  }
  