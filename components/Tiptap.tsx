import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import {
  IconRteBold,
  IconRteH2,
  IconRteH3,
  IconRteItalic,
  IconRteLink,
  IconRteListOrdered,
  IconRteListUnordered,
} from "./Icons";
import { getReadingTime } from "../utils/getReadingTime";

const MenuBar = ({ editor }: any) => {
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-buttons">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <IconRteH2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <IconRteH3 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <IconRteBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <IconRteItalic />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <IconRteLink />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <IconRteListUnordered />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <IconRteListOrdered />
      </button>
    </div>
  );
};

type PropValues = {
  body: string;
  onChange: (html: string) => void;
  setValue: any;
};

export const Tiptap = ({ body, onChange, setValue }: PropValues) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      CharacterCount,
    ],
    content: ``,
    onUpdate({ editor }) {
      let readingTime = getReadingTime(editor.storage.characterCount.words());
      setValue("readingTime", readingTime);

      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && body === "") {
      editor.commands?.clearContent();
    }
  }, [body, editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
