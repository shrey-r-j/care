"use client";
import { useSearchParams,useRouter } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '@/public/assets/icons/logo-full.svg'
import gifi from "@/public/assets/gifs/success.gif"
import axios from "axios";
import { da } from "zod/v4/locales";
import { Doctors } from "@/constants";
import calenderIcon from "@/public/assets/icons/calendar.svg"
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const Success = () => {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get("appointmentId");
    // console.log(appointmentId);
    const [data,setData] = useState("");
    // const [doctor,setDoctor] = useState("");
    useEffect(()=>{
        try {
           const fetchDetails = async()=>{
                const res = await axios.get('http://localhost:5000/api/appointment/info',{
                    params : {appointmentId},
                })
                setData(res.data.appointment);
                console.log(res.data.appointment)
           }  
           fetchDetails();  
        } catch (error) {
            console.log(error);
        }
    },[appointmentId])

    // @ts-ignore 
    const doctor = Doctors.find((x)=>(x.name === data.primaryPhysician))

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href='/'>
                <Image
                    src = {logo}
                    alt = 'logo'
                    height={1000}
                    width={1000}
                    className='h-10 w-fit'
                />
            </Link>
            <section className='flex flex-col items-center'>
                <Image
                    src = {gifi}
                    alt='gif'
                    height={300}
                    width={280}
                />
                <h2 className='header mb-6 max-w-[600px] text-center'>
                Your <span className='text-green-500'>appointment request </span> has been successfully submitted!
                </h2>
                <p >We'll be in touch shortly to confirm.</p>
            </section>
            <section className='request-details'>
                <p>Requested appointment details</p>
                <div className='flex iems-center gap-3'>
                    <Image
                        src={doctor?.image!}
                        alt={doctor?.name!}
                        height={100}
                        width={100}
                        className="size-6"
                    />
                    <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                </div>
                <div className="flex gap-2">
                    <Image
                        src={calenderIcon}
                        height={24}
                        width={24}
                        alt = "calender"
                    />
                    <p>{formatDateTime(data.schedule).dateTime}</p>
                </div>
            </section>
            <Button variant="outline" className="shad-primary-btn" asChild>
                <Link href={`/patients/new-appointment`}>
                    New Appointment
                </Link>
            </Button>
            <div className="text-14-regular mt-5 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CarePulse
            </p>
          </div>
        </div>
    </div>
  )
}

export default Success