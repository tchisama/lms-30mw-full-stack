"use client"
import DashboardNavBar from '@/components/global/DashboardNavbar'
import React, { useEffect } from 'react';

import NewCourseDescription from '@/components/global/NewCourseDescription'
import NewCourseSections from '@/components/global/NewCourseSections'
import NewCourseImage from '@/components/global/NewCourseImage'
import NewCourseTitle from '@/components/global/NewCourseTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, Upload } from 'lucide-react'
import Masonry from 'react-masonry-css'
import NewCoursePrice from '@/components/global/NewCoursePrice'
import NewCourseCat from '@/components/global/NewCourseCat'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import useCourseStore from '@/hooks/course-store';
type Props = {
  params: {
    course_id: string
  }
}

const Page = ({params}: Props) => {
  const [loading,setLoading]=React.useState(true)
  const [publishing,setPublishing]=React.useState(false)

  const {updateCourse,course}=useCourseStore()

  // get the course by the param id using axios
  useEffect(()=>{
    try {
      axios.get("http://localhost:8080/course/"+params.course_id)
      .then((res)=>{
        console.log(res.data)
        updateCourse(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 1200);
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[params.course_id,updateCourse])

  const publish = async ()=>{
    setPublishing(true)
    try {
        const r= await  axios.post("http://localhost:8080/update-course/"+params.course_id,course)
        console.log(r.data)
        setTimeout(() => {
          setPublishing(false)
        }, 1000);
        
    }catch (error) {
      console.log(error)
      setPublishing(false)
    }
  }
  if(loading){
      return <div className='h-screen flex justify-center items-center '>
                  <h1 className='flex gap-3'><Loader className='animate-spin'/>Loading...</h1>
              </div>
  }


  return (
    <>
    <div className=''>
        <div className='container min-h-screen  mx-auto'>
            <DashboardNavBar/>
            <div className='h-[120px] items-center flex justify-between'>
              <h1 className='text-3xl'>Manage course</h1>
              <Button onClick={publish} className='flex gap-2' disabled={publishing}>
                {
                  publishing ?
                  <>
                    Publishing <Loader className='animate-spin' size={18}/>
                  </>
                  :
                  <>
                    Publish <Upload size={18}/>
                  </>
                }
              </Button>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-4'>
                  <NewCourseTitle/>
                  <NewCourseCat/>
                  <NewCourseDescription/>
                  <NewCourseSections/>
              </div>
              <div className='flex flex-col gap-4'>
                  <NewCourseImage/>
                  <NewCoursePrice/>
              </div>
            </div>
            
        </div>
    </div>
    </>
  )
}



export default Page