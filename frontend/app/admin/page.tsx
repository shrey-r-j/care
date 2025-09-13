import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/public/assets/icons/logo-full.svg"
import StatCard from '@/components/StatCard'
import appointLogo from '@/public/assets/icons/appointments.svg'
import pendingLogo from '@/public/assets/icons/pending.svg'
import cancelLogo from '@/public/assets/icons/cancelled.svg'




const Admin = () => {
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
                    count = {5}
                    label = "Scheduled appointments"
                    icon = {appointLogo}
                />
                <StatCard
                    type = "pending"
                    count = {5}
                    label = "Pending appointments"
                    icon = {pendingLogo}
                />
                <StatCard
                    type = "cancelled"
                    count = {5}
                    label = "Cancelled appointments"
                    icon = {cancelLogo}
                />
            </section>
        </main>
    </div>
  )
}

export default Admin