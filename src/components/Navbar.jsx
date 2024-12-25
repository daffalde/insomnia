import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { account } from "../assets/Client";
import { OAuthProvider } from "appwrite";

export default function Navbar() {
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);

  // get user
  const [user, setUser] = useState();
  async function getUser() {
    setLoading(true);
    try {
      const resp = await account.get();
      console.log(resp);
      setUser(resp);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  // login
  async function auth() {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        import.meta.env.VITE_MAIN_URL,
        import.meta.env.VITE_MAIN_URL
      );
    } catch (e) {
      console.error(e);
    }
  }

  // user pop up
  const [popUser, setPopUser] = useState(false);

  // signout

  async function handleOut() {
    try {
      await account.deleteSessions();
    } catch (e) {
      console.error(e);
    } finally {
      window.location.reload();
    }
  }
  return (
    <>
      <div className="navbar">
        <h2
          onClick={() => nav("/")}
          style={{ color: "#5046E4", cursor: "pointer" }}
        >
          Insomnia
        </h2>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/forum"}>Konsultasi</Link>
          </li>
          <li>
            {user ? (
              <div onClick={() => setPopUser(true)} className="n-auth-on">
                <img
                  src="./user.svg"
                  alt="user"
                  width={"22px"}
                  draggable={false}
                />
              </div>
            ) : (
              <div className="n-auth">
                <button onClick={() => auth()}>Masuk</button>
                <Link onClick={() => auth()}>Daftar</Link>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* user */}
      {popUser && (
        <>
          <div onClick={() => setPopUser(false)} className="userr-bg"></div>
          <div className="userr">
            <div className="u-up">
              <div className="n-auth-on">
                <img
                  src="./user.svg"
                  alt="user"
                  width={"22px"}
                  draggable={false}
                />
              </div>
              <span>
                <h5>{user.name}</h5>
                <p>{user.email}</p>
              </span>
            </div>
            <div className="u-down">
              <button onClick={() => nav("/history")}>History</button>
              <button onClick={handleOut}>Sign out</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
