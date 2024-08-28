import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'

const userGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const authState = useSelector(store => store.auth);
    const token = authState.user.token;
    useEffect(() => {
        const fetchAppliedJobs = async() => {
            try {
                const res =  await axios.get(`${APPLICATION_API_END_POINT}/get`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        },
                    {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs()
    },[])
}
export default userGetAppliedJobs
