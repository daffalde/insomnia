import { useEffect, useState } from "react";
import { account, database } from "../assets/Client";
import { ID, Query } from "appwrite";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/forum.css";
import { useNavigate } from "react-router-dom";

export default function Forum() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [forum, setForum] = useState([]);
  const [selectedValues, setSelectedValues] = useState({}); // State untuk menyimpan nilai radio button
  const [isAllSelected, setIsAllSelected] = useState(false); // State untuk memantau apakah semua radio button sudah dipilih
  const [rule, setRule] = useState([]);
  const [user, setUser] = useState("");
  const [result, setResult] = useState();

  async function getForum() {
    setLoading(true);
    try {
      await account.get();
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RULE
      );
      const resp2 = await account.get();
      const resp1 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        [Query.contains("user_email", resp2.email)]
      );
      const resp3 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT
      );
      setResult(resp3.total);
      setUser(resp1.documents[0].$id);
      setForum(resp.documents);
    } catch (e) {
      console.error(e);
      alert("Your must login to access");
      nav("/");
    } finally {
      setLoading(false);
    }
  }

  async function getRule() {
    setLoading(true);
    try {
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_KERUSAKAN
      );
      setRule(resp.documents);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getForum();
    getRule();
  }, []);

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    setSelectedValues((prevState) => {
      const newValues = {
        ...prevState,
        [name]: value === "true", // Mengubah value menjadi boolean
      };

      // Periksa apakah semua radio button sudah dipilih
      const allSelected =
        forum.length > 0 && Object.keys(newValues).length === forum.length;
      setIsAllSelected(allSelected);

      return newValues;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const selectedTrueValues = Object.keys(selectedValues).filter(
      (key) => selectedValues[key] === true
    );
    const list = selectedTrueValues;
    console.log("daftar code gejala", list); //array yang true
    let a = "";
    let b = "";
    let c = "";
    for (let i = 0; i < list.length; i++) {
      if (list[i] === "G1") {
        a = "67774d4d00086d844324";
        b = "67774eb4000706f7412c";
        c = "677744f50004974d29fa";
      } else if (list[i] === "G2") {
        a = "67774d9800249c6a7dd2";
        b = "67774f18000c1a497147";
        c = "67774502000d201d201a";
      } else if (list[i] === "G3") {
        a = "67774d5c0017ca3b498f";
        b = "67774ec300001963a5e7";
        c = "6777450b00164cfaf457";
      } else if (list[i] === "G4") {
        a = "67774d54001500dbfe0e";
        b = "67774ebb003425e4594f";
        c = "6777451a0008e5328e83";
      } else if (list[i] === "G5") {
        a = "67774da8000ee4d47db0";
        b = "67774ee40020856aa863";
        c = "67774524001db6fd0fb2";
      } else if (list[i] === "G6") {
        a = "67774d6500082b215067";
        b = "67774f21003bf303b7df";
        c = "6777452c003abb815475";
      } else if (list[i] === "G7") {
        a = "67774d6c002de5f6da8c";
        b = "67774ed3001bbf337cff";
        c = "6777453500162230df4f";
      } else if (list[i] === "G8") {
        a = "67774de3002c7b1853ea";
        b = "67774eec0003f64244f7";
        c = "677745410015a5b962c6";
      } else if (list[i] === "G9") {
        a = "67774d6500082b215067";
        b = "67774f2b002b21364d77";
        c = "677745470024ce3da921";
      } else if (list[i] === "G10") {
        a = "67774dec002e62a06f14";
        b = "67774ef6000e22a2c664";
        c = "67774550002816bac276";
      } else if (list[i] === "G11") {
        a = "67774dff002ce50e6d2c";
        b = "67774eda003971e5874b";
        c = "6777455d001176cc2e90";
      } else if (list[i] === "G12") {
        a = "67774d5c0017ca3b498f";
        b = "67774ec300001963a5e7";
        c = "6777456500267ca74f7b";
      } else if (list[i] === "G13") {
        a = "67774d4d00086d844324";
        b = "67774eb4000706f7412c";
        c = "6777456f0012dddb43a7";
      } else if (list[i] === "G14") {
        a = "67774d54001500dbfe0e";
        b = "67774ebb003425e4594f";
        c = "67774578001637e090ad";
      } else if (list[i] === "G15") {
        a = "67774d9800249c6a7dd2";
        b = "67774f18000c1a497147";
        c = "6777459200012ed89085";
      } else if (list[i] === "G19") {
        a = "67774d9800249c6a7dd2";
        b = "67774f18000c1a497147";
        c = "677745b40036dd3bc0c7";
      } else if (list[i] === "G16") {
        a = "67774da8000ee4d47db0";
        b = "67774ee40020856aa863";
        c = "67774599000dbc570037";
      } else if (list[i] === "G17") {
        a = "67774e14000f9607719e";
        b = "67774f01003da881da40";
        c = "677745a000395731671a";
      } else if (list[i] === "G18") {
        a = "67774d5c0017ca3b498f";
        b = "67774ec300001963a5e7";
        c = "677745aa0027982e2d19";
      } else {
        console.log("tidak ada kerusakan");
      }
      console.log(a);
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        ID.unique(),
        {
          user: [user],
          kerusakan: [a],
          solusi: [b],
          rule: [c],
          result_key: result + 1,
        }
      );
    }
    nav("/history");
  };

  return (
    <>
      {loading ? (
        <div className="loading1">
          <img src="loading.svg" alt="loading" />
        </div>
      ) : (
        <div className="container">
          <Navbar />
          <div className="navbar-in"></div>
          <h2>Gejala Kerusakan</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <table className="forum">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Gejala</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {forum.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.rule_gejala}</td>
                    <td>
                      <input
                        type="radio"
                        name={`G${i + 1}`}
                        id={`checkTrue${i}`}
                        value="true"
                        onChange={(event) => handleChange(event, i)}
                      />
                      <label htmlFor={`checkTrue${i}`}>Ya</label>
                      <input
                        type="radio"
                        name={`G${i + 1}`}
                        id={`checkFalse${i}`}
                        value="false"
                        onChange={(event) => handleChange(event, i)}
                      />
                      <label htmlFor={`checkFalse${i}`}>Tidak</label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className={`submitt ${isAllSelected ? "submit-on" : ""}`}
              type="submit"
            >
              Submit
            </button>
          </form>
          <Footer />
        </div>
      )}
    </>
  );
}
