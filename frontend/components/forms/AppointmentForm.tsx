"use client"
import userIcon from "@/public/assets/icons/arrow.svg"
import emailIcon from "@/public/assets/icons/email.svg"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {UserFormValidation, getAppointmentSchema} from "@/lib/validation"

import {
  Form
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/customFormField"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import {FormFieldType} from "@/components/forms/PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"





const AppointForm = ({type} : string)=> {
  // 1. Define your form.
    const [isLoading,setisLoading] = useState(false)
    const router = useRouter()
    const [User,setUser] = useState(null)
    let AppointmentFormValidation = getAppointmentSchema(type);
   
    useEffect(()=>{
        const fetchDetails = async()=>{
            const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found. Please log in.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/user/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.ID);
        // console.log(User);
        console.log("Fetched User:", response.data.ID);
      } catch (error:any) {
        console.error("Error fetching user details:", error.response?.data?.message || error.message);
      }
        }
        fetchDetails();
    },[])

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setisLoading(true);
    let status;
    switch(type){
      case "schedule" :
        status = 'scheduled'
        break;
      case "cancel" :
        status = 'cancelled'
        break;
      default:
        status = 'pending'  
        break;
    }
     try{
      if(type === "create" && User ){
        const appointmentData = {
            userId: User,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason,
            note: values.note,
            status: status
        }
        const res = await axios.post(
        "http://localhost:5000/api/appointment",
        appointmentData
      );
      if(res){
        form.reset();
        router.push(`/patients/new-appointment/success?appointmentId=${res.data.id}`);
        
      }
      console.log("Appointment created:", res.data);

      alert("Appointment created successfully!");
    } else {
      alert("User not loaded, please log in again.");
    }
    }
    catch(error){
      console.log(error)
    }finally {
  setisLoading(false);
}
  }

  let buttonLabel ;
  switch(type){
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = 'Create Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
      
    default :
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment</p>
        </section>

        {
          type !== "cancel" && (
            <>
              <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.SELECT}
            name = "primaryPhysician"
            label = "Doctor"
            placeholder = "Select a doctor"
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

          <CustomFormField
            fieldType= {FormFieldType.DATE_PICKER}
            control={form.control}
            name = "schedule"
            label="Expected"
            showTimeSelect
            dateFormat="MM/dd/yyyy - h:mm aa"
          />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "reason"
            label = "Reason for appointment"
            placeholder = "Enter reason for appointment"
          />

          <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "notes"
            label = "Notes"
            placeholder="Enter notes"
          />
        </div>

              
            </>
          )
        }

        {
          type === "cancel" &&(
            <CustomFormField
            control={form.control}
            fieldType = {FormFieldType.TEXTAREA}
            name = "cancellationReason"
            label = "Reason for cancellation"
            placeholder = "Enter reason for cancellation"
          />
          )
        }

        <SubmitButton isLoading={isLoading} className={`${type==="cancel" ? 'shad-danger-btn' :'shad-primary-btn' } w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointForm