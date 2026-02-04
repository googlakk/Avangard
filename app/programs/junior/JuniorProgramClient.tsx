'use client';

import JuniorHero from '@/components/programs/junior/JuniorHero';
import LifestyleAndCareSection from '@/components/programs/junior/LifestyleAndCareSection';
import CognitiveFoundationSection from '@/components/programs/junior/CognitiveFoundationSection';
import MotivationAtmosphereSection from '@/components/programs/junior/MotivationAtmosphereSection';
import JuniorPhotoGallery from '@/components/programs/junior/JuniorPhotoGallery';
import ParentTestimonials from '@/components/programs/junior/ParentTestimonials';
import JuniorCTA from '@/components/programs/junior/JuniorCTA';
import AdditionalInfoSection from '@/components/programs/junior/AdditionalInfoSection';
import PhilosophyIntroSection from '@/components/programs/junior/PhilosophyIntroSection';
import JuniorFaculty from '@/components/programs/junior/JuniorFaculty';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    getJuniorHeroData,
    getGalleryImages,
    testimonials,
    getLifestyleCareFeatures,
    getLifestyleCarePhotoProof,
    getCognitiveFoundationFeatures,
    getMotivationCultureFeatures,
    getMotivationCulturePhotoProof
} from '@/lib/data/junior-program';

export default function JuniorProgramClient() {
    const { t } = useLanguage();

    return (
        <main className="bg-white">
            {/* БЛОК 1: Hero - Главное обещание + Безопасность */}
            <JuniorHero {...getJuniorHeroData(t)} />

            {/* БЛОК 2: Философия (Фундамент будущего) */}
            <PhilosophyIntroSection />

            {/* БЛОК 3: Родительское счастье (Lifestyle & Care) */}
            <LifestyleAndCareSection
                features={getLifestyleCareFeatures(t)}
                photoProof={getLifestyleCarePhotoProof(t)}
            />

            {/* БЛОК 4: Когнитивный фундамент (Hard Skills) */}
            <CognitiveFoundationSection
                features={getCognitiveFoundationFeatures(t)}
            />

            {/* БЛОК 5: Мотивация и Атмосфера (Soft Skills) */}
            <MotivationAtmosphereSection
                features={getMotivationCultureFeatures(t)}
                photoProof={getMotivationCulturePhotoProof(t)}
            />

            {/* БЛОК 6: Преподаватели (Faculty) */}
            <JuniorFaculty />

            {/* Фотогалерея - визуальное подтверждение */}
            <JuniorPhotoGallery images={getGalleryImages(t)} />

            {/* Отзывы родителей */}
            <ParentTestimonials testimonials={testimonials} />

            {/* Узнать больше - модальные окна с деталями */}
            <AdditionalInfoSection />

            {/* CTA секция */}
            <JuniorCTA />
        </main>
    );
}
