import type { Metadata } from 'next';
import JuniorProgramClient from './JuniorProgramClient';
import { getPublishedCmsSectionPayloadsBySlug } from '@/lib/services/cms-public';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Intellect Primary School (Grades 1-4) | Intellect Pro',
    description: 'Full-day bilingual primary school with native speakers, brain development, and 360° safety.',
    keywords: ['primary school', 'grades 1-4', 'bilingual education', 'international curriculum', 'Bishkek', 'Intellect Pro'],
    openGraph: {
        title: 'Intellect Primary',
        description: 'Full-day primary school with native speakers, cognitive development, and 360° safety.',
        images: [{
            url: '/images/junior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Junior School'
        }]
    }
};

export default async function JuniorProgramPage() {
    const cmsOverrides = await getPublishedCmsSectionPayloadsBySlug('program-primary');
    return <JuniorProgramClient cmsOverrides={cmsOverrides || undefined} />;
}
