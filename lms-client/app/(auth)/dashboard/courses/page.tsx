"use client"
import CourseCard from '@/components/global/CourseCard'
import DashboardNavBar from '@/components/global/DashboardNavbar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Course } from '@/hooks/course-store'
import { server } from '@/server'
import { Edit, Eye, Loader } from 'lucide-react'
import { Cardo } from 'next/font/google'
import Link from 'next/link'
import React, { useEffect } from 'react'


function Page() {

    const [courses ,setCourses] = React.useState<Course[]>([])
    const [search, setSearch] = React.useState('')
    const [loading,setLoading]=React.useState(true)
    useEffect(() => {
        fetch(server+'courses')
        .then(res => res.json())
        .then(data => 
          {
          setCourses(data)
          setLoading(false)
          }
        )
    },[])
    if(loading){
        return <div className='h-screen flex justify-center items-center '>
                    <h1 className='flex gap-3'><Loader className='animate-spin'/>Loading...</h1>
                </div>
    }
  return (
    <div className='px-6'>
        <div className='max-w-[1500px] min-h-screen  mx-auto'>
            <div className='container'>
            <DashboardNavBar/>
            </div>
            <div className='h-[120px] items-center flex justify-between'>
              <h1 className='text-3xl'>Courses</h1>
              <Input 
                value={search}
                onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
                className='max-w-[300px]'
                placeholder='Search'
              ></Input>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                {
                    courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase())).map((course, index) => {
                        return (
                            <CourseCard key={index} course={course}></CourseCard>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Page