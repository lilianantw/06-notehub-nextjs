"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

type NoteListProps = {
  notes: Note[];
};

function NoteList({ notes }: NoteListProps) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <Link href={`/notes/${note.id}`}>View details</Link>
        </li>
      ))}
    </ul>
  );
}
export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error)
    return <p>Could not fetch the list of notes. {(error as Error).message}</p>;

  return (
    <section className={css.section}>
      <h1 className={css.title}>Notes List</h1>
      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes available.</p>
      )}
    </section>
  );
}
