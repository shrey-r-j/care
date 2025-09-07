"use client"
import userIcon from "@/public/assets/icons/user.svg"
import emailIcon from "@/public/assets/icons/email.svg"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {UserFormValidation} from "@/lib/validation"

import {
  Form
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/customFormField"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'


export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneinput',
    CHECKBOX = "checkbox",
    DATE_PICKER = "datepicker",
    SELECT = "select",
    SKELETON = "skeleton",
}



const PatientForm = ()=> {
  // 1. Define your form.
    const [isLoading,setisLoading] = useState(false)
    const router = useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email : "",
      phone : ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true);
     try{
        const userData = {
            name,
            email,
            phone
        }
        const res = await axios.post("http://localhost:3000/api/user/create",userData);
        console.log(res.data);
        form.reset();
        if(res){
            router.push('/patients/registration');
            localStorage.setItem("token",res.data.token);
            return alert("User created");
        }
    }
    catch(error){
        console.log(error)
    }finally {
  setisLoading(false);
}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "name"
            label = "Full name"
            placeholder = "Shrey Jagtap"
            iconSrc = {userIcon}
            iconAlt = "user"
        />

        <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "email"
            label = "Email"
            placeholder = "sj@gmail.com"
            iconSrc = {emailIcon}
            iconAlt = "user"
        />

        <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.PHONE_INPUT}
            name = "phone"
            label = "Phone number"
            placeholder = "(+91) 1234567890"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm