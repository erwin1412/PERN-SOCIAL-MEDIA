/* eslint-disable react/react-in-jsx-scope */

import { Button, Text } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export function RightBar() {
    
    return (
<>
   
<div style={{ background:"gray" , marginBottom:"100px" , width:"50%"}}>
<h1>My Profile</h1>
<img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ width:"300px" , height:"100px" }}></img>
<Text>
    <span style={{ display:"flex" }}>
    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ width:"50px" , height:"50px" , borderRadius:"50%"}} />
    <Button marginLeft={"50%"}>Edit Profile</Button>
    </span>
</Text>
<Text>Erwin</Text>
<Text>@Erwin</Text>
<Text>Lorem Lorem</Text>
<Text>291 Following 23 Followes</Text>
</div>


<div style={{ background:"grey" , width: "50%" }}>
    <Text>Suggest For You</Text>

<div style={{ display:"flex" , paddingTop:"10px"}}>
    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ borderRadius:"50%" , width:"50px" , height:"50px" }} alt="" />
    <div style={{ paddingLeft:"10px" }}>
        <p>erwin</p>
        <p>@Erwin</p>
    </div>
    <Text paddingLeft={"10%"}><Button>Follow</Button></Text>
</div>

<div style={{ display:"flex" , paddingTop:"10px"}}>
    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ borderRadius:"50%" , width:"50px" , height:"50px" }} alt="" />
    <div style={{ paddingLeft:"10px" }}>
        <p>erwin</p>
        <p>@Erwin</p>
    </div>
    <Text paddingLeft={"10%"}><Button>Follow</Button></Text>
</div>

<div style={{ display:"flex" , paddingTop:"10px"}}>
    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ borderRadius:"50%" , width:"50px" , height:"50px" }} alt="" />
    <div style={{ paddingLeft:"10px" }}>
        <p>erwin</p>
        <p>@Erwin</p>
    </div>
    <Text paddingLeft={"10%"}><Button>Follow</Button></Text>
</div>

<div style={{ display:"flex" , paddingTop:"10px"}}>
    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ borderRadius:"50%" , width:"50px" , height:"50px" }} alt="" />
    <div style={{ paddingLeft:"10px" }}>
        <p>erwin</p>
        <p>@Erwin</p>
    </div>
    <Text paddingLeft={"10%"}><Button>Follow</Button></Text>
</div>




</div>
<div style={{  background:"grey" , width:"50%" }}>
<div style={{ display:"flex" , marginTop:"30px" }}>

    <Text >Develop By Erwin </Text>
    <p style={{ paddingLeft:"10px" }}><FaGithub/></p>
    <p><FaLinkedin/></p>
    <p><FaFacebook/></p>
    </div>
    <div>
        <Text fontSize={"8pt"}>Powered by DumbWays Indonesia #1CodingBootcamp</Text>
    </div>
</div>

 </>
    )
  
}