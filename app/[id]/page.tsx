import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetailsClient";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", Number(params.id)],
    queryFn: () => fetchNoteById(Number(params.id)),
  });

  return <NoteDetailsClient />;
}
