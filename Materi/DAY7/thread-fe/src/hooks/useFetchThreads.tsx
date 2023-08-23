/* eslint-disable react/react-in-jsx-scope */

import { IThread, IThreadPost } from "@/intefaces/Thread";
import { API } from "@/lib/api";
import { GET_THREAD } from "@/stores/rootReducer";

import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
export function useEffectThreads() {
  const [threads, setThreads] = useState<IThread[]>([]);
  const dispath = useDispatch()

  async function getThreads() {
    try {
      const response = await API.get("/thread");
      console.log("API data:", response.data);
      setThreads(response.data);
      dispath(GET_THREAD({
        threads : response.data
      }))
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  }

  useEffect(() => {
    getThreads();
  }, []);


  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      console.log("ini files", files[0]);
      setPreviewImage(URL.createObjectURL(files[0])); // Corrected line
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      // console.log("ini value", value);

      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const handleNewPostSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      // formData.append ("content" -> ambil dari validator backend
      // formData.append ("image" -> ambil dari validator backend

      formData.append("content", form.content);
      formData.append("image", form.image as File);
      console.log(`form content : ${form.content}`)

      console.log(`form image : ${form.image}`)
console.log(`form data : ${formData}`)
      // const postData = { ...formData, user: userId }; 
      // console.log(`form postData  ${postData}`)
      const data = await API.post("/thread", formData);
      console.log("ini data posdate ", data);
      getThreads();
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };



  return {
    previewImage,
    handleChange,
    handleNewPostSubmit,
    threads,
    setThreads,
    getThreads, 
    form,
  };
}
