"use client"
import axios from 'axios';

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from "@/public/assets/icons/logo-full.svg"
import StatCard from '@/components/StatCard'
import appointLogo from '@/public/assets/icons/appointments.svg'
import pendingLogo from '@/public/assets/icons/pending.svg'
import cancelLogo from '@/public/assets/icons/cancelled.svg'
import {DataTable} from '@/components/table/DataTable';
import { columns, Payment } from '@/components/table/columns';




const Admin = () => {
    const[cnt,setcnt] = useState(null);
const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(()=>{
        const fetchDetails = async()=>{
        try {
            const res = await axios.get("http://localhost:5000/api/appointment/all");
            console.log(res.data.appointments);
            setcnt(res.data.counts)
            setAppointments(res.data.appointments)
        } catch (error) {
            console.log(error);
        }
        }
        fetchDetails()
    },[]);
    

    return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
       <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
            <Image
                src ={logo}
                height={32}
                width={32}
                alt="logo"
                className='h-8 w-fit'
            />
        </Link>
        <p className='text-16-semibold'>Admin Dashboard</p>
        </header> 
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'> Welcome 👋</h1>
                <p className='text-dark-700'>Start day with managing new appointments</p>
            </section>

            <section className='admin-stat'>
                <StatCard
                    type = "appointments"
                    count = {cnt?.scheduled}
                    label = "Scheduled appointments"
                    icon = {appointLogo}
                />
                <StatCard
                    type = "pending"
                    count = {cnt?.pending} 
                    label = "Pending appointments"
                    icon = {pendingLogo}
                />
                <StatCard
                    type = "cancelled"
                    count = {cnt?.cancelled}
                    label = "Cancelled appointments"
                    icon = {cancelLogo}
                />
            </section>
        <DataTable
            columns = {columns}
            data = {appointments}
            
        />
        </main>
    </div>
  )
}

export default Admin