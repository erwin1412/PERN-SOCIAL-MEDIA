/* eslint-disable react/react-in-jsx-scope */

import { useParams } from "react-router-dom"
import ThreadsData from "../../utils/fakedata/threads.json";
import { Box } from "@chakra-ui/react";
const Index = () => {
  const {id} = useParams()
  const data = ThreadsData.find((datas)=>datas.id === parseInt(id))
  return (
    <>
    {data ? (

      <Box color={"white"}>
      <p>{data.author_fullname}</p>
      <p>{data.author_picture}</p>
      <p>{data.author_username}</p>
      <p>{data.content}</p>
      <p>{data.posted_at}</p>
      <p>{data.likes_count}</p>
      <p>{data.replies_count}</p>
      </Box>

     ) : (<p> Data Tidak Ada</p>) }
    </>
  )
}

export default Index








