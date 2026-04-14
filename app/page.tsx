import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';

const ProgramsSection = dynamic(() => import('@/components/sections/ProjectsSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));

export default function Home() {
    return (
        <main>
            <Hero />
            <ProgramsSection />
            <ContactSection />
        </main>
    );
}
