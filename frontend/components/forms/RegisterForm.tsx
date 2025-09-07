"use client"
import userIcon from "@/public/assets/icons/user.svg"
import emailIcon from "@/public/assets/icons/email.svg"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {UserFormValidation} from "@/lib/validation"

import {
  Form,
  FormControl
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField , {Customprops} from "../ui/customFormField"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"



const RegisterForm = ()=> {
  // 1. Define your form.
    const [isLoading,setisLoading] = useState(false)
    const router = useRouter()
    const [User,setUser] = useState("");
    useEffect(()=>{
        const fetchDetails = async()=>{
            const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found. Please log in.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/user/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
        console.log(User);
      } catch (error:any) {
        console.error("Error fetching club details:", error.response?.data?.message || error.message);
      }
        }
        fetchDetails();
    },[])
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
            </div>
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
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.DATE_PICKER}
            name = "birthDate"
            label = "DOB"
            placeholder = "sj@gmail.com"
            iconSrc = {emailIcon}
            iconAlt = "user"
        />

        <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.SKELETON}
            name = "gender"
            label = "Gender"
            renderSkeleton={(field)=>(
              <FormControl>
                <RadioGroup 
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue = {field.value}
                >
                  {GenderOptions.map((x,i)=>(
                    <div key={x+i} className="radio-group">
                      <RadioGroupItem
                        value ={x}
                        id = {x}
                      />
                        <Label
                          htmlFor={x}
                          className="cursor-pointer"
                        >
                          {x}
                        </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
        )}
        />
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
           <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "address"
            label = "Address"
            placeholder = "Enter address"
          />

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "occupation"
            label = "Occupation"
            placeholder = "Software Engineer"
          />
        </div>

         <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "emergencyContactName"
            label = "Emergency Contact Name"
            placeholder = "Guardian's name"
          />

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.PHONE_INPUT}
            name = "emergencyContactPhone"
            label = "Emergency Phone number"
            placeholder = "(+91) 1234567890"
          />

        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.SELECT}
            name = "primaryPhysician"
            label = "Primary care physician"
            placeholder = "Select a physician"
        >
          {Doctors.map((x)=>(
            <SelectItem key={x.name} value={x.name}>
              <div className="flex cursor-pointer items-center">
                <Image
                  src={x.image}
                  height={32}
                  width={32}
                  alt = {x.name}
                  className="rounded-full border border-dark-500"
                />
                <p>{x.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
      
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "insuranceProvider"
            label = "Insurance Provider"
            placeholder = "Policy Bazaar"
          />

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.INPUT}
            name = "insurancePolicyNumber"
            label = "Insurance policy number"
            placeholder = "ABC1234456"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "allergies"
            label = "Allergies (if any)"
            placeholder = "Milk, Peanuts, Pollen, ..."
          />

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "currentMedication"
            label = "Current Medication (if any)"
            placeholder="Eg. Paracetamol"
          />
        </div>

          <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "familyMedicalHistory"
            label = "Family Medical History (if any)"
            placeholder = "Enter Medical History"
          />

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "pastMedicalHistory"
            label = "Past Medical History (if any)"
            placeholder = "Enter Medical History"
          />
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm