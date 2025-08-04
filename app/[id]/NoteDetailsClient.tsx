"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams();
  const noteId = Number(id);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId && !isNaN(noteId),
  });

  if (!noteId || isNaN(noteId)) {
    return <p>Something went wrong.</p>;
  }

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt.slice(0, 10)}</p>
      </div>
    </div>
  );
}
