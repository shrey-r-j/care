import React from 'react'
import Image from 'next/image'
import logo from "@/public/assets/icons/logo-full.svg"
import Link  from "next/link"
import registerIcon from "@/public/assets/images/register-img.png" 
import RegisterForm from '@/components/forms/RegisterForm'

const Register = async () => {

  return (
       <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src = {logo}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm  />

          <p className="copyright py-12">© 2025 CarePluse</p>
        </div>
      </section>

      <Image
        src={registerIcon}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register