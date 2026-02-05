// Данные для новой conversion-focused страницы Intellect Senior

// --- Interfaces for SeniorProgramTabs ---

export interface UniversityPathwayBlock {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    highlight?: string;
}

export interface EnglishProficiencyBlock {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    target?: string;
}

export interface CognitiveAdvantage {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    benefit: string;
}

export interface XXICenturySkill {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    keyPoints?: string[];
}

export interface StudentLifeFeature {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    benefit?: string;
}

export interface CareerGuidanceItem {
    icon: string;
    title: string;
    description: string[];
    highlight?: string;
}

// Block 1: Offer (Main Promise)
export const getSeniorOfferData = (t: any) => ({
    headline: "Путь в ведущие университеты мира",
    subheadline: "International High School • Grades 10–11",
    ctaText: "Поступить",
    ctaLink: "/contacts",
    backgroundImage: "/images/sen-hero.png",
    scrollText: t.senior.hero.scrollText
});

// Block 2: Academic Results (Hard Skills)
export const getAcademicResultsData = (t: any) => ({
    headline: t.senior.academic.headline,
    description: t.senior.academic.description,
    timeframe: t.senior.academic.timeframe,
    pillars: [
        {
            icon: "Globe",
            title: t.senior.academic.pillars.sat.title,
            description: t.senior.academic.pillars.sat.description,
            details: t.senior.academic.pillars.sat.details
        },
        {
            icon: "Languages",
            title: t.senior.academic.pillars.ort.title,
            description: t.senior.academic.pillars.ort.description,
            details: t.senior.academic.pillars.ort.details
        },
        {
            icon: "Microscope",
            title: t.senior.academic.pillars.science.title,
            description: t.senior.academic.pillars.science.description,
            details: t.senior.academic.pillars.science.details
        }
    ],
    proofImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
    proofCaption: t.senior.academic.proofCaption,
    bottomStrong: t.senior.academic.bottomStrong,
    bottomText: t.senior.academic.bottomText
});

// Block 3: Cognitive Superiority & AI
export const getCognitiveAIData = (t: any) => ({
    headline: t.senior.cognitive.headline,
    hook: t.senior.cognitive.hook,
    advantages: [
        {
            title: t.senior.cognitive.advantages.ai.title,
            tagline: t.senior.cognitive.advantages.ai.tagline,
            description: t.senior.cognitive.advantages.ai.description,
            benefits: t.senior.cognitive.advantages.ai.benefits,
            multiplier: t.senior.cognitive.advantages.ai.multiplier
        },
        {
            title: t.senior.cognitive.advantages.mental.title,
            tagline: t.senior.cognitive.advantages.mental.tagline,
            description: t.senior.cognitive.advantages.mental.description,
            benefits: t.senior.cognitive.advantages.mental.benefits,
            multiplier: t.senior.cognitive.advantages.mental.multiplier
        }
    ],
    proofImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
    proofCaption: t.senior.cognitive.proofCaption,
    bottomTitle: t.senior.cognitive.bottomTitle,
    bottomText: t.senior.cognitive.bottomText
});

// Block 4: Selective Admission (Filter & CTA)
export const getSelectiveAdmissionData = (t: any) => ({
    headline: t.senior.admission.headline,
    filterMessage: t.senior.admission.filterMessage,
    communityPromise: t.senior.admission.communityPromise,
    ctaText: t.senior.admission.ctaText,
    ctaLink: "/contacts",
    communityValues: t.senior.admission.communityValues,
    proofImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
    subText: t.senior.admission.subText,
    proofCaption: t.senior.admission.proofCaption,
    bottomBoxTitle: t.senior.admission.bottomBoxTitle,
    bottomBoxText: t.senior.admission.bottomBoxText
});

export const getUniversityPathwayBlocks = (t: any): UniversityPathwayBlock[] => [
    {
        id: 'sat',
        icon: 'Globe',
        title: t.senior.tabs.academic.pathways.sat.title,
        subtitle: t.senior.tabs.academic.pathways.sat.subtitle,
        description: t.senior.tabs.academic.pathways.sat.description
    },
    {
        id: 'ielts',
        icon: 'Languages',
        title: t.senior.tabs.academic.pathways.ielts.title,
        subtitle: t.senior.tabs.academic.pathways.ielts.subtitle,
        description: t.senior.tabs.academic.pathways.ielts.description
    },
    {
        id: 'ort',
        icon: 'Flag',
        title: t.senior.tabs.academic.pathways.ort.title,
        subtitle: t.senior.tabs.academic.pathways.ort.subtitle,
        description: t.senior.tabs.academic.pathways.ort.description
    }
];

export const getEnglishProficiencyBlocks = (t: any): EnglishProficiencyBlock[] => [
    {
        icon: 'BookOpen',
        title: t.senior.tabs.academic.english.academic.title,
        subtitle: t.senior.tabs.academic.english.academic.subtitle,
        description: t.senior.tabs.academic.english.academic.description,
        target: t.senior.tabs.academic.english.academic.target
    },
    {
        icon: 'MessageCircle',
        title: t.senior.tabs.academic.english.debate.title,
        subtitle: t.senior.tabs.academic.english.debate.subtitle,
        description: t.senior.tabs.academic.english.debate.description
    },
    {
        icon: 'FileText',
        title: t.senior.tabs.academic.english.writing.title,
        subtitle: t.senior.tabs.academic.english.writing.subtitle,
        description: t.senior.tabs.academic.english.writing.description
    }
];

export const getCognitiveAdvantages = (t: any): CognitiveAdvantage[] => [
    {
        icon: 'Zap',
        title: t.senior.tabs.skills.cognitive.reading.title,
        subtitle: t.senior.tabs.skills.cognitive.reading.subtitle,
        description: t.senior.tabs.skills.cognitive.reading.description,
        benefit: t.senior.tabs.skills.cognitive.reading.benefit
    },
    {
        icon: 'Brain',
        title: t.senior.tabs.skills.cognitive.memory.title,
        subtitle: t.senior.tabs.skills.cognitive.memory.subtitle,
        description: t.senior.tabs.skills.cognitive.memory.description,
        benefit: t.senior.tabs.skills.cognitive.memory.benefit
    },
    {
        icon: 'Target',
        title: t.senior.tabs.skills.cognitive.focus.title,
        subtitle: t.senior.tabs.skills.cognitive.focus.subtitle,
        description: t.senior.tabs.skills.cognitive.focus.description,
        benefit: t.senior.tabs.skills.cognitive.focus.benefit
    }
];

export const getXXICenturySkills = (t: any): XXICenturySkill[] => [
    {
        icon: 'Code2',
        title: t.senior.tabs.skills.xxi.ai.title,
        subtitle: t.senior.tabs.skills.xxi.ai.subtitle,
        description: t.senior.tabs.skills.xxi.ai.description,
        keyPoints: t.senior.tabs.skills.xxi.ai.keyPoints
    },
    {
        icon: 'Users',
        title: t.senior.tabs.skills.xxi.soft.title,
        subtitle: t.senior.tabs.skills.xxi.soft.subtitle,
        description: t.senior.tabs.skills.xxi.soft.description
    },
    {
        icon: 'Wallet',
        title: t.senior.tabs.skills.xxi.finance.title,
        subtitle: t.senior.tabs.skills.xxi.finance.subtitle,
        description: t.senior.tabs.skills.xxi.finance.description
    }
];

export const getStudentLifeFeatures = (t: any): StudentLifeFeature[] => [
    {
        icon: 'Award',
        title: t.senior.tabs.life.features.olympiads.title,
        subtitle: t.senior.tabs.life.features.olympiads.subtitle,
        description: t.senior.tabs.life.features.olympiads.description,
        benefit: t.senior.tabs.life.features.olympiads.benefit
    },
    {
        icon: 'Palette',
        title: t.senior.tabs.life.features.clubs.title,
        subtitle: t.senior.tabs.life.features.clubs.subtitle,
        description: t.senior.tabs.life.features.clubs.description
    },
    {
        icon: 'Globe',
        title: t.senior.tabs.life.features.volunteering.title,
        subtitle: t.senior.tabs.life.features.volunteering.subtitle,
        description: t.senior.tabs.life.features.volunteering.description
    }
];

export const getCareerGuidanceItems = (t: any): CareerGuidanceItem[] => [
    {
        icon: 'Compass',
        title: t.senior.tabs.life.career.guidance.title,
        description: t.senior.tabs.life.career.guidance.description,
        highlight: t.senior.tabs.life.career.guidance.highlight
    },
    {
        icon: 'GraduationCap',
        title: t.senior.tabs.life.career.admission.title,
        description: t.senior.tabs.life.career.admission.description
    },
    {
        icon: 'Briefcase',
        title: t.senior.tabs.life.career.internships.title,
        description: t.senior.tabs.life.career.internships.description
    }
];
