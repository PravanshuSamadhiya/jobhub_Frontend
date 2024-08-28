import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import userGetAppliedJobs from './hooks/userGetAppliedJobs'


const isResume = true;
const Profile = () => {
    userGetAppliedJobs();
    const[open, setOpen] = useState(false)
    const {user} = useSelector(store => store.auth);
    
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto gap-4 border border-gray-300 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-20'>
                            <AvatarImage src='https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg' />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div>
                    <div className='flex items-center gap-5 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-5 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-semibold'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobsTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
