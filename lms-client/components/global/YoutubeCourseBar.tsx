import Image from 'next/image'
import React from 'react'
import hero from "@/public/photoshop hero.jpg"
import CountdownClock from './CountDownClock'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, Pipette } from 'lucide-react'
import BuyNow from './BuyNow'
import youtube from "@/public/youtube.png"
type Props = {
  home?:boolean
}

function YoutubeCourseBar({home=false}: Props) {
  const targetDate = new Date("2024-02-11T21:00:00");
  
  return (
    <div dir='rtl'>
      <div className=' bg-gradient-to-r to-[#FF3232] md:p-0 p-4 md:py-8 from-[#FF6464] mt-28 drop-shadow-lg rounded-3xl border-2 border-[#FF3232]' >
        <div className='md:container flex flex-col md:flex-row-reverse justify-between items-center'>
          <div className='relative'>
            <Image alt="illustration" className=" mb-[-50px] h-[200px] md:h-[400px] object-contain relative -top-20 md:-top-28" width={600} height={600} src={youtube}></Image>
          </div>
          <div className='flex flex-col  items-start flex-1 gap-8 w-full md:w-fit'>
            <h1 className='md:text-6xl text-4xl text-white'>دورة احتراف اليوتوب و صناعة المحتوى</h1>
            {/* <h1 className='md:text-4xl text-3xl text-[#124972]'>يوم الأحد  فبراير </h1> */}
            {/* <div className='text-white'>
              <CountdownClock targetDate={targetDate} />
            </div> */}
            {/* <h1 className='md:text-4xl text-3xl text-white max-w-xl'>فقط <span className='text-5xl md:text-6xl'>100</span>درهم!</h1> */}
            <h1 className='md:text-xl text-lg text-white max-w-xl'>دورة احتراف اليوتيوب وصناعة المحتوى , تمنحك القدرة على بناء قناة يوتيوب ناجحة وجذابة بمهارات واستراتيجيات متقدمة</h1>
            <div className='flex gap-2 flex-col md:flex-row items-center w-full'>
          {/* <ButtonLink>
              <Button variant={"outline"} className='bg-white  rounded-full border-2 text-[#124972] text-2xl p-8 flex items-center gap-3'>
              إنضم الآن 
              <FaWhatsapp />
              </Button>
          </ButtonLink> */}
          <BuyNow>
              <Button variant={"outline"} className='bg-white w-full md:max-w-sm  rounded-full border-2 text-[#124972] text-2xl p-6 py-8 md:p-8 flex items-center gap-3'>
                  أطلب الدورة 
                  <ChevronLeft />
              </Button>
          </BuyNow>
          
          {
            home ?
          <Link href={"/course/652ef7dc53ea4063cc913b90/6iukii"}>
              <Button variant={"ghost"} className=' rounded-full hover:bg-transparent hover:text-white  text-white text-md  flex items-center gap-3'>
                المزيد <ArrowLeft />
              </Button>
          </Link>
          :null
          }
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

const ButtonLink = ({ children }:{children: React.ReactNode})=>{
  return (
    <Link href={"https://chat.whatsapp.com/EsrYFGsKXvO2bklNq4GZ5D"}>
      {children}
    </Link>
  )
}

export default  YoutubeCourseBar