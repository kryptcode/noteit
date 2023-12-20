import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth()

  if(userId) redirect("/notes")

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="logo" width={100} height={100} />
        <span className="text-4xl font-bold tracking-tight lg:text-5xl">
          NoteIt
        </span>
      </div>
      <p className="text-center max-w-prose">
        An intelligent note-taking with AI integration, built with OpenAI,
        Pinecone, Nextjs, Shadcn UI, clerk and more.
      </p>
      <Button size={'lg'} asChild>
        <Link href={'/notes'}>
          Open
        </Link>
      </Button>
    </main>
  );
}
