"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialog from "@/components/AddEditNoteDialog";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes";

const Navbar = () => {
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const { theme } = useTheme()

  return (
    <>
      <div className="p-4 shadow ">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href={"/notes"} className="flex items-center gap-1">
            <Image src={logo} alt="Logo" width={40} height={40} />
            <span className="font-medium">NoteIt</span>
          </Link>
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: { width: "2.5rem", height: "2.5rem" },
                },
              }}
            />
            <ThemeToggleButton />
            <Button onClick={() => setShowAddNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>
      <AddEditNoteDialog
        open={showAddNoteDialog}
        setOpen={setShowAddNoteDialog}
      />
    </>
  );
};

export default Navbar;
