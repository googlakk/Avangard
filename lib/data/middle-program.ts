
// Данные для страницы Intellect Middle (5-9 классы) - REFACTORED
// Новая структура: 4 блока + Доказательства

export const getAcademicBreakthroughData = (t: any) => ({
    title: t.middle.hero.title,
    subtitle: t.middle.hero.subtitle,
    description: t.middle.hero.description,
    ctaText: t.middle.hero.ctaText,
    ctaLink: "/admissions",
    backgroundImage: "/images/middle-entrance-group.png",
});

export const getDisciplineEnvironmentData = (t: any) => ({
    title: t.middle.discipline.title,
    subtitle: t.middle.discipline.subtitle,
    features: [
        {
            icon: "PhoneOff",
            title: t.middle.discipline.features.detox.title,
            description: t.middle.discipline.features.detox.description,
            highlight: t.middle.discipline.features.detox.highlight
        },
        {
            icon: "Home",
            title: t.middle.discipline.features.club.title,
            description: t.middle.discipline.features.club.description,
            highlight: t.middle.discipline.features.club.highlight
        },
        {
            icon: "Handshake",
            title: t.middle.discipline.features.environment.title,
            description: t.middle.discipline.features.environment.description,
            highlight: t.middle.discipline.features.environment.highlight
        }
    ],
    proofImage: "/images/Гимн абду.png",
    proofCaption: t.middle.discipline.features.photoProof.caption
});

export const getTwentyFirstSkillsData = (t: any) => ({
    title: t.middle.skills.title,
    subtitle: t.middle.skills.subtitle,
    skills: [
        {
            icon: "Code2",
            title: t.middle.skills.items.coding.title,
            description: t.middle.skills.items.coding.description,
        },
        {
            icon: "Wallet",
            title: t.middle.skills.items.currency.title,
            description: t.middle.skills.items.currency.description,
        },
        {
            icon: "MessageCircle",
            title: t.middle.skills.items.soft.title,
            description: t.middle.skills.items.soft.description,
        }
    ],
    proofImage: "/Users/intellectmac/.gemini/antigravity/brain/5dfee3b6-c7c1-4d72-8534-1c2033e049e3/middle_coding_currency_1769397394322.png",
    proofCaption: t.middle.skills.photoProof.caption
});

export const getLeadershipGovernanceData = (t: any) => ({
    title: t.middle.leadership.title,
    subtitle: t.middle.leadership.subtitle,
    features: [
        {
            icon: "Target",
            title: t.middle.leadership.items.clubs.title,
            description: t.middle.leadership.items.clubs.description,
        },
        {
            icon: "TrendingUp",
            title: t.middle.leadership.items.projects.title,
            description: t.middle.leadership.items.projects.description,
        },
        {
            icon: "Award",
            title: t.middle.leadership.items.competition.title,
            description: t.middle.leadership.items.competition.description,
        }
    ],
    ctaText: t.middle.leadership.ctaText,
    ctaLink: "/admissions",
    proofImage: "/Users/intellectmac/.gemini/antigravity/brain/5dfee3b6-c7c1-4d72-8534-1c2033e049e3/middle_student_presenting_1769397412463.png",
    proofCaption: t.middle.leadership.photoProof.caption
});

export const getMiddleCTAData = (t: any) => ({
    title: t.middle.cta.title,
    description: t.middle.cta.description,
    primaryCTA: {
        text: t.middle.cta.buttons.primary,
        link: "/admissions"
    },
    secondaryCTA: {
        text: t.middle.cta.buttons.secondary,
        link: "/downloads/middle-brochure.pdf"
    }
});

// Deep-dive pages data (Modals)
export const getCambridgePathwayDetailData = (t: any) => ({
    title: t.middle.modals.cambridge.title,
    subtitle: t.middle.modals.cambridge.subtitle,
    description: t.middle.modals.cambridge.description,
    subjects: [
        {
            name: "Mathematics",
            grade: "6-9 классы", // TODO: Translate grades if needed
            description: t.middle.modals.cambridge.subjects.math.description,
            textbooks: ["Cambridge Lower Secondary Mathematics", "Cambridge Checkpoint Mathematics"]
        },
        {
            name: "Science (Physics, Chemistry, Biology)",
            grade: "6-9 классы",
            description: t.middle.modals.cambridge.subjects.science.description,
            textbooks: ["Cambridge Lower Secondary Science", "Cambridge Checkpoint Science"]
        },
        {
            name: "Computer Science",
            grade: "6-9 классы",
            description: t.middle.modals.cambridge.subjects.cs.description,
            textbooks: ["Cambridge IGCSE Computer Science"]
        }
    ],
    secondLanguage: {
        title: t.middle.modals.cambridge.secondLang.title,
        options: ["Немецкий", "Корейский"], // TODO: Translate options
        description: t.middle.modals.cambridge.secondLang.description
    },
    pathway: [
        {
            grade: "6-7 классы",
            stage: "Cambridge Lower Secondary",
            description: t.middle.modals.cambridge.pathway.lower.description
        },
        {
            grade: "8-9 классы",
            stage: "Cambridge Checkpoint",
            description: t.middle.modals.cambridge.pathway.checkpoint.description
        }
    ]
});

export const getItSteamDetailData = (t: any) => ({
    title: t.middle.modals.steam.title,
    subtitle: t.middle.modals.steam.subtitle,
    description: t.middle.modals.steam.description,
    infrastructure: {
        title: t.middle.modals.steam.infrastructure.title,
        items: t.middle.modals.steam.infrastructure.items
    },
    projects: [
        {
            title: t.middle.modals.steam.projects.web.title,
            description: t.middle.modals.steam.projects.web.description,
        },
        {
            title: t.middle.modals.steam.projects.games.title,
            description: t.middle.modals.steam.projects.games.description,
        },
        {
            title: t.middle.modals.steam.projects.robots.title,
            description: t.middle.modals.steam.projects.robots.description,
        }
    ]
});

export const getLifeInMiddleData = (t: any) => ({
    title: t.middle.modals.life.title,
    subtitle: t.middle.modals.life.subtitle,
    sections: [
        { name: t.middle.modals.life.sections.football, category: t.middle.modals.life.sections.sport, schedule: t.middle.modals.life.schedule.threeTimes },
        { name: t.middle.modals.life.sections.volleyball, category: t.middle.modals.life.sections.sport, schedule: t.middle.modals.life.schedule.twoTimes },
        { name: t.middle.modals.life.sections.chess, category: t.middle.modals.life.sections.intellect, schedule: t.middle.modals.life.schedule.twoTimes },
        { name: t.middle.modals.life.sections.komuz, category: t.middle.modals.life.sections.art, schedule: t.middle.modals.life.schedule.oneTime },
        { name: t.middle.modals.life.sections.dance, category: t.middle.modals.life.sections.art, schedule: t.middle.modals.life.schedule.twoTimes }
    ],
    clubs: {
        title: t.middle.modals.life.clubs.title,
        description: t.middle.modals.life.clubs.description
    },
    currencyStories: [
        {
            student: t.middle.modals.life.currencyStories[0].name,
            achievement: t.middle.modals.life.currencyStories[0].achievement
        },
        {
            student: t.middle.modals.life.currencyStories[1].name,
            achievement: t.middle.modals.life.currencyStories[1].achievement
        }
    ]
});

export const getHouseSystemData = (t: any) => ({
    title: t.middle.modals.house.title,
    subtitle: t.middle.modals.house.subtitle,
    description: t.middle.modals.house.description,
    houses: [
        { name: "Phoenix", color: "#FF6B35", values: t.middle.modals.house.values.phoenix, icon: "Flame" },
        { name: "Dragon", color: "#004E89", values: t.middle.modals.house.values.dragon, icon: "Sparkles" },
        { name: "Eagle", color: "#F7B801", values: t.middle.modals.house.values.eagle, icon: "Star" },
        { name: "Lion", color: "#9B59B6", values: t.middle.modals.house.values.lion, icon: "Users" }
    ],
    competitions: t.middle.modals.house.competitions,
    benefits: t.middle.modals.house.benefits
});

export const getTransitionSupportData = (t: any) => ({
    title: t.middle.modals.transition.title,
    subtitle: t.middle.modals.transition.subtitle,
    description: t.middle.modals.transition.description,
    features: [
        { icon: "Users", title: t.middle.modals.transition.features.buddy.title, description: t.middle.modals.transition.features.buddy.description, highlight: "Наставничество" },
        { icon: "BookOpen", title: t.middle.modals.transition.features.bridge.title, description: t.middle.modals.transition.features.bridge.description, highlight: "Поддержка" },
        { icon: "MessageSquare", title: t.middle.modals.transition.features.psy.title, description: t.middle.modals.transition.features.psy.description, highlight: "Адаптация" },
        { icon: "UserCheck", title: t.middle.modals.transition.features.parents.title, description: t.middle.modals.transition.features.parents.description, highlight: "Обратная связь" }
    ]
});

export const getSkillsDevelopmentData = (t: any) => ({
    title: t.middle.modals.skills.title,
    subtitle: t.middle.modals.skills.subtitle,
    description: t.middle.modals.skills.description,
    skills: [
        { title: t.middle.modals.skills.items.critical.title, description: t.middle.modals.skills.items.critical.description, icon: "Brain", outcome: "Аналитичность" },
        { title: t.middle.modals.skills.items.comm.title, description: t.middle.modals.skills.items.comm.description, icon: "MessageCircle", outcome: "Уверенность" },
        { title: t.middle.modals.skills.items.creative.title, description: t.middle.modals.skills.items.creative.description, icon: "Palette", outcome: "Инновации" },
        { title: t.middle.modals.skills.items.collab.title, description: t.middle.modals.skills.items.collab.description, icon: "Users", outcome: "Лидерство" }
    ]
});

export const getBeyondClassroomData = (t: any) => ({
    title: t.middle.beyondClassroom.title,
    subtitle: t.middle.beyondClassroom.subtitle,
    description: t.middle.beyondClassroom.description,
    activities: [
        { title: t.middle.beyondClassroom.activities.sports.title, description: t.middle.beyondClassroom.activities.sports.description, image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800" },
        { title: t.middle.beyondClassroom.activities.arts.title, description: t.middle.beyondClassroom.activities.arts.description, image: "https://images.unsplash.com/photo-1544131802-e3c6395dc7c9?q=80&w=800" },
        { title: t.middle.beyondClassroom.activities.science.title, description: t.middle.beyondClassroom.activities.science.description, image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?q=80&w=800" },
        { title: t.middle.beyondClassroom.activities.traditions.title, description: t.middle.beyondClassroom.activities.traditions.description, image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800" }
    ]
});

// Re-export empty static objects if needed to prevent build breakages in pages not yet updated
// but Middle Program Page is the only consumer.
export const academicBreakthroughData = {};
export const disciplineEnvironmentData = {};
export const twentyFirstSkillsData = {};
export const leadershipGovernanceData = {};
export const middleCTAData = {};
export const cambridgePathwayDetailData = {
    title: "Cambridge Pathway",
    subtitle: "Международная программа",
    description: "Путь к поступлению в лучшие университеты мира через британскую систему образования.",
    subjects: [
        {
            name: "Mathematics",
            grade: "6-9 классы",
            description: "Математика на английском языке по кембриджской программе.",
            textbooks: ["Cambridge Lower Secondary Mathematics", "Cambridge Checkpoint Mathematics"]
        },
        {
            name: "Science",
            grade: "6-9 классы",
            description: "Естественные науки (физика, химия, биология) на английском.",
            textbooks: ["Cambridge Lower Secondary Science", "Cambridge Checkpoint Science"]
        },
        {
            name: "Computer Science",
            grade: "6-9 классы",
            description: "Информатика и программирование.",
            textbooks: ["Cambridge IGCSE Computer Science"]
        }
    ],
    secondLanguage: {
        title: "Второй иностранный язык",
        options: ["Немецкий", "Корейский"],
        description: "Возможность изучения второго языка с носителем."
    },
    pathway: [
        {
            grade: "6-7 классы",
            stage: "Cambridge Lower Secondary",
            description: "Базовая ступень"
        },
        {
            grade: "8-9 классы",
            stage: "Cambridge Checkpoint",
            description: "Подготовка к экзаменам"
        }
    ]
};
export const itSteamDetailData = {
    title: "IT & STEAM",
    subtitle: "Технологии будущего",
    description: "Развитие инженерного мышления и навыков программирования.",
    infrastructure: {
        title: "Оборудование",
        items: ["3D принтеры", "Робототехнические наборы", "Компьютерный класс"]
    },
    projects: [
        { title: "Web Development", description: "Создание сайтов" },
        { title: "Game Dev", description: "Разработка игр" }
    ]
};

export const lifeInMiddleData = {
    title: "Жизнь в школе",
    subtitle: "Больше чем уроки",
    sections: [
        { name: "Футбол", category: "Sport", schedule: "3 раза в неделю" },
        { name: "Шахматы", category: "Intellect", schedule: "2 раза в неделю" }
    ],
    clubs: { title: "Клубы по интересам", description: "Широкий выбор секций." },
    currencyStories: [
        { student: "Амир", achievement: "Накопил на телескоп" },
        { student: "Дарья", achievement: "Купила билеты в кино" }
    ]
};

export const houseSystemData = {
    title: "Система Домов",
    subtitle: "Командный дух",
    description: "Соревнование между факультетами (Houses).",
    houses: [
        { name: "Phoenix", color: "#FF6B35", values: ["Смелость"], icon: "Flame" },
        { name: "Dragon", color: "#004E89", values: ["Мудрость"], icon: "Sparkles" }
    ],
    competitions: "Ежемесячные соревнования",
    benefits: ["Развитие лидерства"]
};

export const transitionSupportData = {
    title: "Поддержка перехода",
    subtitle: "Адаптация 5 класса",
    description: "Помогаем мягко перейти из начальной школы.",
    features: [
        { icon: "Users", title: "Бадди-система", description: "Старшие помогают младшим", highlight: "Наставничество" }
    ]
};

export const skillsDevelopmentData = {
    title: "Soft Skills",
    subtitle: "Навыки 21 века",
    description: "Развиваем не только академические знания.",
    skills: [
        { title: "Критическое мышление", description: "Умение анализировать", icon: "Brain", outcome: "Аналитичность" }
    ]
};

export const beyondClassroomData = {}; // Keeping this one empty if not critical or populated later
