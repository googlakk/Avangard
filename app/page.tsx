import Hero from '@/components/sections/Hero';
import ProgramsSection from '@/components/sections/ProjectsSection';
import PhilosophySection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
    return (
        <main>
            <Hero />
            <ProgramsSection />
            <PhilosophySection />
            <ContactSection />
        </main>
    );
}
