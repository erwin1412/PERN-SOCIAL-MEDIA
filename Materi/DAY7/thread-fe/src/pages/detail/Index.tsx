/* eslint-disable react/react-in-jsx-scope */
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardBody, FormControl, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IThread } from "@/intefaces/Thread";
import { API } from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
import { IReply } from "@/intefaces/Reply";
import {  formatDistanceToNow } from "date-fns"
const Detail = () => {
  const { id } = useParams();

  const [thread, setThread] = useState<IThread | null>(null);
  const [userreply, setReply] = useState<IReply[]>([]);
console.log("asdasd" ,userreply)
console.log("ini bagian thread : ",thread)
  async function getThread() {
    try {
      const response = await API.get(`/thread/${id}`);
      console.log("API data:", response.data);
      setThread(response.data);
    } catch (error) {
      console.error("Error fetching thread:", error);
    }
  }

  async function getReply() {
    try {
      const response = await API.get(`/replies/?threadId=${id}`);
      console.log("API data:", response.data);
      setReply(response.data);
    } catch (error) {
      console.error("Error fetching Reply:", error);
    }
  }

  useEffect(() => {
    getThread();
  }, [id]);

  useEffect(() => {
    getReply();
  }, [id]);


  
  const [newPostContent, setNewPostComment] = useState({
    comment : "",
    thread : null,
    user: null, 
    
  });
  const loggedInUser = useSelector((state: RootState) => state.auth);
  console.log("Logged in user:", loggedInUser);

  const handleNewCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  
  try {
    const postData = {
      comment: newPostContent.comment
    };
  console.log(postData)
  
  const response = await API.post(`/reply/create/${id}`, postData);
  const newReply = response.data;

     console.log("ini Response : " , response)
     console.log("ini New Reply : " , newReply)

     setNewPostComment({ ...newPostContent, comment: "" });
     console.log("ini Testing HAHAHAH : " , setNewPostComment)     
     getReply()
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  return (
    <Box>
      {thread ? (
        <>
          <Box>
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
                      {formatDistanceToNow(new Date(thread?.posted_at), { addSuffix: true })}
                    </Text>
                  </Box>
                  <Text py="2">{thread?.content}</Text>

                </CardBody>
              </Stack>
            </Card>
            <form onSubmit={handleNewCommentSubmit}>
           <FormControl isRequired>
              <Input
                placeholder="Image URL"
                value={newPostContent.comment}
                onChange={(e) =>
                  setNewPostComment({
                    ...newPostContent,
                    comment: e.target.value,
                  })
                }
              />
            </FormControl>
            <Button type="submit">Submit</Button>

           </form>
            <Card>Commentar</Card>
            {thread.replies && thread.replies.length > 0 ? (
                    userreply.map((reply, index) => (
                      <Text py="2" key={index}>
                        {reply.user.fullname}: {reply.comment}
                      </Text>
                    ))
                  ) : (
                    <Text py="2">No comments</Text>
                  )}
          </Box>
        </>
      ) : (
        <p>Data Tidak Ada</p>
      )}
    </Box>
  );
};

export default Detail;
