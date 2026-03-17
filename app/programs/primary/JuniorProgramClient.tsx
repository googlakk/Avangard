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
import { deepMerge, hasOverrideKey, pickOverride, resolveLocalizedContent, type CmsOverrideMap } from '@/lib/cms/program-content';

interface JuniorProgramClientProps {
    cmsOverrides?: CmsOverrideMap;
}

export default function JuniorProgramClient({ cmsOverrides }: JuniorProgramClientProps) {
    const { t, language } = useLanguage();
    const hasLifestyleFeatures = hasOverrideKey(cmsOverrides, 'junior-lifestyle-care-features');
    const hasLifestyleProof = hasOverrideKey(cmsOverrides, 'junior-lifestyle-care-proof');
    const hasMotivationFeatures = hasOverrideKey(cmsOverrides, 'junior-motivation-atmosphere-features');
    const hasMotivationProof = hasOverrideKey(cmsOverrides, 'junior-motivation-atmosphere-proof');

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
            {hasOverrideKey(cmsOverrides, 'junior-hero') && <JuniorHero {...heroData} />}

            {/* БЛОК 2: Философия (Фундамент будущего) */}
            <PhilosophyIntroSection />

            {/* БЛОК 3: Родительское счастье (Lifestyle & Care) */}
            {hasLifestyleFeatures && (
                <LifestyleAndCareSection
                    features={lifestyleFeatures}
                    photoProof={hasLifestyleProof ? lifestylePhotoProof : { images: [], message: '' }}
                />
            )}

            {/* БЛОК 4: Когнитивный фундамент (Hard Skills) */}
            {hasOverrideKey(cmsOverrides, 'junior-cognitive-foundation') && (
                <CognitiveFoundationSection
                    features={cognitiveFeatures}
                />
            )}

            {/* БЛОК 5: Мотивация и Атмосфера (Soft Skills) */}
            {hasMotivationFeatures && (
                <MotivationAtmosphereSection
                    features={motivationFeatures}
                    photoProof={hasMotivationProof ? motivationProof : undefined}
                />
            )}

            {/* БЛОК 6: Преподаватели (Faculty) */}
            <JuniorFaculty />

            {/* Фотогалерея - визуальное подтверждение */}
            {hasOverrideKey(cmsOverrides, 'junior-gallery') && <JuniorPhotoGallery images={galleryImages} />}

            {/* Отзывы родителей */}
            {hasOverrideKey(cmsOverrides, 'junior-testimonials') && <ParentTestimonials testimonials={testimonialsData} />}

            {/* Узнать больше - модальные окна с деталями */}
            <AdditionalInfoSection />

            {/* CTA секция */}
            {hasOverrideKey(cmsOverrides, 'junior-cta') && <JuniorCTA {...ctaData} />}
        </main>
    );
}
