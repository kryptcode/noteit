import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata : Metadata = {
  title: "NoteIt - Sign Up"
}


const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
        <SignUp appearance={{ variables: { colorPrimary: '#0F172A' } }} />
    </div>
  )
}

export default Page