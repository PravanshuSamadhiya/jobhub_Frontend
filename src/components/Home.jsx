import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Overview from './Overview'
import LatestJob from './LatestJob'
import Footer from './shared/Footer'
import userGetAllJobs from './hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  userGetAllJobs();

  useEffect(() => {
    if(user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  },[])
  return (
    <div>
      <Navbar/>
      <Overview name={user?.fullName}/>
      <LatestJob/>
      <Footer/>
    </div>
  )
}

export default Home
