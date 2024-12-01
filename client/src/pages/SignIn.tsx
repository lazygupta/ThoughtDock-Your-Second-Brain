import { useRef } from 'react'
import Input from '../components/Input'
import { Button } from '../components/ui/Button'
import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();
    const navigate = useNavigate();

    async function signInSubmitted () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        
        const response = await axios.post(BACKEND_URL +"/api/v1/signin", {
            username,
            password
        })

        // @ts-ignore
        const jwt = response.data?.token;
        
        localStorage.setItem("authorization", jwt)

        navigate("/dashboard");

    }

    return <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
        <div className='bg-white border min-w-48 p-8 rounded-xl'>
            <Input reference={usernameRef} placeholder='Username' />
            <Input reference={passwordRef} placeholder='Password' />
            <div className='flex justify-center pt-4' >
                <Button variant='primary' text="SignIn" size='md' fullWidth={true} onClick={signInSubmitted}/>
            </div>
        </div>
    </div>
}

export default SignIn