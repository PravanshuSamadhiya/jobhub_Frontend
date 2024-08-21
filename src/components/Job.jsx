import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'



const Job = ({ job }) => {
  const navigate = useNavigate();
 

  const daysAgoFunction = (mondodbTime) => {
    const createdAt = new Date(mondodbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }


  return (
    <div className='w-full'>
      <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-end gap-5'>
        <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt) === 0 ? "Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
          <Button variant='outline' className='rounded-full' size='icon' ><Bookmark /></Button>
        </div>

        <div className='flex items-center gap-2 my-2'>
          <Button className='p-6' variant='outline' size='icon'>
            <Avatar >
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div className='flex gap-5 items-center justify-center'>
            <h1 className='font-bold text-sm'>{job?.company?.name}</h1>
            <p>India</p>
           
          </div>
        </div>
        <div>
          <h1 className='text-sm font-bold my-4'>{job?.title}</h1>
          <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex justify-between mt-4'>
        <div className='flex items-center gap-2 mt-4'>
          <Badge className={'text-blue-700 font-semibold'} variant='ghost'>{job?.position} Positions</Badge>
          <Badge className={'text-[#f83002] font-semibold'} variant='ghost'>{job?.jobType}</Badge>
          <Badge className={'text-[#7209b7] font-semibold'} variant='ghost'>{job?.salary} LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
          <Button className='bg-gray-100' onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
          <Button className='bg-[#10b981]'>Save for Later</Button>
        </div>
        </div>
       
      </div>
    </div>

  )
}

export default Job
