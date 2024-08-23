import { INotes } from "../../App";
import React from "react";
interface ISidebar {
  notes: INotes[];
  findCurrentNote: INotes | undefined;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>;
  createNote: () => void;
  deleteNote: (
    event: React.MouseEvent<HTMLButtonElement>,
    noteId: string
  ) => void;
}

function Sidebar(props: ISidebar) {
  const noteElements = props.notes.map((note) => {
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === props.findCurrentNote?.id ? "selected-note" : ""
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">
            {note.body?.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h4>
          <button
            className="delete-btn"
            onClick={(event) => props.deleteNote(event, note.id)}
          >
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    );
  });
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.createNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

export default Sidebar;
