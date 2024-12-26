import { useEffect, useState } from "react";
import "../style/history.css";
import { account, database } from "../assets/Client";
import { Query } from "appwrite";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

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
      console.log(filtering);
      setResult(filtering);
    } catch (e) {
      console.error(e);
      alert("You must loggin to access");
      nav("/");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getResult();
  }, []);

  // pop up
  const [pop, setPop] = useState(false);
  const [klik, setKlik] = useState();

  async function kliker(e) {
    try {
      const resp = await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        e
      );
      setKlik(resp);
    } catch (e) {
      console.error(e);
    } finally {
      setPop(true);
    }
  }
  return (
    <>
      {loading ? (
        <div className="loading1">
          <img src="./loading.svg" alt="loading" />
        </div>
      ) : (
        <div className="container">
          <Navbar />
          <div className="navbar-in"></div>
          <h2>History</h2>
          <br />
          <div className="h-content">
            {result.map((e, i) => (
              <div onClick={() => kliker(e.$id)} key={i} className="h-c-list">
                <h2>{e.tier[0].tier_name}</h2>
                <br />
                <br />
                <p>{e.user[0].user_email}</p>
                <p style={{ color: "grey" }}>{e.$createdAt.split("T")[0]}</p>
              </div>
            ))}
          </div>
          <Footer />

          {pop && (
            <>
              <div onClick={() => setPop(false)} className="pop-bg"></div>
              <div className="pop">
                <h2>Detail Gejala</h2>
                <p style={{ color: "grey" }}>{klik.$createdAt.split("T")[0]}</p>
                <br />
                <br />
                <p style={{ fontSize: "13px", color: "grey" }}>Tingkat:</p>
                <h3>{klik.tier[0].tier_name}</h3>
                <br />
                <p style={{ fontSize: "13px", color: "grey" }}>Penjelasan:</p>
                <p>{klik.tier[0].tier_desc}</p>
                <br />
                <p style={{ fontSize: "13px", color: "grey" }}>Penanganan:</p>
                <p>{klik.tier[0].tier_advice}</p>
                <br />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
