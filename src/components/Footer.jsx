import { FaGithub } from "react-icons/fa"; // GitHub icon

function Footer() {
  return (
    <div className="footer">
      <p className="footer-title">🌱 Plantea</p>
      <div className="footer-links">
        <a
          href="https://github.com/MariiaTararaeva/plantea-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footer-icon" /> Frontend
        </a>
        {/* <span className="or sign footer"> | </span> */}
        <a
          href="https://github.com/LenaH92/plantea-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footer-icon" /> Backend
        </a>
      </div>
    </div>
  );
}

export default Footer;
