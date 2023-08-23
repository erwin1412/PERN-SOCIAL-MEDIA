/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */


import { IUserRegister } from "@/intefaces/User";
import { API } from "@/lib/api";
import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlane } from "react-icons/fa"; // Import the plane icon from react-icons



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

    async function handleRegister() {
        try {
            const response = await API.post(`/auth/register`, form);
            console.log(`Response data: ${response.data}`);
            // Navigate to the login page after successful registration
            navigate("/auth/login");
        } catch (error) {
            console.log(error);
        }
    }

    const numPlanesLeftToRight = 10; // Number of planes moving left to right
    const numPlanesTopToBottom = 10; // Number of planes moving top to bottom

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgGradient="linear(to bottom, #FEB2B2, #FFED4B)" // Set the gradient background
            animation="fadeIn 2s forwards" // Apply fade-in animation
            position="relative" // Set the parent container to relative position
            overflow="hidden" // Hide any overflowing content
        >
            {/* Generate planes moving left to right */}
            {Array.from({ length: numPlanesLeftToRight }).map((_, index) => (
                <Box
                    key={`leftToRight${index}`}
                    position="absolute" // Set position to absolute
                    top={`${10 + index * 8}%`} // Adjust vertical position for each plane
                    left="-10%" // Initial position outside the screen
                    transform="rotate(-20deg)" // Rotate the icon
                    fontSize="4xl"
                    color="#fff"
                    opacity="0.5"
                    animation={`movePlaneLeftToRight${index + 1} 10s linear infinite`} // Apply the animation
                >
                    <FaPlane />
                </Box>
            ))}

            {/* Generate planes moving top to bottom */}
            {Array.from({ length: numPlanesTopToBottom }).map((_, index) => (
                <Box
                    key={`topToBottom${index}`}
                    position="absolute" // Set position to absolute
                    top="-10%" // Initial position outside the screen
                    left={`${10 + index * 8}%`} // Adjust horizontal position for each plane
                    transform="rotate(-20deg)" // Rotate the icon
                    fontSize="4xl"
                    color="#fff"
                    opacity="0.5"
                    animation={`movePlaneTopToBottom${index + 1} 10s linear infinite`} // Apply the animation
                >
                    <FaPlane />
                </Box>
            ))}

            <FormControl p="6" w="400px" bg="white" borderRadius="md" boxShadow="lg">
                <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="4">
                    Register
                </Text>
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
            <style>
                {`
                    ${Array.from({ length: numPlanesLeftToRight }).map((_, index) => (
                        `@keyframes movePlaneLeftToRight${index + 1} {
                            from {
                                left: -10%; // Start position
                            }
                            to {
                                left: 110%; // End position
                            }
                        }`
                    )).join('\n')}
                    ${Array.from({ length: numPlanesTopToBottom }).map((_, index) => (
                        `@keyframes movePlaneTopToBottom${index + 1} {
                            from {
                                top: -10%; // Start position
                            }
                            to {
                                top: 110%; // End position
                            }
                        }`
                    )).join('\n')}
                `}
            </style>
        </Box>
    );
}