/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import  {Posting, ThreadCard}  from "./features/thread/components/ThreadCard"
// import ThreadsData from '@/utils/fakedata/threads.json'
import ThreadsData from './utils/fakedata/threads.json'
import {  Grid, Text } from "@chakra-ui/react"
import { SideBar } from "./pages/layouts/sidebar"
import { RightBar } from "./pages/layouts/rightbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
// threads = read only
// setThreads = kalau mau set data harus ini

const [Threads, _] = useState(ThreadsData)
  return (


    <>
    <BrowserRouter>
    <Routes> 
    <Route element={<ThreadCard/>} path="/testing">

      </Route>
    </Routes>
    </BrowserRouter>


<Grid templateColumns='repeat(3, 1fr)' gap={2} style={{ background:"black" , color:"white"}} >
  <div style={{ fontSize:"25px" }}>
   <SideBar />
  </div>
  
  <div>
    <Text fontSize={"20pt"} paddingBottom={"20px"}>HOME</Text>
  <Posting/>
        {Threads.map((item , index)  => (
  
        <ThreadCard 
        key={index} 
        id={item.id}
        author_fullname={item.author_fullname} 
        author_picture={item.author_picture} 
        author_username = {item.author_username} 
        content={item.content} 
        likes_count={item.likes_count} 
        replies_count={item.replies_count} 
        posted_at={item.posted_at}
        is_like={item.is_like}
        />
        ))}
  </div>
  <div>
    <RightBar/>
  </div>
</Grid>


    </>
  ) 
}

export default App
