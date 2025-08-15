import React from "react";
import { footerData } from "../../data/footerData";
import "./Footer.css";

const Footer = ({ configValid }) => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        {footerData.sections.map((section, index) => (
          <div key={index} className="footer-section">
            <h4>{section.title}</h4>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-section">
          <h4>ℹ️ Status</h4>
          <div className="status-indicators">
            <div className={`status-item ${configValid ? "ok" : "error"}`}>
              <span className="status-dot"></span>
              Configuration: {configValid ? "OK" : "Needs Setup"}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2024 React Google Integration. Built with React, Express, and
          Google APIs.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
