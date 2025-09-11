import Image from "next/image";
import logo from "@/public/assets/icons/logo-full.svg"
import Link from "next/link";
import onboard from "@/public/assets/images/appointment-img.png"
import AppointForm from "@/components/forms/AppointmentForm";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image 
            src = {logo}
            height={1000}
            width={1000}
            alt = "patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointForm 
            type = "create"
          />
            <p className="copyright mt-10 py-12">
              © 2025 CarePulse
            </p>
            
          
        </div>
      </section>
      <Image
        src = {onboard}
        height={1000}
        width={1000}
        alt = "patient"
        className="side-img max-w-[390px] bg-bottom"
      />

     
    </div>
  );
}
