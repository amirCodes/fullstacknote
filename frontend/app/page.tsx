"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { noteAPI } from "../lib/api";
import AddNote from "../components/AddNote";
import NotesList from "../components/NotesLists";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    try {
      setError("");
      const response = await noteAPI.getAllNotes();
      setNotes(response.data.data);
    } catch (error) {
      setError("Failed to fetch notes. Please check if the server is running.");
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(notes);

  const handleNoteAdded = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  //  const handleNoteAdded = (newNote) => {
  //   setNotes([newNote, ...notes]);
  // };

  const handleNoteUpdated = (updatedNote) => {
    setNotes(notes.map(note =>
      note._id === updatedNote._id ? updatedNote : note
    ));
  };

  const handleNoteDeleted = (noteId) => {
    setNotes(notes.filter((note) => note._id !== noteId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <div className="font-sans  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"> */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          My Notes App
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button
              onClick={fetchNotes}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}
        <AddNote onNoteAdded={handleNoteAdded} />

        <NotesList
          notes={notes}
          onNoteUpdated={handleNoteUpdated}
          onNoteDeleted={handleNoteDeleted}
        />
      {/* </main> */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
