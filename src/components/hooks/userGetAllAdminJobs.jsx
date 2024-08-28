import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const userGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const authState = useSelector(store => store.auth);
    const token = authState.user.token;
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    },
                    {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default userGetAllAdminJobs