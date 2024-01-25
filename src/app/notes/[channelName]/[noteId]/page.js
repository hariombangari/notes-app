import NoteForm from "@/app/note-form";
import { deleteNotes, getNote, updateNotes } from "@/app/actions";
import { redirect } from "next/navigation";
import { getNotes } from "@/app/actions";

export default async function Note({ params }) {
  const { noteId, channelName } = params;
  const note = await getNote(noteId);
  const onSubmit = async (formData) => {
    "use server";
    const hiddenValue = formData.get("deleteAction");
    if (hiddenValue === "0") {
      await updateNotes(noteId, formData);
    } else {
      await deleteNotes(noteId, channelName);
      redirect(`/notes/${channelName}`);
    }
  };
  if (note === null) {
    return <h1>No note found!</h1>;
  }
  return <NoteForm {...note} action={onSubmit} isUpdateView={true} />;
}

export async function generateStaticParams() {
  const channels = ["hello", "hello123"];
  const promises = channels.map((channel) => getNotes(channel));
  const results = await Promise.all(promises);
  const params = [];
  results.forEach((notes) => {
    notes.forEach((note) => {
      params.push({
        id: note.id,
        channelId: note.channelId,
      });
    });
  });
  return params;
}

export const dynamicParams = true