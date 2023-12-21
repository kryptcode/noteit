"use client"
import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const wasUpdated = note.updateAt > note.createdAt;

  const createUpdateAtTimestamp = (
    wasUpdated ? note.updateAt : note.createdAt
  ).toDateString();

  return (
  <>
    <Card className="cursor-pointer hover:shadow-lg transition-shadow " onClick={() => setShowEditDialog(true)}>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          {createUpdateAtTimestamp} {wasUpdated && " (updated)"}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{note.content}</p>
      </CardContent>
    </Card>
    <AddEditNoteDialog 
      open={showEditDialog}
      setOpen={setShowEditDialog}
      noteToEdit={note}
    />
  </>
  );
};

export default Note;
