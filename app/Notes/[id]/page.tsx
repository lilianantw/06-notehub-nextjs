import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetailsClient";
import { notFound } from "next/navigation";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const noteId = parseInt(id, 10);

  if (!id || isNaN(noteId) || noteId < 1) {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    const note = await fetchNoteById(noteId);
    if (!note || !note.id) {
      notFound();
    }

    await queryClient.prefetchQuery({
      queryKey: ["note", noteId],
      queryFn: () => Promise.resolve(note),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
