/* eslint-disable react/react-in-jsx-scope */
import { Button, Text} from "@chakra-ui/react"
import { FaHeart, FaHome,  FaPeopleArrows, FaSearch } from 'react-icons/fa';
import {RxExit } from "react-icons/rx";
export function SideBar() {
    
    return (
<>
<Text fontSize={"50pt"}>circle</Text>
    <p><Button style={{ backgroundColor:"black" , color:"white" , width: "20%"}}><FaHome />home</Button></p>
    <p><Button style={{ backgroundColor:"black" , color:"white" , width: "20%"}}><FaSearch />search</Button></p>
    <p><Button style={{ backgroundColor:"black" , color:"white" , width: "20%"}}><FaHeart />follows</Button></p>
    <p><Button style={{ backgroundColor:"black" , color:"white" , width: "20%"}}><FaPeopleArrows />profile</Button></p>
    <Button background={"green"} borderRadius={"50px"} width={"40%"}>Create POST </Button>
    <p style={{ marginTop:"80%" }}><Button paddingLeft={"30px"} background={"black"} textColor={"white"}>LOGOUT<RxExit/></Button></p>
    </>
    )
  
}