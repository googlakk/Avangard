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
import { deepMerge, pickOverride, resolveLocalizedContent, type CmsOverrideMap } from '@/lib/cms/program-content';

interface JuniorProgramClientProps {
    cmsOverrides?: CmsOverrideMap;
}

export default function JuniorProgramClient({ cmsOverrides }: JuniorProgramClientProps) {
    const { t, language } = useLanguage();

    const heroData = resolveLocalizedContent(
        deepMerge(getJuniorHeroData(t), pickOverride(cmsOverrides, 'junior-hero')),
        language
    );
    const lifestyleFeatures = resolveLocalizedContent(
        deepMerge(getLifestyleCareFeatures(t), pickOverride(cmsOverrides, 'junior-lifestyle-care-features')),
        language
    );
    const lifestylePhotoProof = resolveLocalizedContent(
        deepMerge(getLifestyleCarePhotoProof(t), pickOverride(cmsOverrides, 'junior-lifestyle-care-proof')),
        language
    );
    const cognitiveFeatures = resolveLocalizedContent(
        deepMerge(getCognitiveFoundationFeatures(t), pickOverride(cmsOverrides, 'junior-cognitive-foundation')),
        language
    );
    const motivationFeatures = resolveLocalizedContent(
        deepMerge(getMotivationCultureFeatures(t), pickOverride(cmsOverrides, 'junior-motivation-atmosphere-features')),
        language
    );
    const motivationProof = resolveLocalizedContent(
        deepMerge(getMotivationCulturePhotoProof(t), pickOverride(cmsOverrides, 'junior-motivation-atmosphere-proof')),
        language
    );
    const galleryImages = resolveLocalizedContent(
        deepMerge(getGalleryImages(t), pickOverride(cmsOverrides, 'junior-gallery')),
        language
    );
    const testimonialsData = resolveLocalizedContent(
        deepMerge(testimonials, pickOverride(cmsOverrides, 'junior-testimonials')),
        language
    );
    const ctaData = resolveLocalizedContent(
        deepMerge({
            title: 'Готовы дать своему ребенку лучший старт?',
            description: 'Запишитесь на индивидуальную экскурсию по школе и познакомьтесь с нашей командой',
            primaryText: 'Записаться на экскурсию',
            primaryLink: '/admissions',
            secondaryText: 'Скачать брошюру',
            secondaryLink: '/downloads/junior-brochure.pdf',
        }, pickOverride(cmsOverrides, 'junior-cta')),
        language
    );

    return (
        <main className="bg-white">
            {/* БЛОК 1: Hero - Главное обещание + Безопасность */}
            <JuniorHero {...heroData} />

            {/* БЛОК 2: Философия (Фундамент будущего) */}
            <PhilosophyIntroSection />

            {/* БЛОК 3: Родительское счастье (Lifestyle & Care) */}
            <LifestyleAndCareSection
                features={lifestyleFeatures}
                photoProof={lifestylePhotoProof}
            />

            {/* БЛОК 4: Когнитивный фундамент (Hard Skills) */}
            <CognitiveFoundationSection
                features={cognitiveFeatures}
            />

            {/* БЛОК 5: Мотивация и Атмосфера (Soft Skills) */}
            <MotivationAtmosphereSection
                features={motivationFeatures}
                photoProof={motivationProof}
            />

            {/* БЛОК 6: Преподаватели (Faculty) */}
            <JuniorFaculty />

            {/* Фотогалерея - визуальное подтверждение */}
            <JuniorPhotoGallery images={galleryImages} />

            {/* Отзывы родителей */}
            <ParentTestimonials testimonials={testimonialsData} />

            {/* Узнать больше - модальные окна с деталями */}
            <AdditionalInfoSection />

            {/* CTA секция */}
            <JuniorCTA {...ctaData} />
        </main>
    );
}
