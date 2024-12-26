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

  async function getForum() {
    setLoading(true);
    try {
      await account.get();
      const resp = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RULE
      );
      console.log(resp.documents);
      setForum(resp.documents);
    } catch (e) {
      console.error(e);
      alert("Your must login to access");
      nav("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getForum();
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

  const determineInsomniaLevel = (selectedTrueValues) => {
    // Definisikan aturan dan gejala yang sesuai
    const rules = {
      "Rule 1": { codes: ["G1", "G2", "G3", "G4"], level: "T01" },
      "Rule 2": {
        codes: ["G1", "G2", "G5", "G7", "G8", "G9"],
        level: "T02",
      },
      "Rule 3": {
        codes: ["G1", "G2", "G7", "G9", "G10", "G11", "G12", "G13"],
        level: "T03",
      },
    };

    // Inisialisasi hitungan untuk masing-masing aturan
    const ruleCounts = { "Rule 1": 0, "Rule 2": 0, "Rule 3": 0 };

    // Iterasi melalui selectedTrueValues
    selectedTrueValues.forEach((value) => {
      for (const rule in rules) {
        if (rules[rule].codes.includes(value)) {
          ruleCounts[rule] += 1;
        }
      }
    });

    // Tentukan aturan dengan jumlah nilai true terbanyak
    let dominantRule = null;
    let maxCount = 0;
    for (const rule in ruleCounts) {
      if (ruleCounts[rule] > maxCount) {
        maxCount = ruleCounts[rule];
        dominantRule = rule;
      }
    }

    // Kembalikan tingkatan dari aturan dominan
    return dominantRule ? rules[dominantRule].level : "Tidak ditemukan";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const selectedTrueValues = Object.keys(selectedValues).filter(
      (key) => selectedValues[key] === true
    );
    console.log(selectedTrueValues);
    const insomniaLevel = determineInsomniaLevel(selectedTrueValues);

    console.log(selectedTrueValues);
    console.log("Tingkat Keparahan Insomnia:", insomniaLevel);

    try {
      const resp = await account.get();
      const cek1 = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_USER,
        [Query.contains("user_email", resp.email)]
      );
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE,
        import.meta.env.VITE_APPWRITE_RESULT,
        ID.unique(),
        {
          tier: [
            insomniaLevel == "T01"
              ? "676b9164000b9a03d2bd"
              : insomniaLevel == "T02"
              ? "676b91970021c4e078ec"
              : "676b91b4002d5dae8120",
          ],
          user: [cek1.documents[0].$id],
        }
      );
    } catch (e) {
      console.error();
    } finally {
      nav("/history");
      setLoading(false);
    }
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
          <h2>Diagnosa Penyakit Insomnia</h2>
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
