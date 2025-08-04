import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

// Інтерфейс для відповіді на запит нотаток
export interface FetchNotesResponse {
  notes: Note[]; // Масив нотаток
  totalPages: number; // Кількість сторінок
}

// Інтерфейс для даних створення нотатки
export interface CreateNotePayload {
  title: string; // Заголовок
  content: string; // Вміст
  tag: NoteTag; // Тег
}

// Екземпляр axios
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api", // ✅ Убраны пробелы
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// Отримання нотаток
export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    limit: perPage,
  };

  // Додаємо пошук за заголовком
  if (search && search.trim() !== "") {
    params.title = search.trim();
  }

  try {
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return {
      notes: response.data.notes,
      totalPages:
        Math.ceil(Number(response.headers["x-total-count"]) / perPage) || 1,
    };
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
}

// Створення нотатки
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", payload);
  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: number): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}

// Отримання нотатки за ID
export async function fetchNoteById(id: number): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
}
