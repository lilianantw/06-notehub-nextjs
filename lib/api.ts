import axios from "axios";
import type { Note, NoteTag } from "../types/note";

// Інтерфейс для відповіді на запит нотаток
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Інтерфейс для даних створення нотатки
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

// Екземпляр axios
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// Отримання всіх нотаток (без пагінації — по завданню)
export async function fetchNotes(): Promise<Note[]> {
  const response = await api.get<Note[]>("/notes");
  return response.data;
}

// Створення нотатки
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: number): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

// Отримання нотатки за ID
export async function fetchNoteById(id: number): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
