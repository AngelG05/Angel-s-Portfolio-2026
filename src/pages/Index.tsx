import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import LeadershipSection from "@/components/LeadershipSection";
import CodingQuizSection from "@/components/CodingQuizSection";
import ContactSection from "@/components/ContactSection";
import EggTracker from "@/components/EggTracker";
import { EasterEggProvider } from "@/contexts/EasterEggContext";

const Index = () => {
  return (
    <EasterEggProvider>
      <div className="bg-background min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <LeadershipSection />
        <CodingQuizSection />
        <ContactSection />
        <EggTracker />
      </div>
    </EasterEggProvider>
  );
};

export default Index;
