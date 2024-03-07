import { Button, Form, Input } from "antd";

import { NoteType } from "../pages/NotesAppPage";
import React from "react";
import TextArea from "antd/es/input/TextArea";

interface Props {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  addNote: (values: any) => void;
}

const AddNewNote: React.FC<Props> = ({ notes, setNotes, addNote }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    addNote(values);
    form.resetFields();
  };

  return (
    <div className="add-new-container">
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ height: "32vh", width: "400px" }}
        onFinish={onFinish}
      >
        <Form.Item name="title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="content">
          <TextArea rows={10} placeholder="Content" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "250px" }}>
            Add note
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewNote;
