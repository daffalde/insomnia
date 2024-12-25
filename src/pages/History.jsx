import { useEffect, useState } from "react";
import "../style/history.css";
import { account, database } from "../assets/Client";
import { Query } from "appwrite";

export default function History() {
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState();
  async function getResult() {
    setLoading(true);
    try {
      const user = await account.get();
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT
      );
      const filtering = resp.documents.filter(
        (e) => e.user[0].user_email === user.email
      );
      setResult(filtering);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getResult();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loading1">
          <img src="./loading.svg" alt="loading" />
        </div>
      ) : (
        <div className="container">
          <h1>History</h1>
        </div>
      )}
    </>
  );
}
