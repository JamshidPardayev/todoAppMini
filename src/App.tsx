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


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !desc) return;
    console.log("ok");

    const newInfo: InfoType = {
      id: Date.now(),
      title,
      desc,
    };
    setItems([...items, newInfo]);
    setTitle("");
    setDesc("");
  };
  const handleDelete = (id: number) => {
    const filter = items.filter((item) => item.id !== id);
    setItems(filter);
  };

  return (
    <div>
      <form
        action=""
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
          create
        </button>
      </form>
      <div className="flex gap-3 flex-wrap max-w-[1200px] mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-2 flex flex-col gap-2 text-center rounded"
          >
            <h2 className="text-[18px] font-semibold">{item?.title}</h2>
            <p className="text-[15px]">{item?.desc}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 w-full py-1 text-white rounded px-2 duration-300 cursor-pointer hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
