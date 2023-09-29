"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import illu from "@/public/signup1.png"
import Image from "next/image"
import Link from "next/link"
import SignUpComponent from "@/components/global/Sign-up-component"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="grid grid-cols-2 min-h-screen justify-center items-center">
      <div className="w-full h-full relative bg-primary justify-center items-center flex">
          <Image alt="illustration" className="w-[70%] object-contain drop-shadow-xl" src={illu}></Image>
          <Link className="absolute bottom-4 right-6 text-white" href="/">
            Create an teacher accout
          </Link>
      </div>
      <Link href="/sign-in" className="absolute top-6 right-8">
        <Button>Sign in</Button>
      </Link>

      <Link href="/" className="absolute top-10 left-10">
        <h1 className="text-white text-3xl font-bold">LMS</h1>
      </Link>

        <div className="w-[400px] mx-auto">
            <SignUpComponent/>
        </div>


    </div>
  )
}