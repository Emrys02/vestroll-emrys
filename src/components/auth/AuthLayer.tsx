import { AuthLayoutProps } from "@/types/interface";
import Link from "next/link";
import Image from "next/image";
import left from "../../../public/images/Left.png";
import mobilelogo from "../../../public/logo/mologo.png";

function AuthLayer({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="md:hidden flex items-center justify-start my-4 mx-4">
        <Image
          src={mobilelogo}
          alt="mobileLogo"
          className="w-10 h-10 -scale-y-100"
        />
      </div>

      {/* Left Side - Hero Section (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 p-4 lg:p-8 h-full w-full">
        <Image src={left} alt="left image" />
      </div>

      <div className="flex h-svh sm:h-screen bg-white relative">
        <div className="relative flex-1 bg-white h-full px-6 pt-28 sm:pt-40.5">
          {children}

          <div className=" hidden md:flex gap-2 justify-between items-center text-base font-medium absolute bottom-20  w-full left-0">
            <p className="text-[#7F8C9F]">&copy; 2025, all rights reserved</p>
            <div className="text-text-header flex items-center gap-2">
              <Link href={""}>Privacy Policy</Link>
              <span className="size-0.5 rounded-full bg-text-header inline-block"></span>
              <Link href={""}>Terms and condition</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayer;
