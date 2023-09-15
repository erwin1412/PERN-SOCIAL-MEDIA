// /* eslint-disable react/react-in-jsx-scope */
// import { IUserLogin } from "@/intefaces/User";
// import { API, setAuthToken } from "@/lib/api";
// import { Button, FormControl, Input, Text } from "@chakra-ui/react";
// import { ChangeEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux'
// import { AUTH_LOGIN } from "@/stores/rootReducer";

// export default function FormLogin() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [form, setForm] = useState<IUserLogin>({
//         email: "",
//         password: "",
//     })

//     function handleChange(event:ChangeEvent<HTMLInputElement>){
//         setForm({
//             ...form,
//             [event.target.name]: event.target.value
//         })
//     }

//     async function handleLogin (){
//         try {
//             const response = await API.post('/auth/login',form)
//             dispatch(AUTH_LOGIN(response.data))
            
//             localStorage.setItem("token" , response.data.token)
//             setAuthToken(localStorage.token);
//             navigate('/')
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <FormControl 
//             p="4" 
//             borderRadius="md" 
//             boxShadow="lg" 
//             border="1px" 
//             borderColor="gray.200" 
//             bg="white"
//             maxW="400px"
//             m="auto"
//         >
//             <Text fontSize="xl" fontWeight="bold" mb="4">
//                 LOGIN
//             </Text>
//             <Input
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 mb="4"
//             />
//             <Input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 mb="4"
//             />
//             <Button 
//                 colorScheme="blue" 
//                 onClick={handleLogin}
//                 _hover={{ bgColor: 'blue.600' }}
//                 _active={{ bgColor: 'blue.700' }}
//             >
//                 Submit
//             </Button>
//         </FormControl>
//     );
// }



/* eslint-disable react/react-in-jsx-scope */
import { IUserLogin } from "@/intefaces/User";
import { API, setAuthToken } from "@/lib/api";
// import { AUTH_LOGIN } from "@/stores/rrotReducer";
import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { AUTH_LOGIN, AUTH_LOGOUT } from "@/stores/rootReducer";
// import { FaPlane } from "react-icons/fa";
// import { useSelector } from 'react-redux'

export default function FormLogin() {
    const navigate = useNavigate()
    const dispath = useDispatch()
    // const user = useSelector((state : RootState)=>  state.auth)
    const [form, setForm] = useState<IUserLogin>({
        email: "",
        password: "",
    })

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }
async function handleLogin (){
    try {
        const response = await API.post('/auth/login',form)
        dispath(AUTH_LOGIN(response.data))
        console.log(response.data)
        console.log("Logged in user data:", response.data.user);
        
        localStorage.setItem("token" , response.data.token)
        setAuthToken(localStorage.token);
        navigate('/')
        // navigate(`/${response.data.user.id}`);

    } catch (error) {
        console.log(error)
        dispath(AUTH_LOGOUT)
    }
}

return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
>
   

        <FormControl
            p="4"
            borderRadius="md"
            boxShadow="lg"
            border="1px"
            borderColor="gray.200"
            
            maxW="400px"
            textAlign="center"
        >
            <Text fontSize="xl" fontWeight="bold" mb="4">
                Welcome Back!
            </Text>
            <Input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                mb="4"
            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                mb="4"
            />
            <Button
                colorScheme="blue"
                onClick={handleLogin}
                _hover={{ bgColor: 'blue.600' }}
                _active={{ bgColor: 'blue.700' }}
                w="100%"
            >
                Log In
            </Button>
            <Text mt="2" fontSize="sm">
            Don&apos;t have an account? <a href="/auth/register">Sign up</a>
            </Text>
        </FormControl>
    
        </Box>

);
}