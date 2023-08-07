/* eslint-disable react/react-in-jsx-scope */

import { Button, Text } from "@chakra-ui/react";

export function RightBar() {
    
    return (
<>
   
<div style={{ background:"black" , paddingBottom:"500px"}}>
<h1>My Profile</h1>
<img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ width:"300px" , height:"100px" }}></img>
<Text>
    <span style={{ display:"flex" }}>
    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" style={{ width:"50px" , height:"50px" , borderRadius:"50%"}} />
    <Button marginLeft={"20%"}>Edit Profile</Button>
    </span>
</Text>
<Text>Erwin</Text>
<Text>@Erwin</Text>
<Text>Lorem Lorem</Text>
<Text>291 Following 23 Followes</Text>
</div>

<div style={{ background:"black" }}>Testing</div>

 </>
    )
  
}