/* eslint-disable react/react-in-jsx-scope */

import { Thread } from "@/intefaces/Thread";
import { API } from "@/lib/api";
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
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
// import { AxiosResponse } from "axios";
import { User } from "@/intefaces/User";
export function ThreadCard() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

  async function getThreads() {
    try {
      const response = await API.get("/thread");
      console.log("API data:", response.data);
      setThreads(response.data);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  }

  useEffect(() => {
    getThreads();
  }, []);

  const user1: User = {
    id: 1,
    fullname: "User 1",
    username: "user1",
    password: "password", // This is just a placeholder, replace with actual password
    description: "Description of User 1", // Replace with actual description
  };

// Modify your handleNewPostSubmit function
const handleNewPostSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (newPostContent.trim() === "" || newImageURL.trim() === "") {
    return; // Don't submit empty content or image URL
  }

  try {
    const newThread: Thread = {
      id: 8,
      user: user1, 
      content: newPostContent,
      posted_at: new Date().toISOString(),
      image: newImageURL, // Use the provided image URL
      is_like: false,
      likes_count: 0,
      replies_count: 0,
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setNewPostContent("");
    setNewImageURL(""); // Clear the image URL
  } catch (error) {
    console.error("Error creating new post:", error);
  }
};




  const handleLikeClick = (threadIndex: number) => {
    const updatedThreads = [...threads];
    const thread = updatedThreads[threadIndex];

    if (thread.is_like) {
      thread.likes_count--;
    } else {
      thread.likes_count++;
    }

    thread.is_like = !thread.is_like;
    setThreads(updatedThreads);
  };

  return (
    <>
      <Box>
      <form onSubmit={handleNewPostSubmit}>
  <Box display={"flex"}>
    <FormControl isRequired>
      <Input
        placeholder="Your Content"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
      />
    </FormControl>
    <FormControl isRequired>
      <Input
        placeholder="Image URL"
        value={newImageURL}
        onChange={(e) => setNewImageURL(e.target.value)}
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
