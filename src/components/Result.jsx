import { useEffect, useState } from "react";
import { database } from "../assets/Client";
import "../style/admin.css";
import { ID, Query } from "appwrite";

export default function Result() {
  const [loading, setLoading] = useState(true);

  //   data
  const [tier, setTier] = useState();
  const [user, setUser] = useState();
  const [kerusakan, setKerusakan] = useState();
  const [solusi, setSolusi] = useState();

  const [data, setData] = useState();
  async function getData() {
    setLoading(true);
    try {
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        [Query.limit(100)]
      );
      const resp1 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RULE
      );
      const resp2 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER
      );
      const resp3 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_KERUSAKAN
      );
      const resp4 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_SOLUSI
      );

      setTier(resp1.documents);
      setUser(resp2.documents);
      setKerusakan(resp3.documents);
      setSolusi(resp4.documents);
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
      alert("Are you sure to Delete?");
      await database.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        e
      );
      getData();
    } catch (e) {
      console.error(e);
    }
  }

  //   add
  const [popAdd, setPopAdd] = useState(false);

  const [tierr, setTierr] = useState();
  const [userr, setUserr] = useState();
  const [kerusakann, setKerusakann] = useState();
  const [solusii, setSolusii] = useState();
  async function handleAddd(e) {
    e.preventDefault();
    try {
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        ID.unique(),
        {
          kerusakan: [kerusakann],
          solusi: [solusii],
          rule: [tierr],
          user: [userr],
          result_key: data.length + 1,
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      getData();
    }
  }

  //   edit
  const [popEdit, setPopEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [editId, setEditId] = useState();

  async function showEdit(e) {
    try {
      const resp = await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        e
      );
      console.log(resp);
      setEditData(resp);
      setEditId(e);
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
        import.meta.env.VITE_APPWRITE_RESULT,
        editId,
        {
          kerusakan: [kerusakann],
          solusi: [solusii],
          rule: [tierr],
          user: [userr],
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
                <th>User</th>
                <th>Kerusakan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i} className="user-list">
                  <td>{e.$id}</td>
                  <td>{e.user[0].user_email}</td>
                  <td>{e.kerusakan[0].kerusakan_name}</td>
                  <td>
                    <button onClick={() => showEdit(e.$id)}>Edit</button>
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
                <form onSubmit={handleAddd}>
                  <p style={{ color: "grey", fontSize: "13px" }}>Kondisi : </p>
                  <select onChange={(e) => setTierr(e.target.value)}>
                    <option value="#">Select Kondisi</option>
                    {tier.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.rule_gejala}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <p style={{ color: "grey", fontSize: "13px" }}>
                    Kerusakan :{" "}
                  </p>
                  <select onChange={(e) => setKerusakann(e.target.value)}>
                    <option value="#">Select Kerusakan</option>
                    {kerusakan.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.kerusakan_name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <p style={{ color: "grey", fontSize: "13px" }}>Solusi : </p>
                  <select onChange={(e) => setSolusii(e.target.value)}>
                    <option value="#">Select Solusi</option>
                    {solusi.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.solusi_name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <p style={{ color: "grey", fontSize: "13px" }}>User : </p>
                  <select onChange={(e) => setUserr(e.target.value)}>
                    <option value="#">Select User</option>
                    {user.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.user_email}
                      </option>
                    ))}
                  </select>
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
                  <p style={{ color: "grey", fontSize: "13px" }}>
                    Kondisi : {editData.rule[0].rule_gejala}
                  </p>
                  <select onChange={(e) => setTierr(e.target.value)}>
                    <option value="#">Select Kondisi</option>
                    {tier.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.rule_gejala}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <p style={{ color: "grey", fontSize: "13px" }}>
                    Kerusakan : {editData.kerusakan[0].kerusakan_name}
                  </p>
                  <select onChange={(e) => setKerusakann(e.target.value)}>
                    <option value="#">Select Kerusakan</option>
                    {kerusakan.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.kerusakan_name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <p style={{ color: "grey", fontSize: "13px" }}>
                    Solusi : {editData.solusi[0].solusi_name}
                  </p>
                  <select onChange={(e) => setSolusii(e.target.value)}>
                    <option value="#">Select Solusi</option>
                    {solusi.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.solusi_name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <p style={{ color: "grey", fontSize: "13px" }}>
                    User : {editData.user[0].user_email}
                  </p>
                  <select onChange={(e) => setUserr(e.target.value)}>
                    <option value="#">Select User</option>
                    {user.map((e, i) => (
                      <option value={e.$id} key={i}>
                        {e.user_email}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <button>Submit</button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
