import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header, { SearchOverlay } from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ConsentBanner from './components/ConsentBanner';
import Icon from './components/Icon';
import Home from './pages/Home';
import { setReady } from './lib/motion';
import { SITE } from './config/site';
import { syncRoute } from './lib/balance';

const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Insights = lazy(() => import('./pages/Insights'));
const Article = lazy(() => import('./pages/Article'));
const DataAI = lazy(() => import('./pages/DataAI'));
const Support = lazy(() => import('./pages/Support'));
const Partners = lazy(() => import('./pages/Partners'));
const Careers = lazy(() => import('./pages/Careers'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();
  syncRoute(pathname);
  const close = useCallback(() => setSearch(false), []);
  useEffect(() => { setReady(); }, []);
  useEffect(() => { setSearch(false); }, [pathname]);
  return (
    <>
      <ScrollToTop />
      <Header onSearch={() => setSearch(true)} />
      <SearchOverlay open={search} onClose={close} />
      <main id="main" tabIndex="-1">
        <Suspense fallback={<div className="route-load" aria-busy="true"><i /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<Article />} />
            <Route path="/data-ai" element={<DataAI />} />
            <Route path="/support" element={<Support />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {pathname !== '/contact' && <Link className="fab" to="/contact?urgency=now"><Icon name="phone" size={18} /> Need a technician?</Link>}
      <ConsentBanner />
    </>
  );
}
