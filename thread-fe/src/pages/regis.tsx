/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */


import { IUserRegister } from "@/intefaces/User";
import { API } from "@/lib/api";
import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function FormRegister() {
    
    const navigate = useNavigate();
    const [form, setForm] = useState<IUserRegister>({
        fullname: "",
        email: "",
        username: "",
        password: "",
    });


    
    
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }
    
    const [isEmpty, setIsEmpty] = useState(false);
    async function handleRegister() {
        if (!form.fullname || !form.email || !form.username || !form.password) {
            setIsEmpty(true);
            return; 
        }
    
        try {
            const response = await API.post(`/auth/register`, form);
            console.log(`Response data: ${response.data}`);
            // Navigate to the login page after successful registration
            navigate("/auth/login");
        } catch (error) {
            console.log(error);
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
                <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="4">
                    Register
                </Text>
                {isEmpty && (
                    <Text color="red.500" mb="2" textAlign="center">
                        All fields must be filled
                    </Text>
                )}
                <Input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} mb="2" />
                <Input type="email" name="email" placeholder="Email" onChange={handleChange} mb="2" />
                <Input type="text" name="username" placeholder="Username" onChange={handleChange} mb="2" />
                <Input type="password" name="password" placeholder="Password" onChange={handleChange} mb="4" />
                <Button
                    colorScheme="blue"
                    onClick={handleRegister}
                    _hover={{ bgColor: 'blue.600' }}
                    _active={{ bgColor: 'blue.700' }}
                    w="100%"
                >
                    Register
                </Button>
                <Text mt="3" fontSize="sm" textAlign="center">
                    Already have an account? <a href="/auth/login" color="blue.400">Log in</a>
                </Text>
            </FormControl>

        </Box>
    );
}