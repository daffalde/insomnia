import { useEffect, useState } from "react";
import { database } from "../assets/Client";
import "../style/admin.css";

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
      await database.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        e
      );
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      {loading ? (
        <div className="loading2">
          <img src="./loading.svg" alt="loading" />
        </div>
      ) : (
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
                  <button onClick={() => handleDelete(e.$id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
