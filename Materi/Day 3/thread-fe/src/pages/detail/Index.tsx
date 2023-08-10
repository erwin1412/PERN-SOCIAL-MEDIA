/* eslint-disable react/react-in-jsx-scope */
import { useParams } from "react-router-dom";
import { Box, Card, CardBody, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Thread } from "@/intefaces/Thread";
import { API } from "@/lib/api";

const Detail = () => {
  const { id } = useParams();

  const [thread, setThread] = useState<Thread | null>(null);

  async function getThread() {
    try {
      const response = await API.get(`/thread/${id}`);
      console.log("API data:", response.data);
      setThread(response.data);
    } catch (error) {
      console.error("Error fetching thread:", error);
    }
  }

  useEffect(() => {
    getThread();
  }, [id]);

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
                      {new Date(thread?.posted_at).toLocaleDateString(
                        undefined,
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </Text>
                  </Box>
                  <Text py="2">{thread?.content}</Text>

                </CardBody>
              </Stack>
            </Card>
            <Card>Commentar</Card>
            {thread.replies && thread.replies.length > 0 ? (
                    thread.replies.map((reply, index) => (
                      <Text py="2" key={index}>
                        {thread.user.fullname}: {reply.comment}
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
