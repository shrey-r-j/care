import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import loaderIcon from "../public/assets/icons/loader.svg"

interface ButtonProps {
    isLoading:boolean,
    children : React.ReactNode,
    className :string,
}





const SubmitButton = ({isLoading,children,className}:ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
        {isLoading ? (
            <div className='flex items-center gap-4'>
                <Image
                    src = {loaderIcon}
                    height={24}
                    width={24}
                    alt = "loader"
                    className='animate-spin'
                />
            </div>
        ):children}
    </Button>
  )
}

export default SubmitButton