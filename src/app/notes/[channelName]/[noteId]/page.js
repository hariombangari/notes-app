import NoteForm from "@/app/note-form";
import { deleteNotes, getNote, updateNotes } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Note({ params }) {
  const {noteId, channelName} = params;
  const note = await getNote(noteId);
  const onSubmit = async (formData) => {
    'use server'
    const hiddenValue = formData.get("deleteAction");
    if(hiddenValue === '0') {
      await updateNotes(noteId, formData)
    } else {
      await deleteNotes(noteId, channelName)
      redirect(`/notes/${channelName}`)
    }
  }
  if(note === null) {
    return <h1>No note found!</h1>
  }
  return <NoteForm {...note} action={onSubmit} isUpdateView={true} />;
}
