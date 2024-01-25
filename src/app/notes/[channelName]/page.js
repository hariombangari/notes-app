import CreateNotesButton from "@/app/create-button";
import { getNotes } from "@/app/actions";
import Note from "@/app/note";

export default async function Channel({ params }) {
  const notes = await getNotes(params.channelName);
  return (
    <div className="grid grid-cols-6 gap-4">
      <CreateNotesButton channelName={params.channelName} />
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
}
