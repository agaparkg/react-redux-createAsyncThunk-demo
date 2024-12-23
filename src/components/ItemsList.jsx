import { useRef, useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import {
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
} from "../redux-store/itemsApi";

export function ItemsList() {
  const inputRef = useRef();
  const [editMode, setEditMode] = useState(null);

  const { data: items, error, isLoading } = useGetItemsQuery();

  const [createItem] = useCreateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const addItem = async () => {
    if (inputRef.current.value) {
      await createItem({ name: inputRef.current.value });
      inputRef.current.value = null;
    } else {
      alert("Enter new item name.");
    }
  };

  const removeItem = async (id) => deleteItem(id);

  const editItem = (item) => {
    inputRef.current.value = item.name;
    setEditMode(item);
  };

  const submitEdit = async () => {
    await updateItem({ id: editMode.id, name: inputRef.current.value });
    inputRef.current.value = null;
    setEditMode(null);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <InputGroup>
        <Input
          onChange={() => {}}
          placeholder="Enter a text"
          innerRef={inputRef}
        />
        {editMode !== null ? (
          <Button onClick={submitEdit}>Edit Item</Button>
        ) : (
          <Button onClick={addItem}>Add Item</Button>
        )}
      </InputGroup>

      <div className="mt-4">
        {items.map((item) => (
          <div key={item.id}>
            <InputGroup className="my-1">
              <Input disabled value={item.name} />
              <Button color="danger" onClick={() => removeItem(item.id)}>
                Delete
              </Button>
              <Button onClick={() => editItem(item)}>Edit</Button>
            </InputGroup>
          </div>
        ))}
      </div>
    </div>
  );
}
