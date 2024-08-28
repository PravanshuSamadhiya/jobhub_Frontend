import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'

const userGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const authState = useSelector(store => store.auth);
    const token = authState.user.token;
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    },
                    {withCredentials:true});
                console.log(res.data.company)
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch])
}

export default userGetCompanyById
