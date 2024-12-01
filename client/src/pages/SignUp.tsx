import { useRef } from 'react'
import Input from '../components/Input'
import { Button } from '../components/ui/Button'
import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();
    const navigate = useNavigate();

    async function signUpSubmitted () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(BACKEND_URL +"/api/v1/signup", {
            username,
            password
        })

        navigate("/signin")

        alert("You have signed up")
    }

    return <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
        <div className='bg-white border min-w-48 p-8 rounded-xl'>
            <Input reference={usernameRef} placeholder='Username' />
            <Input reference={passwordRef} placeholder='Password' />
            <div className='flex justify-center pt-4' >
                <Button variant='primary' text="SignUp" size='md' fullWidth={true} onClick={signUpSubmitted}/>
            </div>
        </div>
    </div>
}

export default SignUp