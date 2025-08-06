"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Link from "next/link";

interface NoteDetailsClientProps {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError || !note) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2>Ошибка: заметка не найдена</h2>
        <Link href="/notes" className="text-blue-500 underline">
          ← Назад
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <p className="text-lg text-gray-700 whitespace-pre-wrap">
        {note.content}
      </p>
      <Link href="/notes" className="text-blue-500 underline mt-6 block">
        ← Назад
      </Link>
    </div>
  );
}
