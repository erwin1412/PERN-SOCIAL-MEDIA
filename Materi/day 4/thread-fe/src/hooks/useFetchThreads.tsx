/* eslint-disable react/react-in-jsx-scope */

import { IThread } from "@/intefaces/Thread";
import { API } from "@/lib/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export function useEffectThreads() {
  const [threads, setThreads] = useState<IThread[]>([]);
 

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

  const { userId } = useParams();
  const [newPostContent, setNewPostContent] = useState({
    content : "",
    image : "",
    user: null, 
    
  });

  const handleNewPostSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const postData = { ...newPostContent, user: userId }; // Include userId in the postData
      await API.post("/thread/create", postData);
      getThreads(); // You need to have a getThreads function defined somewhere
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };


//  const handleNewPostSubmit = async (
//   event: React.FormEvent<HTMLFormElement>
// ) => {
//   event.preventDefault();

//   try {
    
//     await API.post("/thread/create", newPostContent,);
//     getThreads()

//   } catch (error) {
//     console.error("Error creating new post:", error);
//   }
// };




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

 return{ handleLikeClick , handleNewPostSubmit , threads , newPostContent , setNewPostContent}
}




// const handleNewPostSubmit = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     if (newPostContent.trim() === "" || newImageURL.trim() === "") {
//       return; 
//     }

//     try {
//       const response: AxiosResponse<IThread> = await API.post("/thread/create", {
//         content: newPostContent,
//         image: newImageURL,
//         user: user1
//       });

//       const newThread = response.data;
//       setThreads([newThread, ...threads]);
//       setNewPostContent("");
//       setNewImageURL(""); 
//     } catch (error) {
//       console.error("Error creating new post:", error);
//     }
//   };


