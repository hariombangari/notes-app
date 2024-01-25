"use server";

import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import * as redis from "./redis";

export const createChannel = async (formData) => {
  const channelName = formData.get("channelName");
  redirect(`/notes/${channelName}`);
};

export const createNote = async (channelName, formData) => {
  const noteId = uuid();
  const timeNow = Date.now();
  const note = {
    title: formData.get("title"),
    content: formData.get("note"),
    id: noteId,
    channelId: channelName,
    createdTime: timeNow,
    updatedTime: timeNow,
    archived: false,
    masked: false,
    pinned: false,
  };
  await redis.set(`notes:${noteId}`, note)
  revalidatePath(`/notes/${channelName}`)
  redirect(`/notes/${channelName}`);
};

export const getNotes = async (channelId, term) => {
  console.log("get all notes", channelId);
  const response = await redis.search("idx:notes", `@channelId:{${channelId}}`)
  const results = response.documents.map((document) => document.value);
  // console.log("get all notes result", results);
  return results.filter((note) => note.archived === 'false');
};

export const navigate = async (channelId, noteId) => {
  redirect(`/notes/${channelId}/${noteId}`);
}

export const deleteNotes = async (noteId, channelName) => {
  await redis.del(`notes:${noteId}`);
  revalidatePath(`/notes/${channelName}`)
  revalidatePath(`/notes/${channelName}/${noteId}`)
};

export const getNote = async (noteId) => {
  console.log("get note", noteId);
  const result = await redis.get(`notes:${noteId}`)
  if(Object.keys(result).length) {
    return result;
  }
  return null;
};

export const updateNotes = async (noteId, formData) => {
  const note = await redis.get(`notes:${noteId}`)
  note.content = formData.get("note");
  note.title = formData.get("title");
  await redis.set(`notes:${noteId}`, note)
  revalidatePath(`/notes/${note.channelId}`)
  revalidatePath(`/notes/${note.channelId}/${noteId}`)
  redirect(`/notes/${note.channelId}`)
};
