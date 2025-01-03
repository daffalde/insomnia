import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-in">
          <div className="f-up">
            <div className="f-u-1">
              <h2 style={{ color: "#5046E4" }}>GadRescue</h2>
              <p>Comprehensive Phone Repair Solutions for a Brighter Future.</p>
            </div>
            <ul>
              <li>
                <h5>Contact</h5>
              </li>
              <li>
                <img src="./location.svg" alt="location" />
                <p>DIY Yogyakarta</p>
              </li>
              <li>
                <img src="./phone.svg" alt="location" />
                <p>0855 9769 0921</p>
              </li>
              <li>
                <img src="./mail.svg" alt="location" />
                <p>GadRescue@gmail.com</p>
              </li>
            </ul>
            <ul>
              <li>
                <h5>Quick Links</h5>
              </li>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/forum"}>Konsultasi</Link>
              </li>
              <li>
                <Link to={"/login"}>Autentikasi</Link>
              </li>
            </ul>

            <ul>
              <li>
                <h5>Follow us</h5>
              </li>
              <div className="social">
                <li>
                  <img src="./fb.svg" alt="social" />
                </li>
                <li>
                  <img src="./twt.svg" alt="social" />
                </li>
                <li>
                  <img src="./ig.svg" alt="social" />
                </li>
                <li>
                  <img src="./in.svg" alt="social" />
                </li>
              </div>
            </ul>
          </div>
          <div className="f-down">
            <p>2024 GadRescue. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
