// /* eslint-disable react/react-in-jsx-scope */
// "use client";

// import { Follower } from "@/features/thread/components/follower";
// import {  Following } from "@/features/thread/components/following";
// import { useEffectFollow } from "@/hooks/useFetchFollow";
// import {
//   Box,
//   Center,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";

// export default function FollowerPage() {

//   const {following , follower} =
//     useEffectFollow();

//   return (
//     <Center py={6} width={"350px"}>
//       <Box
//         maxW={"90%"}
//         w={"full"}
//         bg={useColorModeValue("white", "gray.800")}
//         boxShadow={"lg"}
//         rounded={"md"}
//         overflow={"hidden"}
//       >

//         </Box>
//         <Box justifyContent={"space-between"} gap={"5px"} padding={"10px"}>
//           <Text>Following</Text>
//           {following?.map((item, index) => {
        
//           return (
//             <Following
//               key={index}
//               id={item.followed.id}
//               user_id={item.followed.id}
//               fullname={item.followed.fullname}
//               username={item.followed.username}
//               email={item.followed.email}
//               description={item.followed.description}
//               picture={item.followed.picture}
//               // is_followed = {item.is_followed}
//             />
          
//             );



          
//         })}
//         </Box>


//         <Box justifyContent={"space-between"} gap={"5px"} padding={"10px"}>
//           <Text>Follower</Text>
//           {follower?.map((item, index) => {
        
//           return (
//             <Follower
//               key={index}
//               id={item.follower.id}
//               user_id={item.follower.id}
//               fullname={item.follower.fullname}
//               username={item.follower.username}
//               email={item.follower.email}
//               description={item.follower.description}
//               picture={item.follower.picture}
//               // is_followed = {item.is_followed}
//             />
          
//             );



          
//         })}
//         </Box>

//     </Center>
    
//   );
// }
