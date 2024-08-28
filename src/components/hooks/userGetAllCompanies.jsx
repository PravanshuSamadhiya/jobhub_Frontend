import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


const userGetAllCompanies = () => {
    const dispatch = useDispatch();
    const authState = useSelector(store => store.auth);
  const token = authState.user.token;
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                },
                    {withCredentials:true});
                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default userGetAllCompanies