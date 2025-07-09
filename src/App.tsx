import { useState, type FormEvent } from "react";

type InfoType = {
  id: number;
  title: string;
  desc: string;
};

const App = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [items, setItems] = useState<InfoType[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !desc) return;

    if (editId !== null) {
      const updatedItems = items.map((item) =>
        item.id === editId ? { ...item, title, desc } : item
      );
      setItems(updatedItems);
      setEditId(null); 
    } else {
      const newInfo: InfoType = {
        id: Date.now(),
        title,
        desc,
      };
      setItems([...items, newInfo]);
    }

    setTitle("");
    setDesc("");
  };

  const handleDelete = (id: number) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
    if (editId === id) {
      setEditId(null);
      setTitle("");
      setDesc("");
    }
  };

  const handleEdit = (item: InfoType) => {
    setTitle(item.title);
    setDesc(item.desc);
    setEditId(item.id);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-4 max-w-[600px] mx-auto"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border outline-none px-2 py-1 rounded"
          placeholder="Create Title"
          required
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          className="border outline-none px-2 py-1 rounded"
          placeholder="Create Description"
          required
        />
        <button className="bg-blue-500 text-white rounded py-1 hover:bg-blue-700 cursor-pointer duration-300">
          {editId !== null ? "Update" : "Create"}
        </button>
      </form>

      <div className="flex gap-3 flex-wrap max-w-[1200px] mx-auto mt-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-3 flex flex-col gap-2 text-center rounded w-[250px]"
          >
            <h2 className="text-[18px] font-semibold">{item.title}</h2>
            <p className="text-[15px]">{item.desc}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-500 flex-1 py-1 text-white rounded duration-300 hover:bg-green-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 flex-1 py-1 text-white rounded duration-300 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
