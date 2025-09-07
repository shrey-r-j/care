import Image from "next/image";
import logo from "../public/assets/icons/logo-full.svg"
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import onboard from "../public/assets/images/onboarding-img.png"


export default function Home() {
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
          <PatientForm/>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CarePulse
            </p>
            <Link href = "/?admin=true" className="text-green-500">
              Admin
            </Link>
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
