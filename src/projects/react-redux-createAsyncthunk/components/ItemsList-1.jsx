import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  deleteItem,
  fetchItems,
  selectError,
  selectItems,
  selectStatus,
  updateItem,
} from "../redux-store/itemsSlice-2";

export function ItemsList() {
  const inputRef = useRef();
  const [editMode, setEditMode] = useState(null);
  const dispatch = useDispatch();
  // Access the Redux state
  const items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  console.log(items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const addItem = () => {
    // console.log(inputRef.current.value);
    dispatch(createItem({ name: inputRef.current.value }));
    inputRef.current.value = null;
  };
  const removeItem = (id) => dispatch(deleteItem(id));

  const editItem = (item) => {
    inputRef.current.value = item.name;
    setEditMode(item);
  };

  const submitEdit = () => {
    dispatch(updateItem({ id: editMode.id, name: inputRef.current.value }));
    inputRef.current.value = null;
  };

  // Fetch items on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  // Render based on loading state
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <input type="text" placeholder="Enter a text" ref={inputRef} />
      {editMode !== null ? (
        <button onClick={submitEdit}>Edit Item</button>
      ) : (
        <button onClick={addItem}>Add Item</button>
      )}

      {items.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => removeItem(item.id)}>Delete</button>
          <button onClick={() => editItem(item)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
