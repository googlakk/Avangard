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

export default function SeniorProgramClient() {
    const { t } = useLanguage();

    return (
        <main className="bg-white">
            <SeniorOffer {...getSeniorOfferData(t)} />
            <AcademicResults {...getAcademicResultsData(t)} />
            <CognitiveSuperiorityAI {...getCognitiveAIData(t)} />
            <SeniorProgramTabs />
            <SelectiveAdmission {...getSelectiveAdmissionData(t)} />
        </main>
    );
}
