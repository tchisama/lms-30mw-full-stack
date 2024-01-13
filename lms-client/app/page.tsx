"use client";
import Navbar from "@/components/global/Navbar";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import _30mw from "@/public/30mw.png";
import _s3d from "@/public/s3d.png";
import Image from "next/image";
import useFetchUser from "@/hooks/fetch-user";
import { use, useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import TypeWriter from "@/components/global/TypingWriter";
import Link from "next/link";
import { server } from "@/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Courses from "@/components/global/Courses";
import { Separator } from "@/components/ui/separator";

interface LandingPage {
  landing_page: {
    Header: string;
    Text: string;
    learn: string[];
    button: string;
  };
  _id: string;
  __v: number;
}

export default function Home() {
  const user = useClerk();
  const [config, setConfig] = useState<LandingPage>();
  const [loading, setLoading] = useState(true);
  useFetchUser();
  useEffect(() => {
    fetch(server + "config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <h1 className="flex gap-3">
          <Loader className="animate-spin" />
          Loading...
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full  px-6  mx-auto">
      <div className="py-4 flex max-w-[1800px] mx-auto  flex-col">
        <div className="container mx-auto">
          <Navbar />
        </div>
        <div className="  rounded-3xl  my-8 px-20 flex-1 flex py-8 dark:bg-slate-900 bg-slate-100 gap-2 justify-between items-center">
          <Image src={_30mw} alt="logo" className="drop-shadow-2xl filter dark:invert" width={400} height={400}></Image>
          <div className="flex flex-col items-end flex-1 justify-center ">
            <h1
              dangerouslySetInnerHTML={{
                __html: config?.landing_page?.Header as string,
              }}
              className="text-7xl leading-snug text-right font-bold "
            ></h1>
            <h2 className="text-2xl max-w-xl mt-4 text-mutid-foreground text-right">
              {config?.landing_page?.Text}
            </h2>
            {/* <h2 className="text-4xl font-medium text-mutid-foreground text-center">
               Learn {" "} 
              <TypeWriter data={config?.landing_page?.learn||[]}></TypeWriter>
            </h2> */}
            <div className="pt-8">
              <Link
                href="/courses"
                className="px-8 shadow-2xl flex-row-reverse hover:scale-105 items-center duration-150 py-4 text-lg bg-primary text-white uppercase rounded-full flex gap-2 "
              >
                ابدأ في التعلم <ArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-8">
        <Courses />
      </div>

      <div className="my-8">
        <Separator />
      </div>

      <p className="text-center opacity-60">Powered By</p>

      <div className="flex dark:invert filter gap-8 opacity-70 drop-shadow-2xl justify-center items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image
                src={_30mw}
                width={150}
                height={150}
                alt="Picture of the author"
                className=""
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>30 min website</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image
                src={_s3d}
                width={150}
                height={150}
                alt="Picture of the author"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>stodio 3d</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
