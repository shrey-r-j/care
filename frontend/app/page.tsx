import Image from "next/image";
import logo from "../public/assets/icons/logo-full.svg"
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import onboard from "../public/assets/images/onboarding-img.png"
import PasskeyModal from "@/components/PasskeyModal";


export default async function Home({searchParams}:SearchParamProps) {
  const isAdmin = await searchParams?.admin === 'true';
  
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal/>}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src = {logo}
            height={1000}
            width={1000}
            alt = "patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm/>
          <div className="text-14-regular mt-5 flex justify-between">
            <Link href = "/login" className="text-green-500">
              Login
            </Link>
            <Link href = "/?admin=true" className="text-green-500">
              Admin
            </Link>
            
          </div>
          <div className="text-14-regular mt-5 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CarePulse
            </p>
          </div>
        </div>
      </section>
      <Image
        src={onboard}
        height={1000}
        width={1000}
        alt = "patient"
        className="side-img max-w-[50%]"
      />

     
    </div>
  );
}
