import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Header from "./components/Header";


const App = () => {
  const [items, setItems] = useState([]);
  const newAlerts2 = [...items];
  newAlerts2.sort((a, b) => (a.itemdate - b.itemdate));
  const newAlerts = newAlerts2.slice(0,3)
  const [addFormData, setAddFormData] = useState({
    itemname: "",
    itemquantity: "",
    itemdate: "",
  });

  const [editFormData, setEditFormData] = useState({
    itemname: "",
    itemquantity: "",
    itemdate: "",
  });

  const [editItemId, setEditItemId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: nanoid(),
      itemname: addFormData.itemname,
      itemquantity: addFormData.itemquantity,
      itemdate: addFormData.itemdate,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      id: editItemId,
      itemname: editFormData.itemname,
      itemquantity: editFormData.itemquantity,
      itemdate: editFormData.itemdate,
    };

    const newItems = [...items];

    const index = items.findIndex((item) => item.id === editItemId);

    newItems[index] = editedItem;

    setItems(newItems);
    setEditItemId(null);
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      itemname: item.itemname,
      itemquantity: item.itemquantity,
      itemdate: item.itemdate,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditItemId(null);
  };

  const handleDeleteClick = (itemId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === itemId);

    newItems.splice(index, 1);

    setItems(newItems);
  };

  const handleSortDateClick = () =>{
    const newItems = [...items];
    newItems.sort((a, b) => (a.itemdate - b.itemdate));
    setItems(newItems);
  }

  const handleReverseSortDateClick = () =>{
    const newItems = [...items];
    newItems.sort((a, b) => (b.itemdate - a.itemdate));
    setItems(newItems);
  }

  const handleSortQuantityClick = () =>{
    const newItems = [...items];
    newItems.sort((a, b) => (a.itemquantity - b.itemquantity));
    setItems(newItems);
  }

  const handleReverseSortQuantityClick = () =>{
    const newItems = [...items];
    newItems.sort((a, b) => (b.itemquantity - a.itemquantity));
    setItems(newItems);
  }

  const handleSortNameClick = () =>{
    const newItems = [...items];
    newItems.sort((a, b) => (a.itemname.localeCompare(b.itemname)));
    setItems(newItems);
  }

  const handleReverseSortNameClick = () =>{
    const newItems = [...items];
    newItems.sort((a, b) => (b.itemname.localeCompare(a.itemname)));
    setItems(newItems);
  }

  return (
    <div className="app-container">
      <Header></Header>
      <strong style={{ fontSize:25 }}>FOOD IS EXIPRING!!!</strong>
      <table className="blueTable">
        <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Expiry Date</th>
        </tr>
        </thead>
        <tbody>
          {newAlerts.map((alert,index) => (
            <tr key = {alert.itemname}>
              <td>{alert.itemname}</td>
              <td>{alert.itemquantity}</td>
              <td>{alert.itemdate}</td>
            </tr> 
          ))}
        </tbody>
      </table>
      <h1>Add an item!</h1>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="itemname"
          required="required"
          placeholder="Enter an item..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="itemquantity"
          required="required"
          placeholder="Enter quantity..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="itemdate"
          required="required"
          placeholder="Expiry date:YYYYMMDD"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Item
              <strong type="button" style={{ fontSize: 18 }} onClick={() => handleSortNameClick()}>🔼</strong>
              <strong type="button" style={{ fontSize: 18 }} onClick={() => handleReverseSortNameClick()}>🔽</strong>
              </th>
              <th>Quantity
                <strong type="button" style={{ fontSize: 18 }} onClick={() => handleSortQuantityClick()}>🔼</strong>
                <strong type="button" style={{ fontSize: 18 }} onClick={() => handleReverseSortQuantityClick()}>🔽</strong>
              </th>
              <th>Expiry Date 
                <strong type="button" style={{ fontSize: 18 }} onClick={() => handleSortDateClick()}>🔼</strong>
                <strong type="button" style={{ fontSize: 18 }} onClick={() => handleReverseSortDateClick()}>🔽</strong>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Fragment>
                {editItemId === item.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    item={item}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
