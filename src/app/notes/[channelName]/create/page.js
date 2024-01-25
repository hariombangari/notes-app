import NoteForm from "@/app/note-form";
import { createNote } from "@/app/actions";

export default function Create({ params }) {
  const { channelName } = params;
  const onSubmit = createNote.bind(null, channelName);
  return <NoteForm action={onSubmit} />;
}
