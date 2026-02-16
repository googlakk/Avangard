import Hero from '@/components/sections/Hero';
import PremiumHighlights from '@/components/sections/PremiumHighlights';
import ProgramsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
    return (
        <main>
            <Hero />
            <PremiumHighlights />
            <ProgramsSection />
            <ContactSection />
        </main>
    );
}
