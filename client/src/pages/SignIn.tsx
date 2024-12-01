
import Input from '../components/Input'
import { Button } from '../components/ui/Button'

const SignIn = () => {
    return <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
        <div className='bg-white border min-w-48 p-8 rounded-xl'>
            <Input placeholder='Username' />
            <Input placeholder='Password' />
            <div className='flex justify-center pt-4' >
                <Button variant='primary' text="Sign In" size='md' fullWidth={true} />
            </div>

        </div>
    </div>
}

export default SignIn;