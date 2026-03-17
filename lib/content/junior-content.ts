import type { PublicLocale } from '@/lib/i18n';

const content = {
    ru: {
        ui: {
            modalClose: 'Закрыть',
            heroWidget: {
                stat: '100%',
                title: 'Native Speakers',
                subtitle: 'из Великобритании, США и Канады',
            },
            philosophyQuote: 'Каждый ребенок — это гений, которого важно вовремя раскрыть',
            lifestyleIntro: {
                title: 'Почему родители выбирают Intellect Primary',
                subtitle: 'Школа берёт на себя учебный день, а вечер остаётся для семьи',
            },
            cognitiveBadge: 'Hard Skills',
            motivationExampleLabel: 'Как это работает',
            testimonials: {
                title: 'Отзывы родителей',
                subtitle: 'Что говорят семьи наших учеников',
                parentLabel: 'Родитель',
            },
            curriculumIntro: {
                title: 'Академический подход',
                subtitle: 'Сбалансированная программа, которая развивает все грани личности ребёнка',
            },
            fullDay: {
                title: 'Школа полного дня',
                subtitle: 'С 08:00 до 17:00 школа берёт на себя обучение, режим, заботу и насыщенный день ребёнка',
                highlightTitle: 'Родители освобождены от вечерних уроков',
                highlightDescription: 'Дома вы отдыхаете, разговариваете и проводите время вместе, потому что учебные задачи уже выполнены в школе под сопровождением педагогов.',
                safetyTitle: 'Безопасность',
                safetyDescription: 'Закрытая территория, контролируемый доступ, Face ID на входе и постоянное медицинское сопровождение создают спокойную среду для ребёнка и родителей.',
                healthTitle: 'Здоровье детей',
                healthDescription: 'Личные шкафчики помогают не носить тяжёлые рюкзаки, а сбалансированное питание и контроль самочувствия поддерживают ребёнка в течение дня.',
            },
            cta: {
                title: 'Готовы дать своему ребёнку сильный старт?',
                description: 'Запишитесь на индивидуальную экскурсию и познакомьтесь с командой Intellect Primary.',
                primaryText: 'Записаться на экскурсию',
                secondaryText: 'Скачать брошюру',
            },
            modals: {
                schedule: {
                    title: 'Один день из жизни',
                    subtitle: 'Как проходит типичный день ученика Intellect Junior',
                },
                language: {
                    title: 'Языковая среда и международные стандарты',
                    subtitle: 'Наше отличие не в количестве уроков, а в том, что английский живёт внутри школьного дня',
                    summaryTitle: 'К концу 4 класса ребёнок свободно взаимодействует в англоязычной среде',
                    summaryDescription: 'Это результат ежедневного контакта с языком на уроках, в проектах, на переменах и во время совместной деятельности.',
                },
                academic: {
                    title: 'Академическая программа',
                    subtitle: 'Обучение строится на интеграции государственного стандарта, когнитивного развития и IT-навыков',
                    extras: [
                        {
                            title: 'Brain Fitness',
                            description: 'Авторские дисциплины для развития памяти, внимания, логики и скорости мышления. Мы используем период максимальной нейропластичности, чтобы сформировать устойчивый интеллектуальный фундамент.',
                        },
                        {
                            title: 'Госстандарт + Cambridge mindset',
                            description: 'Ребёнок получает сильную академическую базу, соответствующую государственным требованиям, и одновременно учится рассуждать, исследовать и применять знания в проектной работе.',
                        },
                    ],
                },
                extracurricular: {
                    title: 'Внеклассная жизнь и мотивация',
                    subtitle: 'Кружки, секции и система поощрения помогают ребёнку пробовать новое, расти и видеть свои сильные стороны',
                    clubsTitle: 'Кружки и секции',
                    motivationTitle: 'Система мотивации',
                    calloutTitle: 'Культура похвалы — часть школьной философии',
                    calloutLead: 'Мы хвалим ребёнка за усилие, инициативу и движение вперёд, а не только за идеальный результат.',
                    calloutText: 'Так формируется уверенность в себе, устойчивость к ошибкам и внутренняя мотивация к развитию.',
                },
                pastoral: {
                    title: 'Забота о каждом ребёнке',
                    subtitle: 'Мы создаём безопасную и поддерживающую среду, где ребёнок чувствует себя замеченным, защищённым и уверенным',
                },
            },
        },
        nested: {
            day: {
                back: 'Назад к программе Intellect Primary',
                heroTitle: 'Один день в Intellect Junior',
                heroDescription: 'Режим полного дня выстроен так, чтобы ребёнок успевал учиться, отдыхать, двигаться и раскрывать интерес к новому без перегруза.',
                menuTitle: 'Примерное меню на неделю',
                menuSections: [
                    { title: '🍳 Завтрак', items: ['Каша (овсяная, гречневая)', 'Яйца, сырники', 'Чай, какао', 'Фрукты'] },
                    { title: '🍲 Обед', items: ['Суп (лагман, шурпа)', 'Плов, манты, котлеты', 'Овощной салат', 'Компот, сок'] },
                    { title: '🥐 Полдник', items: ['Выпечка (самса, булочки)', 'Йогурт, творог', 'Фрукты, орехи', 'Чай, молоко'] },
                ],
                menuFootnote: 'Все блюда халяльные и разработаны с учётом потребностей растущего организма.',
                clubsTitle: 'Кружки и секции',
                clubs: [
                    { icon: '♟️', title: 'Шахматы', description: 'Развитие стратегического мышления' },
                    { icon: '🎨', title: 'Рисование', description: 'Творческое самовыражение' },
                    { icon: '🥋', title: 'Каратэ', description: 'Физическое развитие и дисциплина' },
                    { icon: '💃', title: 'Танцы', description: 'Координация и артистизм' },
                    { icon: '🤖', title: 'Робототехника', description: 'STEM-образование' },
                    { icon: '🎵', title: 'Музыка', description: 'Игра на инструментах' },
                ],
                ctaTitle: 'Хотите увидеть школу своими глазами?',
                ctaButton: 'Записаться на экскурсию',
            },
            brain: {
                back: 'Назад к программе Intellect Primary',
                heroTitle: 'Методика развития мозга',
                heroDescription: 'Мы используем научно обоснованный подход к развитию памяти, внимания, логики и скорости мышления у детей 6–10 лет.',
                windowTitle: 'Почему возраст 6–10 лет называют золотым окном развития',
                windowDescription: 'В этот период мозг ребёнка особенно пластичен. Новые нейронные связи формируются быстрее, а значит навыки закрепляются глубже и устойчивее.',
                stats: [
                    { value: '2–3x', label: 'быстрее формируются новые нейронные связи' },
                    { value: '700', label: 'новых связей в секунду может формироваться в активной фазе обучения' },
                    { value: '90%', label: 'базовой архитектуры мозга формируется к 10 годам' },
                ],
                labels: {
                    how: 'Как это работает?',
                    why: 'Зачем это нужно?',
                    evidence: 'Научная опора',
                },
                methods: [
                    {
                        name: 'Ментальная арифметика',
                        how: 'Работа с воображаемыми счётами и числовыми образами',
                        why: 'Развивает скорость мышления, память и устойчивое внимание',
                        evidence: 'Используется как часть программ развития когнитивной гибкости и рабочей памяти',
                    },
                    {
                        name: 'Сингапурская математика',
                        how: 'Переход от визуальной модели к абстрактному мышлению',
                        why: 'Формирует глубокое понимание математических связей и смысла операций',
                        evidence: 'Подход признан одним из самых сильных в мире по качеству математической подготовки',
                    },
                    {
                        name: 'Спорт-стекинг',
                        how: 'Скоростная координационная практика с повторяющимися паттернами движений',
                        why: 'Улучшает координацию, межполушарное взаимодействие и концентрацию',
                        evidence: 'Используется в нейромоторных тренировках как инструмент развития внимания и реакции',
                    },
                ],
                infographicTitle: 'Как нейроны создают новые связи',
                infographicSteps: [
                    'Новый опыт: ребёнок сталкивается с задачей, которую нужно понять и решить.',
                    'Активация нейронов: мозг начинает обрабатывать информацию и искать закономерности.',
                    'Повторение: регулярная практика укрепляет связи и делает навык устойчивым.',
                    'Результат: ребёнок быстрее считает, лучше запоминает и увереннее концентрируется.',
                ],
                ctaTitle: 'Готовы развивать мозг ребёнка системно?',
                ctaButton: 'Записаться на экскурсию',
            },
            english: {
                back: 'Назад к программе Intellect Primary',
                heroTitle: 'Английская среда с Native Speakers',
                heroDescription: 'Для ребёнка английский становится естественным инструментом общения, а не отдельным предметом в расписании.',
                reasonsTitle: 'Почему важно слышать носителя языка с раннего возраста',
                reasons: [
                    {
                        icon: '👂',
                        title: 'Правильное произношение',
                        description: 'До 10 лет ребёнок особенно тонко различает звуки языка. Это помогает сформировать чистое произношение и естественный ритм речи.',
                    },
                    {
                        icon: '💬',
                        title: 'Живая речь, а не учебный шаблон',
                        description: 'Носители языка приносят в класс естественные интонации, повседневные фразы и культурный контекст, который невозможно передать только по учебнику.',
                    },
                    {
                        icon: '🎯',
                        title: 'Снятие языкового барьера',
                        description: 'Когда ребёнок регулярно разговаривает с иностранными педагогами, английский перестаёт быть “страшным предметом” и становится средством взаимодействия.',
                    },
                    {
                        icon: '🌍',
                        title: 'Подготовка к глобальному будущему',
                        description: 'Мы формируем уверенность в международной коммуникации и привычку учиться в многоязычной среде уже с начальной школы.',
                    },
                ],
                coteachingTitle: 'Как работает co-teaching',
                coteachingSubtitle: 'Два педагога внутри одного учебного процесса',
                coteachingItems: [
                    'Основной учитель ведёт урок и удерживает академическую структуру занятия.',
                    'Native Speaker присутствует на уроке, помогает с произношением, вопросами и живым общением.',
                    'Дети слышат английский не только на английском, но и во время интегрированных предметов и проектов.',
                    'На переменах, обедах и внеурочной деятельности английский закрепляется в естественной коммуникации.',
                ],
                immersionTitle: 'Результаты погружения',
                immersionStats: [
                    { value: '8–10', label: 'часов английского в неделю' },
                    { value: 'B1–B2', label: 'рабочий уровень к завершению primary school у сильных учеников' },
                    { value: '3', label: 'native-speaking педагога в команде Junior School' },
                ],
                teamTitle: 'Познакомьтесь с нашей международной командой',
                galleryTitle: 'Английский в действии',
                gallery: [
                    { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1000', caption: 'Reading corner with Miss Sarah' },
                    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000', caption: 'Science exploration with Mr. James' },
                ],
                ctaTitle: 'Приходите познакомиться с нашей командой',
                ctaButton: 'Записаться на экскурсию',
            },
        },
    },
    en: {
        ui: {
            modalClose: 'Close',
            heroWidget: {
                stat: '100%',
                title: 'Native Speakers',
                subtitle: 'from the UK, USA, and Canada',
            },
            philosophyQuote: 'Every child is a genius whose potential deserves to be discovered in time',
            lifestyleIntro: {
                title: 'Why Families Choose Intellect Primary',
                subtitle: 'The school carries the learning day, and the evening returns to the family',
            },
            cognitiveBadge: 'Hard Skills',
            motivationExampleLabel: 'How it works',
            testimonials: {
                title: 'Parent Voices',
                subtitle: 'What our families say about the Intellect Primary experience',
                parentLabel: 'Parent of',
            },
            curriculumIntro: {
                title: 'Academic Approach',
                subtitle: 'A balanced program that develops every side of a child’s growth',
            },
            fullDay: {
                title: 'Full-Day School',
                subtitle: 'From 08:00 to 17:00, the school takes care of learning, rhythm, support, and a rich day for every child',
                highlightTitle: 'Parents are free from evening homework routines',
                highlightDescription: 'At home, you can rest, talk, and spend real time together because the academic work has already been completed at school with teacher guidance.',
                safetyTitle: 'Safety',
                safetyDescription: 'A gated campus, controlled access, Face ID entry, and continuous medical support create a calm and protected environment for children and families.',
                healthTitle: 'Child Wellbeing',
                healthDescription: 'Personal lockers reduce heavy bags, while balanced meals and wellbeing checks support each child throughout the school day.',
            },
            cta: {
                title: 'Ready to give your child a strong start?',
                description: 'Book a personal school tour and meet the Intellect Primary team.',
                primaryText: 'Book a school tour',
                secondaryText: 'Download brochure',
            },
            modals: {
                schedule: {
                    title: 'A Day in School Life',
                    subtitle: 'How a typical day unfolds for an Intellect Junior student',
                },
                language: {
                    title: 'Language Environment and International Standards',
                    subtitle: 'Our difference is not the number of lessons, but the fact that English lives inside the school day',
                    summaryTitle: 'By the end of grade 4, a child can interact confidently in an English-speaking environment',
                    summaryDescription: 'This is the result of daily contact with the language in lessons, projects, breaks, and shared routines.',
                },
                academic: {
                    title: 'Academic Program',
                    subtitle: 'Learning combines the national standard, cognitive development, and early IT literacy',
                    extras: [
                        {
                            title: 'Brain Fitness',
                            description: 'Proprietary disciplines develop memory, attention, logic, and mental speed. We use the period of maximum neuroplasticity to build a durable intellectual foundation.',
                        },
                        {
                            title: 'National Standard + Cambridge Mindset',
                            description: 'Children receive a strong academic base aligned with national expectations while also learning to question, investigate, and apply knowledge through projects.',
                        },
                    ],
                },
                extracurricular: {
                    title: 'Beyond the Classroom and Motivation',
                    subtitle: 'Clubs, sections, and a thoughtful reward system help children try new things, grow, and recognise their strengths',
                    clubsTitle: 'Clubs and Activities',
                    motivationTitle: 'Motivation System',
                    calloutTitle: 'A culture of praise is part of our philosophy',
                    calloutLead: 'We praise effort, initiative, and growth, not only perfect results.',
                    calloutText: 'That helps children build confidence, resilience to mistakes, and inner motivation to keep developing.',
                },
                pastoral: {
                    title: 'Care for Every Child',
                    subtitle: 'We create a safe and supportive environment where every child feels seen, protected, and confident',
                },
            },
        },
        nested: {
            day: {
                back: 'Back to Intellect Primary',
                heroTitle: 'A Day at Intellect Junior',
                heroDescription: 'Our full-day rhythm helps children learn, rest, move, and explore new interests without overload.',
                menuTitle: 'Sample Weekly Menu',
                menuSections: [
                    { title: '🍳 Breakfast', items: ['Porridge (oat or buckwheat)', 'Eggs and syrniki', 'Tea or cocoa', 'Fresh fruit'] },
                    { title: '🍲 Lunch', items: ['Soup (lagman or shurpa)', 'Pilaf, manty, or cutlets', 'Vegetable salad', 'Compote or juice'] },
                    { title: '🥐 Afternoon Snack', items: ['Pastries and buns', 'Yogurt or cottage cheese', 'Fruit and nuts', 'Tea or milk'] },
                ],
                menuFootnote: 'All meals are halal and designed with the needs of a growing child in mind.',
                clubsTitle: 'Clubs and Activities',
                clubs: [
                    { icon: '♟️', title: 'Chess', description: 'Strategic thinking and concentration' },
                    { icon: '🎨', title: 'Art', description: 'Creative expression and observation' },
                    { icon: '🥋', title: 'Karate', description: 'Physical development and discipline' },
                    { icon: '💃', title: 'Dance', description: 'Coordination, rhythm, and expression' },
                    { icon: '🤖', title: 'Robotics', description: 'Early STEM exploration' },
                    { icon: '🎵', title: 'Music', description: 'Instrumental and musical development' },
                ],
                ctaTitle: 'Would you like to see the school in person?',
                ctaButton: 'Book a school tour',
            },
            brain: {
                back: 'Back to Intellect Primary',
                heroTitle: 'Brain Development Methodology',
                heroDescription: 'We use an evidence-informed approach to strengthen memory, attention, logic, and thinking speed in children aged 6 to 10.',
                windowTitle: 'Why ages 6–10 are considered a golden window for development',
                windowDescription: 'At this stage, a child’s brain is especially plastic. New neural connections form faster, which means skills can take root more deeply and more sustainably.',
                stats: [
                    { value: '2–3x', label: 'faster formation of new neural connections' },
                    { value: '700', label: 'new connections per second can emerge during active learning' },
                    { value: '90%', label: 'of core brain architecture develops by age 10' },
                ],
                labels: {
                    how: 'How does it work?',
                    why: 'Why does it matter?',
                    evidence: 'Evidence base',
                },
                methods: [
                    {
                        name: 'Mental Arithmetic',
                        how: 'Children work with imagined abacus structures and number imagery',
                        why: 'It strengthens thinking speed, memory, and sustained attention',
                        evidence: 'Widely used in cognitive development programs that target working memory and mental flexibility',
                    },
                    {
                        name: 'Singapore Math',
                        how: 'Concepts move from visual models toward structured abstract thinking',
                        why: 'It builds a deep understanding of mathematical relationships, not just procedures',
                        evidence: 'The approach is globally recognised for the strength of its mathematics outcomes',
                    },
                    {
                        name: 'Sport Stacking',
                        how: 'A high-speed coordination routine built on repeated movement patterns',
                        why: 'It improves coordination, interhemispheric cooperation, and concentration',
                        evidence: 'Used in neuromotor development settings to strengthen focus and reaction',
                    },
                ],
                infographicTitle: 'How neurons build new connections',
                infographicSteps: [
                    'A new experience: the child meets a challenge that must be understood and solved.',
                    'Neural activation: the brain begins processing information and seeking patterns.',
                    'Repetition: regular practice strengthens the pathway and stabilises the skill.',
                    'Result: the child calculates faster, remembers more, and focuses with greater confidence.',
                ],
                ctaTitle: 'Ready to develop your child’s brain systematically?',
                ctaButton: 'Book a school tour',
            },
            english: {
                back: 'Back to Intellect Primary',
                heroTitle: 'An English Environment with Native Speakers',
                heroDescription: 'For a child, English becomes a natural tool for communication rather than a separate subject on the timetable.',
                reasonsTitle: 'Why hearing native English early matters',
                reasons: [
                    {
                        icon: '👂',
                        title: 'Natural pronunciation',
                        description: 'Before age 10, children are especially sensitive to language sounds. That helps them build clear pronunciation and a natural rhythm of speech.',
                    },
                    {
                        icon: '💬',
                        title: 'Living language, not textbook language',
                        description: 'Native speakers bring real intonation, everyday phrasing, and cultural context that no textbook can fully reproduce.',
                    },
                    {
                        icon: '🎯',
                        title: 'No language barrier',
                        description: 'When children communicate regularly with international teachers, English stops feeling like a frightening subject and becomes a working tool.',
                    },
                    {
                        icon: '🌍',
                        title: 'Preparation for a global future',
                        description: 'We build confidence for international communication and the habit of learning in a multilingual environment from the earliest school years.',
                    },
                ],
                coteachingTitle: 'How co-teaching works',
                coteachingSubtitle: 'Two educators inside one learning process',
                coteachingItems: [
                    'The lead teacher drives the lesson and holds the academic structure.',
                    'The Native Speaker supports pronunciation, interaction, questions, and live communication.',
                    'Children hear English not only in English class, but across integrated lessons and projects.',
                    'During breaks, lunch, and enrichment time, English is reinforced through natural communication.',
                ],
                immersionTitle: 'Outcomes of immersion',
                immersionStats: [
                    { value: '8–10', label: 'hours of English each week' },
                    { value: 'B1–B2', label: 'working level by the end of primary for strong learners' },
                    { value: '3', label: 'native-speaking educators in the Junior School team' },
                ],
                teamTitle: 'Meet Our International Team',
                galleryTitle: 'English in Action',
                gallery: [
                    { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1000', caption: 'Reading corner with Miss Sarah' },
                    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000', caption: 'Science exploration with Mr. James' },
                ],
                ctaTitle: 'Come and meet our team',
                ctaButton: 'Book a school tour',
            },
        },
    },
} as const;

export function getJuniorContent(locale: PublicLocale) {
    return content[locale];
}
