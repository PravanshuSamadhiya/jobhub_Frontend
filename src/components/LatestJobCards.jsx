import React from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + '...';
    };
    return (
        <div  className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer w-full'>
            <div className='flex items-center gap-4'>
                <Avatar className='h-12 w-12'>
                    <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                </Avatar>
                <div>
                    <h1 className='font-semibold text-md '>{job?.title}</h1>
                    <h1 className='text-sm text-gray-600'>{job?.company?.name}</h1>
                </div>
            </div>
            <div className='my-3'>
                <p className='text-sm text-gray-500'>{truncateDescription(job?.description, 100)}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-2'>
                <Badge className={'text-blue-700 font-semibold'} variant='ghost'>{job?.position}</Badge>
                <Badge className={'text-[#f83002] font-semibold'} variant='ghost'>{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-semibold'} variant='ghost'>{job?.salary}LPA</Badge>
            </div>
           <div className='flex justify-end mt-4'>
           <Button onClick={() => navigate(`/description/${job._id}`)} className='mt-4 bg-[#10b981] text-white font-bold py-2 px-4 rounded'>
                 Apply Now
            </Button>
           </div>
        </div>
    );
};

export default LatestJobCards;
