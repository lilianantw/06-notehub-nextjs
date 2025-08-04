import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Replace '1' with the appropriate note ID or fetch multiple notes as needed
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1],
    queryFn: () => fetchNotes(1), // Обов'язково обгортка
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
