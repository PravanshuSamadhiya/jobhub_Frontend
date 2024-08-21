import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application?.applicants === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyNowFunction = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicants: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob))  // help us to real time update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
                        <p className='text-gray-500 mt-2'> {singleJob?.location}</p>
                        <div className='flex items-center gap-4 mt-4'>
                            <Badge className='text-gray-700 bg-gray-200'>{singleJob?.experienceLevel} + Years</Badge>
                            <Badge className='text-gray-700 bg-gray-200'>{singleJob?.position} Position</Badge>
                            <Badge className='text-gray-700 bg-gray-200'>{singleJob?.jobType}</Badge>
                            <Badge className='text-gray-700 bg-gray-200'>${singleJob?.salary} / Month</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyNowFunction}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#10b981] hover:bg-blue-700 text-white'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}</Button>
                </div>
                <div className='border-t-2 border-gray-200 mt-6 pt-6'>
                    <h2 className='font-bold text-lg'>About The Job</h2>
                    <p className='text-gray-700 mt-4'>{singleJob?.description}</p>
                </div>
                <div className='border-t-2 border-gray-200 mt-6 pt-6'>
                    <h2 className='font-bold text-lg'>Qualifications and Skill Sets</h2>
                    <ul className='list-disc list-inside text-gray-700 mt-4'>
                        {singleJob?.requirements?.map((requirements, index) => (
                            <li key={index}>{requirements}</li>
                        ))}
                    </ul>
                </div>
                <div className='border-t-2 border-gray-200 mt-6 pt-6'>
                    <h2 className='font-bold text-lg'>Responsibilities</h2>
                    <ul className='list-disc list-inside text-gray-700 mt-4'>
        {singleJob?.description?.split('\n').map((paragraph, index) => (
            <li key={index}>{paragraph}</li>
        ))}
    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;

