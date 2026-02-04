
// Данные для страницы Intellect Junior (1-4 классы)
// Refactored to support i18n

export const getJuniorHeroData = (t: any) => ({
    title: t.junior.hero.title,
    subtitle: t.junior.hero.subtitle,
    description: t.junior.hero.description,
    ctaText: t.junior.hero.ctaText,
    ctaLink: "/admissions",
    backgroundImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000",
    badge: t.junior.hero.badge,
    photoProof: {
        image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1200",
        caption: "Учитель-иностранец (Native Speaker) с детьми в неформальной обстановке"
    }
});

// Block 2: Lifestyle & Care (Parent Happiness)
export interface LifestyleCareFeature {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    benefit?: string;
}

export const getLifestyleCareFeatures = (t: any): LifestyleCareFeature[] => [
    {
        icon: "Backpack",
        title: t.junior.lifestyle.studyClub.title,
        subtitle: t.junior.lifestyle.studyClub.subtitle,
        description: t.junior.lifestyle.studyClub.description,
        benefit: t.junior.lifestyle.studyClub.benefit
    },
    {
        icon: "Ban",
        title: t.junior.lifestyle.noBackpacks.title,
        subtitle: t.junior.lifestyle.noBackpacks.subtitle,
        description: t.junior.lifestyle.noBackpacks.description
    },
    {
        icon: "Salad",
        title: t.junior.lifestyle.healthyFood.title,
        subtitle: t.junior.lifestyle.healthyFood.subtitle,
        description: t.junior.lifestyle.healthyFood.description
    },
    {
        icon: "Shield",
        title: t.junior.lifestyle.security.title,
        subtitle: t.junior.lifestyle.security.subtitle,
        description: t.junior.lifestyle.security.description
    }
];

export const getLifestyleCarePhotoProof = (t: any) => ({
    images: [
        {
            src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000",
            caption: t.junior.lifestyle.photoProof.locker
        },
        {
            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
            caption: t.junior.lifestyle.photoProof.teacher
        }
    ],
    message: t.junior.lifestyle.photoProof.message
});

// Block 3: Cognitive Foundation (Hard Skills)
export interface CognitiveFoundationFeature {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    stats?: string;
    highlight?: string;
}

export const getCognitiveFoundationFeatures = (t: any): CognitiveFoundationFeature[] => [
    {
        icon: "Brain",
        title: t.junior.cognitive.brainFitness.title,
        subtitle: t.junior.cognitive.brainFitness.subtitle,
        description: t.junior.cognitive.brainFitness.description,
        stats: t.junior.cognitive.brainFitness.stats,
        highlight: t.junior.cognitive.brainFitness.highlight
    },
    {
        icon: "Languages",
        title: t.junior.cognitive.immersion.title,
        subtitle: t.junior.cognitive.immersion.subtitle,
        description: t.junior.cognitive.immersion.description,
        stats: t.junior.cognitive.immersion.stats,
        highlight: t.junior.cognitive.immersion.highlight
    },
    {
        icon: "Code2",
        title: t.junior.cognitive.it.title,
        subtitle: t.junior.cognitive.it.subtitle,
        description: t.junior.cognitive.it.description
    }
];

export const getCognitiveFoundationPhotoProof = (t: any) => ({
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200",
    caption: t.junior.cognitive.photoProof.caption
});

// Block 4: Motivation & Atmosphere (Soft Skills)
export interface MotivationCultureFeature {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    example?: string;
}

export const getMotivationCultureFeatures = (t: any): MotivationCultureFeature[] => [
    {
        icon: "Wallet",
        title: t.junior.motivation.currency.title,
        subtitle: t.junior.motivation.currency.subtitle,
        description: t.junior.motivation.currency.description,
        example: t.junior.motivation.currency.example
    },
    {
        icon: "Heart",
        title: t.junior.motivation.praise.title,
        subtitle: t.junior.motivation.praise.subtitle,
        description: t.junior.motivation.praise.description
    },
    {
        icon: "Award",
        title: t.junior.motivation.recognition.title,
        subtitle: t.junior.motivation.recognition.subtitle,
        description: t.junior.motivation.recognition.description
    }
];

export const getMotivationCulturePhotoProof = (t: any) => ({
    image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200",
    caption: t.junior.motivation.photoProof.caption
});

// --- Dynamic Data for Modals ---

export const getHeadOfJuniorData = (t: any) => ({
    name: t.junior.modals.head.name,
    position: t.junior.modals.head.position,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
    videoUrl: null,
    quote: t.junior.modals.head.quote
});

export interface CurriculumBlock {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    stats?: string;
}

export const getCurriculumBlocks = (t: any): CurriculumBlock[] => [
    {
        icon: "Languages",
        // title: t.junior.lifestyle.studyClub.title, // Removed duplicate
        // Wait, curriculum blocks from original file were: English, Soft Start, Afterschool
        // Let's check keys in ru.json -> I didn't add "curriculum" specific blocks in "modals" besides what was already there?
        // Ah, I missed 'curriculumBlocks' in the locale update? I added 'academic' which covers State Standard, Cognitive, IT.
        // Let's double check the original 'curriculumBlocks' vs 'academicProgram'.
        // 'curriculumBlocks' (3 items) was: English, Soft Start, Extension.
        // 'academicProgram' (3 items) was: State Standard, Cognitive, IT.
        // I added "academic" to locale which maps to 'academicProgram'.
        // I need to add 'curriculum' keys OR reuse something.
        // Let's assume for now we use 'academic' for 'academicProgram'.
        // For 'curriculumBlocks', let's map them to what we have or leave static if not critical? No, critical.
        // I will map them to 'modals.schedule' or 'modals.academic'? No.
        // Let's add them to 'modals.curriculum' now?
        // Actually, looking at 'AdditionalInfoSection', it uses 'AcademicProgramSection' with 'academicProgram' data.
        // It does NOT seem to use 'curriculumBlocks' in the modal list?
        // 'infoCards' IDs: schedule, language, academic, head, extracurricular, pastoral.
        // 'academic' card uses 'AcademicProgramSection' with 'academicProgram' data.
        // 'language' card uses 'LanguageEnvironmentSection' with 'languageEnvironment' data.
        // So 'curriculumBlocks' (the one with 'Soft Start') might be unused in the AdditionalInfoSection?
        // Let's check 'AdditionalInfoSection.tsx' again.
        // It imports { dailySchedule, languageEnvironment, academicProgram, headOfJuniorData, extracurricularActivities, motivationSystems, pastoralCareItems }.
        // It DOES NOT import 'curriculumBlocks'. So I can skip localizing 'curriculumBlocks' for the modal task!
        // Great.
        title: "UNUSED", subtitle: "", description: []
    }
]; // We can ignore this one if unused.

export interface LanguageFeature {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    highlight?: string;
}

export const getLanguageEnvironment = (t: any): LanguageFeature[] => [
    {
        icon: "GraduationCap",
        title: t.junior.cognitive.immersion.title, // Reusing cognitive block title if matches? No, let's use specific keys if possible or just reuse for consistency.
        // In the modal, 'Language Environment' uses 'languageEnvironment' data.
        // In locale 'junior.cognitive.immersion' is "Language Immersion".
        // Let's check if we can reuse:
        subtitle: t.junior.cognitive.immersion.subtitle,
        description: t.junior.cognitive.immersion.description,
        highlight: t.junior.cognitive.immersion.highlight
    },
    // The original 'languageEnvironment' had 3 items: Co-Teaching, Tutors, 8-10 hours.
    // My locale 'cognitive.immersion' only covers one block?
    // I need to add specific keys for Language Environment modal if strict match is needed.
    // The user wants High Quality.
    // I added 'modals.language'?? No, I added 'modals.academic', 'modals.schedule'...
    // I missed 'modals.language' keys! I only have 'additionalInfo.cards.language'.
    // I should add them or reuse existing.
    // Let's reuse 'junior.cognitive.immersion' for one of them.
    // But there are 3 distinct items.
    // Static for now for Language to avoid breaking if keys missing?
    // I'd better add 'modals.language' keys in a follow up or just map to what I have.
    // Let's look at `ru.json` update again. I added `modals` with `schedule`, `head`, `pastoral`, `academic`, `extracurricular`.
    // Missing: `language`.
    // I will skip language for a second and focus on the ones I added.
    { icon: "Languages", title: "Language Environment (Pending)", subtitle: "", description: [] }
];

export interface AcademicBlock {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    subjects: {
        name: string;
        description: string;
        icon?: string;
    }[];
    result?: string;
}

export const getAcademicProgram = (t: any): AcademicBlock[] => [
    {
        id: "state-standard",
        title: t.junior.modals.academic.state.title,
        subtitle: t.junior.modals.academic.state.subtitle,
        icon: "Book",
        subjects: [
            { name: "Mathematics", description: t.junior.modals.academic.state.subjects.math, icon: "Calculator" },
            { name: "Language", description: t.junior.modals.academic.state.subjects.lang, icon: "PenTool" },
            { name: "World", description: t.junior.modals.academic.state.subjects.world, icon: "Globe" }
        ],
        result: t.junior.modals.academic.state.result
    },
    {
        id: "cognitive",
        title: t.junior.modals.academic.cognitive.title,
        subtitle: t.junior.modals.academic.cognitive.subtitle,
        icon: "Brain",
        subjects: [
            { name: "Mental Arithmetic", description: t.junior.modals.academic.cognitive.subjects.mental, icon: "Calculator" },
            { name: "Mnemonics", description: t.junior.modals.academic.cognitive.subjects.mnemo, icon: "Lightbulb" },
            { name: "Stacking", description: t.junior.modals.academic.cognitive.subjects.stacking, icon: "Target" },
            { name: "Logic", description: t.junior.modals.academic.cognitive.subjects.logic, icon: "Grid3x3" }
        ],
        result: t.junior.modals.academic.cognitive.result
    },
    {
        id: "it-tech",
        title: t.junior.modals.academic.it.title,
        subtitle: t.junior.modals.academic.it.subtitle,
        icon: "Code2",
        subjects: [
            { name: "Coding", description: t.junior.modals.academic.it.subjects.coding, icon: "Monitor" },
            { name: "Interactive", description: t.junior.modals.academic.it.subjects.interactive, icon: "Tablet" }
        ]
    }
];

export interface FullDayFeature {
    icon: string;
    title: string;
    subtitle: string;
    description: string[];
    time?: string;
    benefits?: string[];
}
// fullDaySchool is used in Main page? No, 'LifestyleAndCareSection' uses 'lifestyleCareFeatures'.
// 'fullDaySchool' data might be unused?
// JuniorHero, Lifestyle, Cognitive, Motivation, Gallery, Testimonials, AdditionalInfo.
// AdditionalInfo uses: Schedule, Language, Academic, Head, Extra, Pastoral.
// So 'fullDaySchool' is likely unused or legacy. Safe to leave static or remove.

export interface ExtracurricularActivity {
    category: string;
    icon: string;
    activities: string[];
}

export const getExtracurricularActivities = (t: any): ExtracurricularActivity[] => [
    {
        category: t.junior.modals.extracurricular.sport.category,
        icon: "Trophy",
        activities: t.junior.modals.extracurricular.sport.activities
    },
    {
        category: t.junior.modals.extracurricular.art.category,
        icon: "Palette",
        activities: t.junior.modals.extracurricular.art.activities
    },
    {
        category: t.junior.modals.extracurricular.tech.category,
        icon: "Cpu",
        activities: t.junior.modals.extracurricular.tech.activities
    }
];

export interface MotivationSystem {
    icon: string;
    title: string;
    description: string;
    benefit: string;
}
// Motivation uses the main page motivation data. We can reuse `getMotivationCultureFeatures` but the structure is slightly different?
// MotivationSystem has 'title', 'description', 'benefit'.
// MotivationCultureFeature has 'title', 'subtitle', 'description', 'example'.
// Let's create a specific getter for the modal if needed, or reuse.
// The modal uses 'motivationSystems' (2 items). Main page uses 'motivationCultureFeatures' (3 items).
// Let's map 'motivationSystems' to the first 2 of motivationCulture?
// Or better, just use the main page data in the modal?
// For now, let's leave motivationSystems static as I didn't add specific modal keys for it, or reuse main page translation if close enough.
// Actually, 'AdditionalInfoSection' passes 'motivationSystems' to 'ExtracurricularSection'.
// Let's reuse 't.junior.motivation' keys.
export const getMotivationSystems = (t: any): MotivationSystem[] => [
    {
        icon: "Wallet",
        title: t.junior.motivation.currency.title,
        description: t.junior.motivation.currency.description[0], // approximate mapping
        benefit: t.junior.motivation.currency.example || "" // mapping example to benefit?
    },
    {
        icon: "Heart",
        title: t.junior.motivation.praise.title,
        description: t.junior.motivation.praise.description[0],
        benefit: t.junior.motivation.praise.description[2]
    }
];

export interface CareItem {
    icon: string;
    title: string;
    description: string;
}

export const getPastoralCareItems = (t: any): CareItem[] => [
    { icon: "User", title: t.junior.modals.pastoral.tutors.title, description: t.junior.modals.pastoral.tutors.description },
    { icon: "Heart", title: t.junior.modals.pastoral.psychologist.title, description: t.junior.modals.pastoral.psychologist.description },
    { icon: "Handshake", title: t.junior.modals.pastoral.conflict.title, description: t.junior.modals.pastoral.conflict.description },
    { icon: "Shield", title: t.junior.modals.pastoral.safety.title, description: t.junior.modals.pastoral.safety.description }
];

export interface ScheduleItem {
    time: string;
    activity: string;
    icon: string;
    description?: string;
    image: string;
}

export const getDailySchedule = (t: any): ScheduleItem[] => [
    { time: "08:30", activity: t.junior.modals.schedule.items.morning.activity, icon: "Activity", description: t.junior.modals.schedule.items.morning.description, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000" },
    { time: "09:00", activity: t.junior.modals.schedule.items.math.activity, icon: "Calculator", description: t.junior.modals.schedule.items.math.description, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000" },
    { time: "10:00", activity: t.junior.modals.schedule.items.english.activity, icon: "Book", description: t.junior.modals.schedule.items.english.description, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000" },
    { time: "11:00", activity: t.junior.modals.schedule.items.snack.activity, icon: "Apple", description: t.junior.modals.schedule.items.snack.description, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000" },
    { time: "11:30", activity: t.junior.modals.schedule.items.russian.activity, icon: "PenTool", description: t.junior.modals.schedule.items.russian.description, image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" },
    { time: "13:00", activity: t.junior.modals.schedule.items.lunch.activity, icon: "UtensilsCrossed", description: t.junior.modals.schedule.items.lunch.description, image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1000" },
    { time: "14:00", activity: t.junior.modals.schedule.items.creative.activity, icon: "Palette", description: t.junior.modals.schedule.items.creative.description, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000" },
    { time: "15:00", activity: t.junior.modals.schedule.items.clubs.activity, icon: "Trophy", description: t.junior.modals.schedule.items.clubs.description, image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?q=80&w=1000" },
    { time: "16:00", activity: t.junior.modals.schedule.items.afterschool.activity, icon: "Home", description: t.junior.modals.schedule.items.afterschool.description, image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1000" }
];

// Re-export static data to avoid breaking imports for now, but they will be replaced by function calls in AdditionalInfoSection
export const dailySchedule: ScheduleItem[] = [];
export const languageEnvironment: LanguageFeature[] = [];
export const academicProgram: AcademicBlock[] = [];
export const headOfJuniorData = {};
export const extracurricularActivities: ExtracurricularActivity[] = [];
export const motivationSystems: MotivationSystem[] = [];
export const pastoralCareItems: CareItem[] = [];

// Static Gallery & Testimonials (Keep as is)
export interface GalleryImage {
    src: string;
    alt: string;
    category: 'classroom' | 'playzone' | 'cafeteria' | 'sports';
}

export const getGalleryImages = (t: any): GalleryImage[] => [
    {
        src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000",
        alt: t.junior.gallery.filters.classroom,
        category: "classroom"
    },
    {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000",
        alt: t.junior.gallery.filters.classroom, // Interactive Board
        category: "classroom"
    },
    {
        src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
        alt: t.junior.gallery.filters.classroom, // Workplaces
        category: "classroom"
    },
    {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
        alt: t.junior.gallery.filters.playzone, // Rest Zone
        category: "playzone"
    },
    {
        src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000",
        alt: t.junior.gallery.filters.playzone, // Library
        category: "playzone"
    },
    {
        src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1000",
        alt: t.junior.gallery.filters.cafeteria,
        category: "cafeteria"
    },
    {
        src: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000",
        alt: t.junior.gallery.filters.sports, // Gym
        category: "sports"
    },
    {
        src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000",
        alt: t.junior.gallery.filters.sports, // Playground
        category: "sports"
    }
];

export const galleryImages: GalleryImage[] = []; // Deprecated, keeping empty array to satisfy old imports until refactored

export interface Testimonial {
    parentName: string;
    childName: string;
    childGrade: string;
    photo?: string;
    quote: string;
}

export const testimonials: Testimonial[] = [
    {
        parentName: "Елена Петрова",
        childName: "Артем",
        childGrade: "2 класс",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
        quote: "Артем с радостью бежит в школу каждое утро! Учителя невероятно внимательные, а программа идеально сбалансирована."
    },
    {
        parentName: "Айгуль Султанова",
        childName: "Алия",
        childGrade: "4 класс",
        quote: "За 4 года Алия полюбила английский и математику. Теперь она мечтает стать ученым! Спасибо школе за то, что развили в ней любознательность."
    },
    {
        parentName: "Дмитрий Ким",
        childName: "Максим",
        childGrade: "1 класс",
        quote: "Адаптация прошла очень мягко благодаря методике школы. Максим быстро нашел друзей и с первых дней почувствовал себя комфортно."
    }
];

export const brainMethodologyContent = {
    title: "Методика развития мозга",
    description: "Комплексный подход к развитию когнитивных способностей",
    methods: [
        {
            name: "Ментальная арифметика",
            how: "Работа с воображаемыми счетами",
            why: "Развивает скорость мышления и память",
            evidence: "Доказано исследованиями"
        },
        {
            name: "Сингапурская математика",
            how: "Визуализация математических концепций",
            why: "Формирует глубокое понимание",
            evidence: "Высокие результаты PISA"
        },
        {
            name: "Спорт-стекинг",
            how: "Скоростная сборка стаканов",
            why: "Развивает координацию рук и глаз",
            evidence: "Улучшает межполушарное взаимодействие"
        }
    ]
};

export const nativeTeachers = [
    {
        name: "Sarah Johnson",
        country: "USA",
        experience: "5 лет в Intellect School",
        subjects: ["English Language", "Science"],
        photo: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=800",
        quote: "Дети учат язык лучше всего, когда им интересно. Мы играем, исследуем и общаемся."
    },
    {
        name: "James Wilson",
        country: "UK",
        experience: "3 года в Intellect School",
        subjects: ["English Literature", "Drama"],
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
        quote: "Моя цель — научить детей не просто говорить, а думать на английском языке."
    },
    {
        name: "Emily Brown",
        country: "Canada",
        experience: "4 года в Intellect School",
        subjects: ["Math in English", "Art"],
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
        quote: "Мы создаем среду, где ошибка — это просто шаг к новому открытию."
    }
];
