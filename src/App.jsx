import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import { account, database } from "./assets/Client";
import { useEffect } from "react";
import { ID, Query } from "appwrite";
import History from "./pages/History";
import Admin from "./pages/Admin";

function App() {
  async function getUser() {
    try {
      const user = await account.get();
      if (user) {
        try {
          const resp = await database.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE,
            import.meta.env.VITE_APPWRITE_USER,
            [Query.contains("user_email", user.email)]
          );
          if (resp.total === 0) {
            await database.createDocument(
              import.meta.env.VITE_APPWRITE_DATABASE,
              import.meta.env.VITE_APPWRITE_USER,
              ID.unique(),
              {
                user_email: user.email,
                user_name: user.name,
              }
            );
          }
        } catch (e) {
          await database.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE,
            import.meta.env.VITE_APPWRITE_USER,
            ID.unique(),
            {
              user_email: user.email,
              user_name: user.name,
            }
          );
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/forum" Component={Forum} />
          <Route path="/history" Component={History} />
          <Route path="/dashboard" Component={Admin} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
