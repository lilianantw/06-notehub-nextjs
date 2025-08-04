"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;

  return (
    <section className={css.section}>
      <h1 className={css.title}>Notes List</h1>
      {notes?.length > 0 && <NoteList notes={notes} />}
    </section>
  );
}
