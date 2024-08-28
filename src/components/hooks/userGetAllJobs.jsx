import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const userGetAllJobs = () => {
    const dispatch = useDispatch();
    const token = useSelector(store=> store.auth.token);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, 
                    { headers: {
                        'Authorization': `Bearer ${token}`
                    },},         
              {withCredentials:true});
               console.log(res);
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default userGetAllJobs
