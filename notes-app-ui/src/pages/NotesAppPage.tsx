import React, { useEffect, useState } from "react";

import AddNewNote from "../components/AddNewNote";
import Note from "../components/Note";

export type NoteType = {
  id: number;
  title: string;
  content: string;
};

const NotesAppPage:React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [selectedNote, setSeletedNote] = useState<NoteType>()
  
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/notes");
          const notesArr: NoteType[] = await response.json();
          setNotes(notesArr);
        } catch (error) {
          console.log("error :>> ", error);
        }
      };
      fetchNotes();
    }, []);
  
    const addNote = async (values: any) => {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            content: values.content,
          }),
        });
  
        const newnNote = await response.json();
        setNotes([newnNote, ...notes]);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
  
    const deleteNote = async (id: number) => {
      try {
        await fetch(`http://localhost:5000/api/notes/${id}`, {
          method: "DELETE",
        });
        const updatedNotes: NoteType[] = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
  
    const updateNote = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: selectedNote?.title,
            content: selectedNote?.content,
          }),
        });
  
        const updatedNotes = await response.json()
        setNotes(updatedNotes);  
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
  
    const notesEl = notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        note={note}
        deleteNote={deleteNote}
        updateNote={updateNote}
        selectedNote={selectedNote}
        setSelectedNote={setSeletedNote}
      />
    ));
  
    return (
      <div className="app-container">
        <AddNewNote notes={notes} setNotes={setNotes} addNote={addNote} />
        <div className="notes-grid-container">{notesEl}</div>
      </div>
    );
  };

export default NotesAppPage
