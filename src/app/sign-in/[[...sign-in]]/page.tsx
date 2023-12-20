import { SignIn } from "@clerk/nextjs"


const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
        <SignIn appearance={{ variables: { colorPrimary: '#0F172A' } }} />
    </div>
  )
}

export default Page