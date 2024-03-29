import { useEffect, useState } from 'react';
import axios from 'axios';
import useCourseStore, { Course } from './course-store';
import { useClerk } from '@clerk/nextjs';
import useUserStore from './users-store';
import usePublishCourse from './use-publish-course';
import { server } from '@/server';

const useFetchUser = () => {

  const {user,updateUser} = useUserStore()
  const userClerk = useClerk()
  
  useEffect(() => {
    if(userClerk.user?.id){
      axios.post("/api/auth",{
          fname: userClerk.user?.firstName||"",
          lname: userClerk.user?.lastName||"",
          email: userClerk.user?.emailAddresses[0].emailAddress||"",
          photo: userClerk.user?.imageUrl||"",
          id_user: userClerk.user?.id||"",
      })
      .then((res)=> {
        updateUser(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  },[updateUser,userClerk.user?.id])

};

export default useFetchUser;
