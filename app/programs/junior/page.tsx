import JuniorHero from '@/components/programs/junior/JuniorHero';
import LifestyleAndCareSection from '@/components/programs/junior/LifestyleAndCareSection';
import CognitiveFoundationSection from '@/components/programs/junior/CognitiveFoundationSection';
import MotivationAtmosphereSection from '@/components/programs/junior/MotivationAtmosphereSection';
import JuniorPhotoGallery from '@/components/programs/junior/JuniorPhotoGallery';
import ParentTestimonials from '@/components/programs/junior/ParentTestimonials';
import JuniorCTA from '@/components/programs/junior/JuniorCTA';
import AdditionalInfoSection from '@/components/programs/junior/AdditionalInfoSection';
import {
    juniorHeroData,
    galleryImages,
    testimonials,
    lifestyleCareFeatures,
    lifestyleCarePhotoProof,
    cognitiveFoundationFeatures,
    cognitiveFoundationPhotoProof,
    motivationCultureFeatures,
    motivationCulturePhotoProof
} from '@/lib/data/junior-program';

export const metadata = {
    title: 'Начальная школа Intellect Junior (1-4 классы) | Intellect Pro',
    description: 'Счастливое детство с интеллектом будущего. Школа полного дня (08:00-17:00) с носителями языка. Мягкая адаптация, развитие мозга и безопасность 360°.',
    keywords: 'начальная школа, 1-4 классы, билингвальное образование, английский, носители языка, Cambridge Primary, ментальная арифметика, школа полного дня, Бишкек, Intellect Pro',
    openGraph: {
        title: 'Intellect Junior — Счастливое детство с интеллектом будущего',
        description: 'Школа полного дня с Native Speakers, когнитивное развитие, безопасность 360°',
        images: [{
            url: '/images/junior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Junior School'
        }]
    }
};

export default function JuniorProgramPage() {
    return (
        <main className="bg-white">
            {/* БЛОК 1: Hero - Главное обещание + Безопасность */}
            <JuniorHero {...juniorHeroData} />

            {/* БЛОК 2: Родительское счастье (Lifestyle & Care) */}
            <LifestyleAndCareSection
                features={lifestyleCareFeatures}
                photoProof={lifestyleCarePhotoProof}
            />

            {/* БЛОК 3: Когнитивный фундамент (Hard Skills) */}
            <CognitiveFoundationSection
                features={cognitiveFoundationFeatures}
                photoProof={cognitiveFoundationPhotoProof}
            />

            {/* БЛОК 4: Мотивация и Атмосфера (Soft Skills) */}
            <MotivationAtmosphereSection
                features={motivationCultureFeatures}
                photoProof={motivationCulturePhotoProof}
            />

            {/* Фотогалерея - визуальное подтверждение */}
            <JuniorPhotoGallery images={galleryImages} />

            {/* Отзывы родителей */}
            <ParentTestimonials testimonials={testimonials} />

            {/* Узнать больше - модальные окна с деталями */}
            <AdditionalInfoSection />

            {/* CTA секция */}
            <JuniorCTA />
        </main>
    );
}
