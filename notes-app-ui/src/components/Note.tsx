import { Button, Descriptions, Form, Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import type { DescriptionsProps } from "antd";
import { NoteType } from "../pages/NotesAppPage";
import TextArea from "antd/es/input/TextArea";

interface Props {
  id: number;
  title: string;
  content: string;
  note: NoteType;
  deleteNote: (id: number) => void;
  updateNote: (id: number) => void;
  selectedNote: NoteType | undefined;
  setSelectedNote: (selectedNote: NoteType | undefined) => void;
}

const Note: React.FC<Props> = ({
  id,
  title,
  content,
  note,
  deleteNote,
  updateNote,
  selectedNote,
  setSelectedNote,
}) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState<string>("");

  useEffect(() => {
    setSelectedNote({ id: id, title: updatedTitle, content: updatedContent });
  }, [updatedTitle, updatedContent]);

  const noteContent = editable ? (
    <div className="editing-note">
      <Form
        initialValues={{
          content: selectedNote?.content,
        }}
      >
        <Form.Item name="content">
          <TextArea
            rows={3}
            value={selectedNote?.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setUpdatedContent(e.target.value)
            }
          />
        </Form.Item>
      </Form>
      <div className="edit-btns">
        <Button
          icon={<CloseOutlined />}
          onClick={() => {
            setEditable(false);
            setSelectedNote(undefined);
          }}
        />
        <Button
          icon={<CheckOutlined />}
          onClick={() => {
            updateNote(id);
            setEditable(false);
            setSelectedNote(undefined);
          }}
        />
      </div>
    </div>
  ) : (
    <div
      onDoubleClick={() => {
        setEditable(true);
        setSelectedNote(note);
      }}
    >
      {content}
    </div>
  );

  const items: DescriptionsProps["items"] = [
    {
      key: id,
      children: noteContent,
    },
  ];

  const titleEl = editable ? (
    <Form
      initialValues={{
        title: selectedNote?.title,
      }}
    >
      <Form.Item name="title">
        <TextArea
          rows={1}
          value={selectedNote?.title}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            // setSelectedNote({ id: id, title: e.target.value, content: content })
            setUpdatedTitle(e.target.value)
          }
        />
      </Form.Item>
    </Form>
  ) : (
    <div
      className="note-header"
      onDoubleClick={(e) => {
        e.stopPropagation();
        setEditable(true);
        setSelectedNote(note);
      }}
    >
      {title}
      <Button
        style={{ backgroundColor: "transparent" }}
        icon={<CloseOutlined />}
        onClick={() => deleteNote(id)}
      ></Button>
    </div>
  );

  return (
    <Descriptions
      title={titleEl}
      items={items}
      style={{
        border: "1px solid black",
        maxHeight: "300px",
        overflow: "auto",
      }}
      contentStyle={{ margin: "5px" }}
    />
  );
};

export default Note;
