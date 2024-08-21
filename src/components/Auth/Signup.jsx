import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Signup = () => {
    const[input, setInput] = useState({
        fullName:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:"",
        role:"",
        file:""
    })
    const {loading,user} = useSelector(store=> store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ChangeEventHandler = (e) => {
        setInput({  ...input, [e.target.name]: e.target.value });
    }
    
    const ChangeFileHandler = (e) => {
        setInput({  ...input, file: e.target.files ?.[0]})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("password",input.password);
            formData.append("confirmPassword",input.confirmPassword);
            formData.append("role",input.role);
            if(input.file){
                formData.append("file",input.file);
            }

            try {
                dispatch(setLoading(true));
                const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                    headers: { 'Content-Type': "multipart/form-data" },
                    withCredentials: true,
                });
                if(res.data.success){
                    navigate("/login");
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally{
                dispatch(setLoading(false));
            }

    }
    useEffect(() => {
        if(user){
            navigate("/")
        }
    },[])

    return (
        //    {left panel}
        <div className='min-h-screen flex items-stretch'>
            <div className=' w-2/5 p-10 text-white flex flex-col items-center justify-center bg-[#10b981]'>
                <h1 className='text-6xl font-bold mb-8'>Find the job <br /><span>made for you</span></h1>
                <p className='font-medium'>Browse over 130k jobs at <br />
                    top companies and fast-growing <br />startups.</p>
                <h2 className='text-2xl font-bold mt-8'>JobHub</h2>
            </div>
            {/* {right panel} */}
            <div className='w-3/5 flex items-center justify-center p-4 bg-white'>
                <div className='max-w-md w-full space-y-4'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Create Account</h2>
                    <div>
                        {/* button */}
                    </div>
                    <form onSubmit={submitHandler} className=''>
                        <div className='gap-4 mb-4'>
                            <Label>Full Name</Label>
                            <Input
                                type='text'
                                value={input.fullName}
                                name='fullName'
                                onChange={ChangeEventHandler}
                                placeholder='Pravanshu Samadhiya'
                            />
                        </div>
                        <div className='gap-4 mb-4'>
                            <Label>Email</Label>
                            <Input
                                type='email'
                                value={input.email}
                                name='email'
                                onChange={ChangeEventHandler}
                                placeholder='Samadhiya@gmail.com'
                            />
                        </div>
                        <div className='gap-4 mb-4'>
                            <Label>Phone Number</Label>
                            <Input
                                type='text'
                                value={input.phoneNumber}
                                name='phoneNumber'
                                onChange={ChangeEventHandler}
                                placeholder='346346343'
                            />
                        </div>
                        <div className='flex gap-4 mb-4'>
                            <div>
                                <Label>Password</Label>
                                <Input
                                    type='password'
                                    value={input.password}
                                    name='password'
                                    onChange={ChangeEventHandler}
                                    placeholder='12344'
                                />
                            </div>
                            <div>
                                <Label>Confirm Password</Label>
                                <Input
                                    type='password'
                                    value={input.confirmPassword}
                                    name='confirmPassword'
                                    onChange={ChangeEventHandler}
                                    placeholder='12344'
                                />
                            </div>
                         
                        </div>
                        <div className='flex items-start justify-start'>
                            <RadioGroup className='flex gap-4 my-2'>
                                <div className="flex items-center space-x-2">
                                    <Input
                                    type='radio'
                                    name='role'
                                    value='student'
                                   checked={input.role === 'student'}
                                    onChange={ChangeEventHandler}
                                    className='cursor-pointer'
                                    />
                                    <Label >Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                   checked={input.role === 'recruiter'}
                                    onChange={ChangeEventHandler}
                                    className='cursor-pointer'
                                    />
                                    <Label >Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='flex items-center space-x-4'>
                                <Label>Profile</Label>
                                <Input
                                accept='image/*'
                                type='file'
                                onChange={ChangeFileHandler}
                                className='cursor-pointer'
                                />
                            </div>
                            {
                                loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button type='submit'className='w-full my-5'>Signup</Button>
                            }
                            
                           <span className='text-sm'>  Already have an account?<Link to='/login' className='text-blue-600'>Login</Link></span>
                    </form>
                </div>
            </div>


        </div>


    )
}

export default Signup
