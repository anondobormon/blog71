import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/userAction";

export default function Res123() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    let newData = new FormData();
    newData.set("name", name);
    newData.set("file", file);

    dispatch(register(newData));
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.name)}
          type="text"
          name=""
          id=""
        />
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name=""
          id=""
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
