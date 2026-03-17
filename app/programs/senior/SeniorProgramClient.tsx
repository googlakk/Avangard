'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import SeniorOffer from '@/components/programs/senior/SeniorOffer';
import AcademicResults from '@/components/programs/senior/AcademicResults';
import CognitiveSuperiorityAI from '@/components/programs/senior/CognitiveSuperiorityAI';
import SelectiveAdmission from '@/components/programs/senior/SelectiveAdmission';
import SeniorProgramTabs from '@/components/programs/senior/SeniorProgramTabs';
import {
    getSeniorOfferData,
    getAcademicResultsData,
    getCognitiveAIData,
    getSelectiveAdmissionData
} from '@/lib/data/senior-program';
import { deepMerge, hasOverrideKey, pickOverride, resolveLocalizedContent, type CmsOverrideMap } from '@/lib/cms/program-content';

interface SeniorProgramClientProps {
    cmsOverrides?: CmsOverrideMap;
}

export default function SeniorProgramClient({ cmsOverrides }: SeniorProgramClientProps) {
    const { t, language } = useLanguage();

    const seniorOfferData = resolveLocalizedContent(
        deepMerge(getSeniorOfferData(t), pickOverride(cmsOverrides, 'senior-offer')),
        language
    );
    const academicResultsData = resolveLocalizedContent(
        deepMerge(getAcademicResultsData(t), pickOverride(cmsOverrides, 'senior-academic-results')),
        language
    );
    const cognitiveAiData = resolveLocalizedContent(
        deepMerge(getCognitiveAIData(t), pickOverride(cmsOverrides, 'senior-cognitive-ai')),
        language
    );
    const selectiveAdmissionData = resolveLocalizedContent(
        deepMerge(getSelectiveAdmissionData(t), pickOverride(cmsOverrides, 'senior-selective-admission')),
        language
    );

    return (
        <main className="bg-white">
            {hasOverrideKey(cmsOverrides, 'senior-offer') && <SeniorOffer {...seniorOfferData} />}
            {hasOverrideKey(cmsOverrides, 'senior-academic-results') && <AcademicResults {...academicResultsData} />}
            {hasOverrideKey(cmsOverrides, 'senior-cognitive-ai') && <CognitiveSuperiorityAI {...cognitiveAiData} />}
            <SeniorProgramTabs />
            {hasOverrideKey(cmsOverrides, 'senior-selective-admission') && <SelectiveAdmission {...selectiveAdmissionData} />}
        </main>
    );
}
