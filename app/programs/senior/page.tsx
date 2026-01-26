import SeniorOffer from '@/components/programs/senior/SeniorOffer';
import AcademicResults from '@/components/programs/senior/AcademicResults';
import CognitiveSuperiorityAI from '@/components/programs/senior/CognitiveSuperiorityAI';
import SelectiveAdmission from '@/components/programs/senior/SelectiveAdmission';
import {
    seniorOfferData,
    academicResultsData,
    cognitiveAIData,
    selectiveAdmissionData
} from '@/lib/data/senior-program';

export const metadata = {
    title: 'Intellect Senior: Прямой путь в ТОП-вузы мира | 10-11 классы',
    description: 'Двухлетний карьерный инкубатор для поступления в университеты США, Европы и Азии на грантовой основе. IELTS, TOEFL, SAT и ОРТ включены в расписание. AI-fluency и ментальные технологии для несправедливого преимущества.',
    keywords: 'старшая школа, 10-11 классы, ТОП-вузы, гранты, IELTS, TOEFL, SAT, ОРТ, AI, когнитивные технологии, Бишкек',
    openGraph: {
        title: 'Intellect Senior — Прямой путь в ТОП-вузы мира',
        description: 'Карьерный инкубатор с подготовкой к международным экзаменам и AI-технологиями',
        images: [{
            url: '/images/senior/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Intellect Senior School'
        }]
    }
};

export default function SeniorProgramPage() {
    return (
        <main className="bg-white">
            {/* Block 1: Offer - Main Promise */}
            <SeniorOffer {...seniorOfferData} />

            {/* Block 2: Academic Results - Hard Skills Proof */}
            <AcademicResults {...academicResultsData} />

            {/* Block 3: Cognitive Superiority & AI - Unique Differentiation */}
            <CognitiveSuperiorityAI {...cognitiveAIData} />

            {/* Block 4: Selective Admission - Filter & Final CTA */}
            <SelectiveAdmission {...selectiveAdmissionData} />
        </main>
    );
}
