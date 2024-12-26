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

  const feature = [
    {
      id: 1,
      image: 1,
      title: "Analisis Tidur Ahli",
      desc: "Analisis canggih bertenaga AI tentang pola dan kebiasaan tidur Anda",
    },
    {
      id: 2,
      image: 2,
      title: "Rencana Perawatan yang Dipersonalisasi",
      desc: "Solusi yang disesuaikan berdasarkan tantangan tidur Anda yang unik",
    },
    {
      id: 3,
      image: 3,
      title: "24/7 Support",
      desc: "Akses sepanjang waktu ke pakar dan sumber daya tidur",
    },
  ];

  const works = [
    {
      id: 1,
      image: 1,
      title: "Assessment",
      desc: "Lengkapi penilaian tidur komprehensif kami",
    },
    {
      id: 2,
      image: 2,
      title: "Analysis",
      desc: "Pakar kami menganalisis pola tidur Anda",
    },
    {
      id: 3,
      image: 3,
      title: "Custom Plan",
      desc: "Dapatkan rencana perawatan yang dipersonalisasi untuk Anda",
    },
    {
      id: 4,
      image: 4,
      title: "Follow-up",
      desc: "Dukungan berkelanjutan dan penyesuaian rencana",
    },
  ];

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
          <div className="head">
            <h1>
              Mengetahui Insomnia
              <br />
              Secara Cepat
            </h1>
            <p>
              Rasakan tidur yang lebih nyenyak dengan sistem pakar kami yang
              dipersonalisasi. Kami menggabungkan <br /> teknologi canggih
              dengan ilmu tidur yang telah terbukti untuk membantu Anda
              beristirahat dengan lebih baik.
            </p>
            <br />
            <button onClick={() => nav("/forum")}>
              Ikuti Sleep Assessment{" "}
            </button>
          </div>
          <div className="head-in"></div>
          <div className="feature">
            {feature.map((e, i) => (
              <div className="f-content" key={i}>
                <img src={`./feature${e.image}.svg`} alt="feature" />
                <h5>{e.title}</h5>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="explain">
            <div className="e-desc">
              <p>
                <b>Insomnia</b> adalah gangguan tidur yang ditandai dengan
                kesulitan untuk tidur atau tetap tertidur, meskipun ada
                kesempatan yang cukup untuk tidur. Penderita insomnia sering{" "}
                <b>merasa</b> lelah pada siang hari, mengalami kesulitan dalam
                berkonsentrasi, dan memiliki masalah memori. <b>Penyebabnya</b>{" "}
                bisa bervariasi, mulai dari stres, kecemasan, depresi, hingga
                kondisi medis tertentu, serta faktor lingkungan seperti
                kebisingan atau cahaya yang berlebihan. <b>Penanganan</b>{" "}
                insomnia biasanya melibatkan perubahan gaya hidup, terapi
                perilaku kognitif, dan dalam beberapa kasus, penggunaan obat
                tidur di bawah pengawasan dokter.
              </p>
              <br />
              <p>
                3 <b>tingkatan</b> insomnia:
              </p>
              <li>Insomnia Ringan</li>
              <li>Insomnia Akut</li>
              <li>Insomnia Kronis</li>
            </div>
            <img src="./explain.jpg" alt="image" />
          </div>
          <div className="works">
            <h2>How it works</h2>
            <p>Empat langkah sederhana untuk tidur lebih nyenyak</p>
            <div className="w-content">
              {works.map((e, i) => (
                <div className="f-content" key={i}>
                  <img src={`./w${e.image}.svg`} alt="works" />
                  <h5>{e.title}</h5>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
