import { Button, Modal } from 'antd';
import { ChangeEvent, useState } from 'react';
import { ThreadForm } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import useUser from '../hooks/useUser';
import { doc, setDoc } from "firebase/firestore";
import { hobbyDb } from '../firebase/firebaseConfig';

const ThreadModal = () => {

  const { appUser } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thread, setThread] = useState<ThreadForm>({
    title: "",
    content: "",
    category: "Games",
    appUser: appUser?.uid as string
  })

  const categories: string[] = ["Games", "Movies", "TV", "Gym"];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    await setDoc(doc(hobbyDb, "Threads", uuidv4()), thread);
    setIsModalOpen(false);
    setThread({
      ...thread,
      title: "",
      content: "",
      category: "Games",
    })
    setTimeout(() => {
      alert("Thread created!")
    }, 500);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setThread(({
      ...thread,
      title: "",
      content: "",
      category: "Games",
    })
    )
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    setThread({ ...thread, [e.target.name]: e.target.value });
  }

  return (
    <article>
      <Button type="primary"
        onClick={showModal}
        style={{backgroundColor: "#FFC107", marginTop: "56px"}}
      >
        Create New Thread
      </Button>
      <Modal title="New Thread" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
        <label
          className='mb-2 block'
          htmlFor='title'
        >
          Title
        </label>
        <input
          className="h-10 w-96 border-2 px-2 mb-5"
          id='title'
          type="text"
          name="title"
          placeholder="Title"
          value={thread.title}
          onChange={handleChange}
        />
        <label
          className='mb-2 block'
          htmlFor='content'
        >
          Content
        </label>
        <textarea
          id='content'
          name='content'
          className='w-full h-96 px-2 py-2 border-2 mb-2'
          placeholder='Type content here...'
          value={thread.content}
          onChange={handleChange}
        />
        <label
          className='mb-2 block'
          htmlFor='category'
        >
          Category
        </label>
        <select
          id='category'
          name='category'
          className='px-2 py-2 border-2'
          value={thread.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
        </select>
      </Modal>
    </article>
  );
};

export default ThreadModal;