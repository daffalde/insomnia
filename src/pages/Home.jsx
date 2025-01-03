import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../style/home.css";
import Footer from "../components/Footer";
import { account } from "../assets/Client";
import { OAuthProvider } from "appwrite";
import { useEffect, useState } from "react";

export default function Home() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  // get user
  async function getUser() {
    setLoading(true);
    try {
      const resp = await account.get();
      console.log(resp);
    } catch (e) {
      null;
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  const fitur = [
    {
      id: 1,
      image: "1",
      title: "Diagnosa Otomatis",
      desc: "Mendeteksi dan mendiagnosa masalah handphone secara otomatis dengan cepat dan akurat.",
    },
    {
      id: 2,
      image: "2",
      title: "Rekomendasi Perbaikan",
      desc: "Memberikan solusi perbaikan yang sesuai berdasarkan hasil diagnosa, termasuk panduan langkah demi langkah.",
    },
    {
      id: 3,
      image: "3",
      title: "Pelacakan Kerusakan",
      desc: "Melacak riwayat kerusakan dan perbaikan handphone untuk mencegah masalah berulang.",
    },
    {
      id: 4,
      image: "4",
      title: "Dukungan Teknis 24/7",
      desc: "Akses ke dukungan teknis yang siap membantu kapan saja.",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="loading1">
          <img src="loading.svg" alt="loading" />
        </div>
      ) : (
        <>
          <div className="container">
            <Navbar />
            <div className="navbar-in"></div>
            <div className="first">
              <div className="first-in">
                <div className="f-left">
                  <h1
                    style={{
                      fontSize: "40px",
                      borderBottom: "1px solid #444444",
                      paddingBottom: "10px",
                    }}
                  >
                    Jalur pintar untuk perbaikan handphone yang mudah
                  </h1>
                  <br />
                  <p>
                    Program online yang membantu Anda mencapai tujuan perbaikan
                    handphone Anda melalui teknologi modern dan perawatan yang
                    dipersonalisasi.
                  </p>
                  <br />
                  <li>Kuis dan konsultasi online</li>
                  <li>Perbaikan terbukti, dikirimkan gratis</li>
                  <li>Teknisi dan dukungan teknis</li>
                  <br />
                  <button onClick={() => nav("/forum")}>Take the quiz</button>
                </div>
                <div className="f-right">
                  <img src="./first.jpg" alt="image" />
                </div>
              </div>
            </div>
            <div className="first-out"></div>
            {/* ______________________________________ */}
            <div className="second">
              <div className="second-in">
                <div className="s-left">
                  <img src="./second.jpg" alt="image" />
                </div>
                <div className="s-right">
                  <h2 style={{ fontSize: "35px", fontWeight: "500" }}>
                    Program Reset Handphone
                  </h2>
                  <br />
                  <p>
                    Mengatasi kerusakan pada tingkat seluler untuk membantu Anda{" "}
                    <b>memperbaiki handphone Anda dalam waktu singkat.</b>
                  </p>
                  <br />
                  <p>
                    Sistem yang diresepkan oleh teknisi kami, ketika
                    dikombinasikan dengan perubahan gaya hidup, dianggap sebagai
                    yang <b>paling aman dan paling efektif</b> untuk perbaikan
                    handphone jangka panjang.
                  </p>
                  <br />
                  <br />
                  <div className="s-r-button">
                    <button onClick={() => nav("/forum")}>Take the quiz</button>
                    <button onClick={() => nav("/")}>Learn more</button>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="second-in2">
                {fitur.map((e, i) => (
                  <div key={i} className="s-fitur">
                    <img src={`./${e.image}.svg`} alt="image" width={"50px"} />
                    <h5>{e.title}</h5>
                    <p>{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="second-out"></div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
