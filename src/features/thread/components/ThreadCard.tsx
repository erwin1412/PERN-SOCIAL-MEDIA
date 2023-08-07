/* eslint-disable react/react-in-jsx-scope */
import {Text , Image, Button, Box, Wrap, WrapItem} from "@chakra-ui/react"
import { FaCommentDots, FaHeart } from 'react-icons/fa';



//ngirim struct / model di golang / laravel
interface ThreadCard{
    id? : number,
    author_picture? : string,
    author_fullname? : string,
    author_username? : string,
    posted_at? : string,
    content? : string,
    likes_count? : number,
    replies_count? : number,
    is_like? : boolean,
}

export  function ThreadCard ( props : ThreadCard) {
    return(
    <>
    <Box marginTop={"20px"}>
 
    <div style={{ display:"flex" }}>
    <Image src={ props.author_picture } width={"50px"} height={"50px"}  style={{ borderRadius:"100%" }} ></Image>
    <div>
    <div style={{ display:"flex" }}>
    <Text >{props.author_fullname}</Text> 
    <Text  paddingLeft={"10px"}>{props.author_username}</Text>
    <Text  paddingLeft={"10px"}>{props.posted_at}</Text>
    </div>
    <div>
    <Wrap>
    <WrapItem>
    <Text w='70%'> {props.content}</Text>
    </WrapItem>
    </Wrap>
    <Button background={"white"} marginLeft={"10px"}>
    <FaHeart style=
    {props.is_like == true ? {color:"red"} : {color:"grey"} } 
    />
         <h4 style={{ paddingLeft:"20px" }}>{props.likes_count}</h4></Button>
    <Button background={"white"}>   <FaCommentDots /> <h4 style={{ paddingLeft:"20px" }}>{props.replies_count}</h4></Button>
    </div>
    </div>
    </div>
    </Box>
    </>
    )
}


export function Posting() {
return(
    <>

<div style={{ display:"flex" , paddingBottom:"5%"}}>
    <Image src="https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1280x720.png" width={"50px"} height={"50px"}  style={{ borderRadius:"100%" }}>
    </Image>
    <input placeholder="What Is Happening .... " style={{ width:"55%" }}/>
    <Button background={"green"} height={"55px"} width={"100px"} borderRadius={"10px"}>Post</Button>
</div>    
    </>
)

}