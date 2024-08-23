import ReactMde from "react-mde";
import Showdown from "showdown";
import { useState } from "react";
import { Converter } from "showdown";
import { INotes } from "../../App";

interface IEditor {
  updateNote: (text: string) => void;
  findCurrentNote: INotes | undefined;
}

function Editor(props: IEditor) {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const converter: Converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="container">
      <ReactMde
        value={props.findCurrentNote?.body}
        onChange={props.updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

export default Editor;
