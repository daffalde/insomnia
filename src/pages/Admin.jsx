import { useEffect, useState } from "react";
import { account, database } from "../assets/Client";
import { useNavigate } from "react-router-dom";
import "../style/admin.css";
import Result from "../components/Result";
import User from "../components/User";

export default function Admin() {
  const nav = useNavigate();
  // cek admin
  const [user, setUser] = useState();
  async function cek() {
    try {
      const resp = await account.get();
      if (resp.email !== import.meta.env.VITE_ADMIN) {
        nav("/");
      }
      console.log(resp);
      setUser(resp);
    } catch (e) {
      console.error(e);
      nav("/");
    }
  }

  useEffect(() => {
    cek();
  }, []);

  const [button, setButton] = useState("User");

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
      <div className="admin">
        <div className="a-sidebar">
          <h2>Admin</h2>
          <br />
          <br />
          <span>
            <button onClick={() => setButton("User")}>User</button>
            <button onClick={() => setButton("Result")}>Result</button>
          </span>
        </div>
        <div className="a-content">
          <div className="a-c-head">
            <h3>{button}</h3>
            <div onClick={() => setPopUser(true)} className="n-auth-on">
              <img
                src="./user.svg"
                alt="user"
                width={"22px"}
                draggable={false}
              />
            </div>
          </div>
          <div className="a-c-body">
            {button == "Result" ? <Result /> : <User />}
          </div>
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
      </div>
    </>
  );
}
