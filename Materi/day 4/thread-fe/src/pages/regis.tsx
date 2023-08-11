/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { IUserRegister } from "@/intefaces/User";
import { API } from "@/lib/api";
import { Button, FormControl, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export default function FormRegister() {

    const [form, setForm] = useState<IUserRegister>({
        fullname: "",
        email: "",
        username: "",
        password: "",
    })

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }
async function handleRegister (){
    try {
        const response = await API.post(`/auth/register`,form)
        console.log(`ini bagian check erro : ${response.data}`)
    } catch (error) {
        console.log(error)
    }
}

return (
<FormControl>
    <Text textAlign={"center"} fontSize={"20pt"}> INI BAGIAN REGISTER</Text>
<Text> FULLNAME </Text>
<Input  type="text" name="fullname" placeholder="fullname" onChange={handleChange} />
<Text> email </Text>
<Input  type="email" name="email" placeholder="emnail" onChange={handleChange} />

<Text> USERNAME </Text>
<Input type="text" name="username" placeholder="username" onChange={handleChange} />

<Text>PASSWORD </Text>
<Input type="password" name="password" placeholder="password"onChange={handleChange} />

<Button type="submit" onClick={handleRegister}> Submit </Button>                                                                     
</FormControl>
)
}


