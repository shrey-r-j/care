"use client";
import emailIcon from "@/public/assets/icons/email.svg";
import logo from "@/public/assets/icons/logo-full.svg"
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/customFormField"

import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneinput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// ✅ Validation for login (email only)
const LoginValidation = z.object({
  email: z.string().email("Enter a valid email"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
    },
  });

  // 🔑 Handle login
  async function onSubmit({ email }: z.infer<typeof LoginValidation>) {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        router.push("/patients/new-appointment"); // redirect after login
        return alert("Login successful ✅");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src = {logo}
            height={1000}
            width={1000}
            alt = "patient"
            className="mb-12 h-10 w-fit"
          />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome Back 👋</h1>
          <p className="text-dark-700">Log in to continue</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="sj@gmail.com"
          iconSrc={emailIcon}
          iconAlt="user"
        
        />

        <SubmitButton isLoading={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </SubmitButton>
      </form>
    </Form>
     </div>
      </section>
    </div>
  );
};

export default LoginForm;
