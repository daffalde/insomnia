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

  const [result, setResult] = useState([]);
  async function getResult() {
    setLoading(true);
    try {
      const user = await account.get();
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        [Query.limit(500)]
      );
      const filtering = resp.documents.filter(
        (e) => e.user[0].user_email === user.email
      );
      console.log(filtering);
      setResult(filtering);
    } catch (e) {
      console.error(e);
      alert("You must log in to access");
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
  const [klik, setKlik] = useState(null);

  async function kliker(key) {
    console.log("key =", key);
    try {
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        [Query.limit(500)]
      );
      const filteredResp = resp.documents.filter((el) => {
        return el.result_key === key;
      });
      console.log(filteredResp);
      setKlik(filteredResp);
    } catch (e) {
      console.error(e);
    } finally {
      setPop(true);
    }
  }

  const mergedResults = result.reduce((acc, currentItem) => {
    const currentDate = currentItem.result_key;
    const existingItem = acc.find((item) => item.result_key === currentDate);

    if (existingItem) {
      existingItem.kerusakan.push(...currentItem.kerusakan);
      existingItem.solusi.push(...currentItem.solusi);
      existingItem.rule.push(...currentItem.rule);
    } else {
      acc.push({ ...currentItem });
    }
    return acc;
  }, []);

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
            {mergedResults
              .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
              .map((e) => (
                <div
                  onClick={() => kliker(e.result_key)}
                  key={e.result_key}
                  className="h-c-list"
                >
                  <h2>{e.kerusakan[0].kerusakan_name},...</h2>
                  <p>{e.result_key}</p>
                  <br /> <br />
                  <p>{e.user[0].user_email}</p>
                  <p style={{ color: "grey" }}>{e.$createdAt.split("T")[0]}</p>
                </div>
              ))}
          </div>

          <Footer />

          {pop && klik && (
            <>
              <div onClick={() => setPop(false)} className="pop-bg"></div>
              <div className="pop">
                <h2>Detail Gejala</h2>
                {klik.map((e, i) => (
                  <>
                    <div className="klikklik" key={i}>
                      <p style={{ fontSize: "13px", color: "grey" }}>
                        Masalah:
                      </p>
                      <h3>{e.rule[0].rule_gejala}</h3>
                      <br />
                      <p style={{ fontSize: "13px", color: "grey" }}>
                        Kerusakan:
                      </p>
                      <h3>{e.kerusakan[0].kerusakan_name}</h3>
                      <br />
                      <p style={{ fontSize: "13px", color: "grey" }}>Solusi:</p>
                      <p>{e.solusi[0].solusi_name}</p>
                    </div>
                    <br />
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
