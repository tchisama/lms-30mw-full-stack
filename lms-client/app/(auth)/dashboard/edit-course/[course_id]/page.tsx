"use client"
import DashboardNavBar from '@/components/global/DashboardNavbar'
import React, { useEffect } from 'react';

import NewCourseDescription from '@/components/global/NewCourseDescription'
import NewCourseSections from '@/components/global/NewCourseSections'
import NewCourseImage from '@/components/global/NewCourseImage'
import NewCourseTitle from '@/components/global/NewCourseTitle'
import { Button } from '@/components/ui/button'
import { Frown, Loader, ShieldCheck, Trash2 } from 'lucide-react'
import NewCoursePrice from '@/components/global/NewCoursePrice'
import NewCourseCat from '@/components/global/NewCourseCat'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import axios from 'axios';
import useCourseStore from '@/hooks/course-store';
import usePublishCourse from '@/hooks/use-publish-course';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import useCategories from '@/hooks/categories';
import useCategoriesStore from '@/hooks/categories-store';
import { server } from '@/server';
import AddAccessUsers from '@/components/global/AddAccessUsers';
import LandingPageController from './LandingPageController';
type Props = {
  params: {
    course_id: string
  }
}
interface CourseAccess {
  _id: string;
  id_user: string;
  id_course: string;
  price_access: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: User[];
}

interface User {
  _id: string;
  lname: string;
  fname: string;
  email: string;
  id_user: string;
  photo: string;
  rule: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Page = ({params}: Props) => {
  const [loading,setLoading]=React.useState(true)
  const [err,setErr]=React.useState(false)
  const {updateCourse,course}=useCourseStore()
  const {update}=useCategories()
  const {categories}=useCategoriesStore()
  const [accesses,setAccesses]=React.useState<CourseAccess[]>([])
  const {publish,publishing}=usePublishCourse()

  useEffect(()=>{
    try {
      axios.get(server+"accesses/"+params.course_id)
      .then((res)=>{
        if(res.data!==null){
          setAccesses(res.data)
        }else{
          setErr(
            true
          )
        }
      })
    } catch (error) {
      console.log(error)
      setErr(true)
    }
  },[])
  // get the course by the param id using axios
  useEffect(()=>{
    try {
      axios.get("/api/course/"+params.course_id)
      .then((res)=>{
        if(res.data!==null){
          updateCourse(res.data)
        }else{
          setErr(
            true
          )
        }
        setTimeout(() => {
          setLoading(false)
        }, 1200);
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(true)
    }

  },[params.course_id,updateCourse])


    useEffect(()=>{
    if(loading) return
    if(!course) return
    if(!course.sections) return
    publish()
  },[course])



  if(loading){
      return  <div className='h-screen flex justify-center items-center '>
                  <h1 className='flex gap-3'><Loader className='animate-spin'/>Loading...</h1>
              </div>
  }

  if(err){
      return  <div className='h-screen flex gap-2 flex-col justify-center items-center '>
                  <h1 className='flex gap-3 text-lg'><Frown className=''/>No Course Found</h1>
                  <p className='text-'>it may be deleted</p>
              </div>
  }


  return (
    <>
    <div className=''>
        <div className='container min-h-screen  mx-auto'>
            <DashboardNavBar/>
            <div className='h-[120px] items-center flex justify-between'>
              <h1 className='text-3xl'>Manage course</h1>
              {/* <Button onClick={publish} className='flex gap-2' disabled={publishing}>
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
              </Button> */}
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="landingpage">Landing Page</TabsTrigger>
              </TabsList>
              <div className='my-6'>
                <Separator/>
              </div>
              <TabsContent value="landingpage">
                <LandingPageController/>
              </TabsContent>
              <TabsContent value="general" className='w-full'>
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
              Ta</TabsContent>
              <TabsContent value="security" className=' flex gap-4 flex-col'>


                <div className='grid grid-cols-2 gap-4'>

                <div className='flex flex-col gap-4'>
                <Card className='max-w-2xl'>
                  <CardHeader>
                    <div className='flex justify-between'>
                      <CardTitle>Owners</CardTitle>
                      <Button className='flex gap-2'><ShieldCheck size={18}/> Add Owner</Button>
                    </div>
                    <div className='pt-4'>
                    <div className='p-2 px-4 flex gap-2 items-center border rounded-lg '>
                          <Avatar>
                              <AvatarImage src='https://avatars.githubusercontent.com/u/115560200?v=4'></AvatarImage>
                          </Avatar>
                          <div className='flex p-2 flex-col'>
                            <h3>tchisama</h3>
                            <p className='text-sm text-muted-foreground'>pro.tchisama@gmail.com</p>
                          </div>
                    </div>
                    </div>
                  </CardHeader>
                </Card>
                <Separator/>

                <Card className='max-w-2xl'>
                  <CardHeader>
                    <div className='flex justify-between'>
                      <div>
                      <CardTitle>Delete Course</CardTitle>
                      <p className='text-sm text-muted-foreground'>this will remove the course and all its content</p>
                      </div>
                      <Button onClick={()=>{
                        if (!confirm("Are you sure you want to delete this course?")) return
                        axios.delete("/api/course",{
                          data:{
                            id:params.course_id
                          }
                        }).then((res)=>{
                          if(res.status==200){
                            window.location.href="/dashboard/courses"
                          }
                        })
                      }} variant={"destructive"} className='flex gap-2'><Trash2 size={18}/> Delete</Button>
                    </div>
                  </CardHeader>
                </Card>

                <Separator/>
                </div>

                <Card className='max-w-2xl  h-fit'>
                  <CardHeader>
                    <div className='flex justify-between'>
                      <CardTitle>Access</CardTitle>
                      <AddAccessUsers usersHaveAccess={accesses} params={params}/>
                    </div>
                    <div className='pt-4'>

                      {
                        accesses &&
                        accesses.map((access)=>(
                          <div className='p-1 px-3 flex gap-2 items-center border-b'>
                                <Avatar>
                                    <AvatarImage src={access?.user[0]?.photo}></AvatarImage>
                                </Avatar>
                                <div className='flex p-2 flex-col'>
                                  <h3>{access?.user[0]?.fname} {access?.user[0]?.lname}</h3>
                                  <p className='text-sm text-muted-foreground'>{access.user[0]?.email}</p>
                                </div>
                          </div>
                        ))
                      }
                    </div>
                  </CardHeader>
                </Card>


                </div>


              </TabsContent>
            </Tabs>

            
        </div>
    </div>
    </>
  )
}



export default Page
