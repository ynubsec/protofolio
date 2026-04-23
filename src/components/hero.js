import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cv from './ynubsec-cv.pdf';
import profile from '../medias/profile.png';

const roles = [
  "Frontend Web Developer",
  "Python Developer",
  "Cybersecurity Learner",
];

function Hero() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);
  const [views, setViews] = useState('...');

  useEffect(() => {
    // Using abacus.jasoncameron.dev API as counterapi.dev is offline
    fetch('https://abacus.jasoncameron.dev/hit/ynubsec/portfolio')
      .then(res => res.json())
      .then(data => {
        console.log('View count response:', data);
        setViews(data.value);
      })
      .catch(err => {
        console.error('Error fetching view count:', err);
        setViews('999');
      });
  }, []);

  useEffect(() => {
    const tick = () => {
      const i = roleIndex % roles.length;
      const fullText = roles[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(1500);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setRoleIndex(prevIndex => prevIndex + 1);
        setDelta(200);
      } else {
        setDelta(prevDelta => (isDeleting ? 50 : 150));
      }
    };

    const ticker = setInterval(tick, delta);

    return () => clearInterval(ticker);
  }, [text, delta, roleIndex, isDeleting]);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-profile-wrapper">
            <div className="hero-img">
              <div className="view-count">
                <i className="fa-solid fa-eye"></i>
                <span>{views}</span>
              </div>
              <img src={profile} alt="ynubsec - Frontend Developer & Cybersecurity Enthusiast" />

            </div>

          </div>

          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">
              <span className="real-name">Bishnu Neupane</span>
              <span className="hero-alias"> (@ynubsec)</span>
            </h1>

            <h2 className="role rotating-text">
              <span className="text">{text}</span>
            </h2>

            <p className="intro-text">
            <span style={{fontWeight:"bold"}}>Web dev ×  Cybersecurity</span>
            <br />
             Enthusiast learning through projects, courses, and hands-on practice. Building a strong foundation in frontend development while exploring security concepts and ethical hacking.
            </p>

            <div className="hero-buttons">
              <Link to="/projects" className="btn primary-btn">
                <i className="fa-solid fa-code"></i>
                View Projects
              </Link>

              <Link to="/contact" className="btn secondary-btn">
                <i className="fa-solid fa-envelope"></i>
                Get in Touch
              </Link>
            </div>

            <div className="hero-social">
              <a
                href="https://github.com/ynubsec"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>

              <a
                href="https://linkedin.com/in/ynubsec"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>

              <a
                href="https://ynubsec.github.io/blogs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-newspaper"></i>
              </a>

            </div>

            {/* CV Download Button - Moved outside hero-social */}
            <a href={cv} download="ynubsec-cv.pdf" className="cv-link">
              <div className="cv-download">
                <i className="fa-solid fa-download"></i>
                <span>Download CV</span>
              </div>
            </a>
          </div>
        </div>
      </section >
    </>
    );
}

export default Hero;
