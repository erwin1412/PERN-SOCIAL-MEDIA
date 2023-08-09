/* eslint-disable react/react-in-jsx-scope */

import { Text, Image, Button, Box, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ThreadsData from "../../../utils/fakedata/threads.json";

// interface ThreadCard {
//   id?: number;
//   author_picture?: string;
//   author_fullname?: string;
//   author_username?: string;
//   posted_at?: string;
//   content?: string;
//   likes_count?: number;
//   replies_count?: number;
//   is_like?: boolean;
// }

export function ThreadCard() {
  const [Threads, setThreads] = useState(ThreadsData);

  const handleLikeClick = (threadIndex: number) => {
    const updatedThreads = [...Threads];
    const thread = updatedThreads[threadIndex];

    if (thread.is_like) {
      thread.likes_count--;
    } else {
      thread.likes_count++;
    }

    thread.is_like = !thread.is_like;
    setThreads(updatedThreads);
  };
  console.log("ThreadsData:", ThreadsData);
  return (
    
    <>
      {Threads.map((data, index) => (
        <Box key={index}>
          <Box marginTop={"20px"} color={"White"}>
            <div style={{ display: "flex" }}>
              <Image
                src={data.author_picture}
                width={"50px"}
                height={"50px"}
                style={{ borderRadius: "100%" }}
              ></Image>
              <div>
                <div style={{ display: "flex" }}>
                  <Link to={`detail/${data.id}`}>
                    <Text>{data.author_fullname}</Text>
                  </Link>

                  <Text paddingLeft={"10px"}>{data.author_username}</Text>
                  <Text paddingLeft={"10px"}>{data.posted_at}</Text>
                </div>
                <div>
                  <Wrap>
                    <WrapItem>
                      <Text w="70%"> {data.content}</Text>
                    </WrapItem>
                  </Wrap>

                  <Button
                    background={"white"}
                    marginLeft={"10px"}
                    onClick={() => handleLikeClick(index)}
                  >
                    <FaHeart
                      style={
                        data.is_like ? { color: "red" } : { color: "grey" }
                      }
                    />
                    <h4 style={{ paddingLeft: "20px" }}>{data.likes_count}</h4>
                  </Button>

                  <Button background={"white"}>
                    <FaCommentDots />{" "}
                    <h4 style={{ paddingLeft: "20px" }}>
                      {data.replies_count}
                    </h4>
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      ))}
    </>
  );
}
