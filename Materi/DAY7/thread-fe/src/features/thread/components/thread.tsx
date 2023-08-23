/* eslint-disable react/react-in-jsx-scope */
import { IThread } from "@/intefaces/Thread";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API, setAuthToken } from "@/lib/api";
import { FaHeart } from "react-icons/fa";
import { useEffectThreads } from "@/hooks/useFetchThreads";
import {  formatDistanceToNow } from "date-fns"



export function Thread(props: IThread) {
  const [showImage, setShowImage] = useState<boolean>(true);
  setAuthToken(localStorage.token);

  const {getThreads} = useEffectThreads();

  async function handlePostLike(threadId: number | undefined) {
    const response = await API.post("/like", { thread_id: threadId })
    // const response : any  = await API.post("/like", { thread_id: threadId }).then(data => setResponse(data))

 console.log("data Response " , response.data)
 if (response.data) {
  getThreads()
 }
  }
// console.log(responses.is_Like)

  // if(responses){
    // console.log("responses",responses?.data?.data?.isLIke )

  // }


  return (
    <div>
      <Box>
        <Text key={props?.id}></Text>
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
                <Text size="md">{props.user?.fullname}</Text>
                <Text paddingLeft={"10px"}>@{props.user?.username}</Text>
                <Text paddingLeft={"10px"}>
                  ●{" "}
                  {formatDistanceToNow(new Date(props.posted_at), { addSuffix: true })}
                  {/* {new Date(props.posted_at).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })} */}
                </Text>
              </Box>
              <Text py="2">{props.content}</Text>
              {showImage && (
                <Image
                  objectFit="cover"
                  maxW={{ sm: "100%" }}
                  maxH={{ sm: "100%" }}
                  src={props.image}
                  onError={() => setShowImage(false)}
                  alt="Caffe Latte"
                />
              )}
            </CardBody>

            <CardFooter>
              <Button
                
                marginLeft={"10px"}
                onClick={() => {
                  handlePostLike(props.id);
                }}
              >
{/* <Button
  onClick={() => {
    console.log("ini console", responses.is_Like);
  }}
></Button> */}
<Box color={props.is_like ? "red" : "green"} >
      <FaHeart />
    </Box>
                <h4 style={{ paddingLeft: "20px" }}>{props.likes_count}</h4>
              </Button>

              <Link to={`/detail/${props.id}`}>
                <Button >
                  <GoComment />
                  {props.replies_count}
                </Button>
              </Link>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </div>
  );
}