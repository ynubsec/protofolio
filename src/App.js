import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Eagerly loaded — needed on first paint
import Hero from './components/hero.js';
import About from './components/about.js';
import Footer from './components/footer.js';
import Nav from './components/navbar.js';
import QuickNav from './components/QuickNav.js';
import bg from "./medias/bmw.jpg";
import './App.css';

// Lazy loaded — only fetched when the user navigates to that route
const Pro = lazy(() => import('./components/navs/project.js'));
const Skills = lazy(() => import('./components/navs/skills.js'));
const Contact = lazy(() => import('./components/Contact.js'));
const Privacy = lazy(() => import('./pages').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages').then(m => ({ default: m.Terms })));
const ProfileCard = lazy(() => import('./components/ProfileCard'));
const Photos = lazy(() => import('./components/photos.js'));
const Reviews = lazy(() => import('./components/reviews.js'));
const NotFound = lazy(() => import('./page-not-found.js'));


function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/" && hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
}


function HomePage() {
  return (
    <>
      <QuickNav />
      <Hero />
      <About />

      <Footer />
    </>
  );
}


function SkillsPage() {
  return (
    <>
      <Skills />
      <Footer />
    </>
  );
}



function GalleryPage() {
  return (
    <>
      <div className="gallery-layout" style={{ backgroundColor: '#000000', padding: '20px',marginLeft:"10px" }}>
        <Photos />

        <div className="gallery-profile-area" style={{ marginLeft: "6rem" }}>
          <h2 className="gallery-profile-title">Profile Card</h2>

          <section className="gallery-profile-stage">
            <div
              className="gallery-profile-stage-bg"
              style={{ backgroundImage: `url(${bg})` }}
            />

            <div className="gallery-profile-stage-content">
              <ProfileCard
                name="Bishnu Neupane"
                github="https://github.com/ynubsec"
                linkedin="https://linkedin.com/in/ynubsec"
                role="Frontend Developer | Cybersecurity Learner"
                bio="Building polished, responsive websites while learning security, systems, and modern frontend craft."
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}


function ContactPage() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <ScrollToHash />

      <div className="root">
        <Nav />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Pro />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/gallary" element={<GalleryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/card" element={<ProfileCard />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </HashRouter>
  );
}

export default App;
