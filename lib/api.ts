import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api", // ✅ без пробелов
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// export const fetchNotes = async (page = 1, search = "") => {
//   const response = await api.get<FetchNotesResponse>("/notes", {
//     params: { page, ...(search && { search }) },
//   });
//   return response.data;
// };

// Отримання всіх нотаток (без пагінації — по завданню)
export async function fetchNotes(): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes");
  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
