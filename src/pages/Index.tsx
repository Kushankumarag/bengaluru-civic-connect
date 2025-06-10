
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import IssueTypes from '@/components/IssueTypes';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <IssueTypes />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
