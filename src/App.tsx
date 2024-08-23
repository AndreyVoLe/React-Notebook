import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import "react-mde/lib/styles/css/react-mde-all.css";
import Split from "react-split";
import Editor from "./components/Editor/Editor";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase";

export interface INotes {
  id: string;
  body?: string;
}

function App() {
  const [notes, setNotes] = useState<INotes[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>(
    notes[0]?.id || ""
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as INotes;
      });
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  async function createNote(): Promise<void> {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    try {
      const docRef = await addDoc(notesCollection, newNote);
      setCurrentNoteId(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async function updateNote(text: string): Promise<void> {
    const noteToUpdate = notes.find((note) => note.id === currentNoteId);
    if (noteToUpdate) {
      const noteDoc = doc(db, "notes", noteToUpdate.id);
      try {
        await setDoc(noteDoc, { body: text });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  }

  async function deleteNote(
    event: React.MouseEvent<HTMLButtonElement>,
    noteId: string
  ): Promise<void> {
    event.stopPropagation();
    const noteDoc = doc(db, "notes", noteId);
    try {
      await deleteDoc(noteDoc);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  function findCurrentNote(): INotes | undefined {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            findCurrentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            createNote={createNote}
            deleteNote={deleteNote}
          />
          <Editor updateNote={updateNote} findCurrentNote={findCurrentNote()} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="create-note" onClick={createNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
