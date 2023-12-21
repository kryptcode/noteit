import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const wasUpdated = note.updateAt > note.createdAt;

  const createUpdateAtTimestamp = (
    wasUpdated ? note.updateAt : note.createdAt
  ).toDateString();

  return (
    <Card>
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
  );
};

export default Note;
