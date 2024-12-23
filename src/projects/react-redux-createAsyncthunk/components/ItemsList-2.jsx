import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  deleteItem,
  fetchItems,
  selectError,
  selectItems,
  selectLoading,
  selectStatus,
  updateItem,
} from "../redux-store/itemsSlice-2";

export function ItemsList() {
  const dispatch = useDispatch();
  // Access the Redux state
  const items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const addItem = () => dispatch(createItem({ name: "New Item" }));
  const removeItem = (id) => dispatch(deleteItem(id));
  const editItem = (id) => dispatch(updateItem({ id, name: "Updated Item" }));

  // Fetch items on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  // Render based on loading state
  if (loading.fetch) return <p>Loading...</p>;

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      {items.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => removeItem(item.id)}>Delete</button>
          <button onClick={() => editItem(item.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
