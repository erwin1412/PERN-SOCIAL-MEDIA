/* eslint-disable react/react-in-jsx-scope */
import { IUser } from "@/intefaces/User";
import { API } from "@/lib/api";

import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
export function useEffectSuggest() {
  const [suggest, setsuggest] = useState<IUser[]>([]);
//   const dispath = useDispatch()
  async function getSuggest() {
    try {
      const response = await API.get("/random-users");
      console.log("API data:", response.data);
      setsuggest(response.data);
    //   dispath(GET_THREAD({
    //     suggest : response.data
    //   }))
    } catch (error) {
      console.error("Error fetching suggest:", error);
    }
  }

  useEffect(() => {
    getSuggest();
  }, []);




  return {
    suggest,
  };
}
