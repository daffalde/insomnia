import { useEffect, useState } from "react";
import { database } from "../assets/Client";
import "../style/admin.css";
import { ID } from "appwrite";

export default function User() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  async function getData() {
    setLoading(true);
    try {
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER
      );
      setData(resp.documents);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //   delete
  async function handleDelete(e) {
    try {
      alert("Are you sure to DELETE?");
      await database.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        e
      );
      getData();
    } catch (e) {
      console.error(e);
    }
  }

  //   add
  const [popAdd, setPopAdd] = useState(false);
  const [popEdit, setPopEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [editData, setEditData] = useState();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  async function handleAdd(e) {
    e.preventDefault();
    try {
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        ID.unique(),
        {
          user_email: email,
          user_name: name,
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      window.location.reload();
    }
  }

  async function handleEditShow(e) {
    try {
      const resp = await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        e
      );
      setEditData(resp);
    } catch (e) {
      console.error(e);
    } finally {
      setPopEdit(true);
    }
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        editId,
        {
          user_email: email,
          user_name: name,
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      window.location.reload();
    }
  }
  return (
    <>
      {loading ? (
        <div className="loading2">
          <img src="./loading.svg" alt="loading" />
        </div>
      ) : (
        <>
          <button onClick={() => setPopAdd(true)}>Add</button>
          <br />
          <br />
          <table className="admin-tab">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i} className="user-list">
                  <td>{e.$id}</td>
                  <td>{e.user_name}</td>
                  <td>{e.user_email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditId(e.$id);
                        handleEditShow(e.$id);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(e.$id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* add */}
          {popAdd && (
            <>
              <div
                onClick={() => setPopAdd(false)}
                className="pop-add-bg"
              ></div>
              <div className="pop-add">
                <h2>Input Data</h2>
                <br />
                <form onSubmit={handleAdd}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                  />
                  <br />
                  <br />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                  />
                  <br />
                  <br />
                  <button>Submit</button>
                </form>
              </div>
            </>
          )}

          {/* edit */}
          {popEdit && (
            <>
              <div
                onClick={() => setPopEdit(false)}
                className="pop-add-bg"
              ></div>
              <div className="pop-add">
                <h2>Input Data</h2>
                <br />
                <form onSubmit={handleEdit}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder={editData.user_email}
                  />
                  <br />
                  <br />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder={editData.user_name}
                  />
                  <br />
                  <br />
                  <button>Edit</button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
