import type { PublicLocale } from '@/lib/i18n';

const sitePages = {
    ru: {
        parents: {
            academics: {
                hero: {
                    title: 'Образовательная среда',
                    subtitle: 'Система обучения, построенная на преемственности и индивидуальном подходе от 1 до 11 класса.',
                    imageAlt: 'Учебный процесс',
                },
                stages: {
                    title: 'Три ступени развития',
                    subtitle: 'Каждая школьная ступень отвечает задачам возраста и помогает детям расти без перегруза.',
                    more: 'Подробнее',
                    items: [
                        {
                            title: 'Intellect Primary',
                            badge: '1–4 классы',
                            description: 'Мягкая адаптация к школе, развитие эмоционального интеллекта, ментальная арифметика и углублённый английский в игровой форме.',
                            bullets: ['Полный день до 17:00', 'Развитие soft skills'],
                            href: '/programs/primary',
                            image: '/images/junior-morning-exercise.png',
                            imageAlt: 'Intellect Primary',
                        },
                        {
                            title: 'Intellect Middle',
                            badge: '5–9 классы',
                            description: 'Фундаментальные предметы, проектная деятельность, начало профориентации и подготовка к олимпиадам.',
                            bullets: ['Углублённая математика', 'IT и робототехника'],
                            href: '/programs/middle',
                            image: '/images/middle-entrance-group.png',
                            imageAlt: 'Intellect Middle',
                        },
                        {
                            title: 'Intellect Senior',
                            badge: '10–11 классы',
                            description: 'Индивидуальные треки обучения, подготовка к ОРТ и IELTS/TOEFL, помощь с поступлением в зарубежные вузы.',
                            bullets: ['Career guidance', 'Подготовка к university'],
                            href: '/programs/senior',
                            image: '/images/senior-medalists.png',
                            imageAlt: 'Intellect Senior',
                        },
                    ],
                },
                focus: {
                    title: 'Академический фокус',
                    items: [
                        { name: 'Математика', icon: 'Calculator', desc: 'Углублённое изучение' },
                        { name: 'Английский язык', icon: 'Globe', desc: 'Cambridge и международные экзамены' },
                        { name: 'IT и программирование', icon: 'Code2', desc: 'Python, web и цифровая грамотность' },
                        { name: 'Естественные науки', icon: 'Microscope', desc: 'Лабораторная практика и исследования' },
                        { name: 'Ментальная арифметика', icon: 'Brain', desc: 'Тренировка памяти и скорости мышления' },
                        { name: 'История', icon: 'BookOpen', desc: 'Критическое мышление и контекст' },
                        { name: 'Спорт', icon: 'Trophy', desc: 'Физическое развитие и дисциплина' },
                        { name: 'Искусство', icon: 'Palette', desc: 'Творческий потенциал' },
                    ],
                },
                extracurricular: {
                    title: 'Кружки и секции',
                    subtitle: 'Таланты раскрываются не только на уроках. После школы дети выбирают занятия, которые помогают им пробовать новое и расти.',
                    imageAlt: 'Дети на кружках',
                    columns: [
                        ['Шахматы', 'Робототехника', 'Тхэквондо', 'Хореография'],
                        ['ИЗО студия', 'Дебатный клуб', 'Футбол', 'Вокал'],
                    ],
                },
            },
            admission: {
                hero: {
                    title: 'Процесс поступления',
                    subtitle: 'Прозрачный и понятный путь к качественному образованию.',
                    imageAlt: 'Процесс поступления',
                },
                steps: [
                    { number: '01', title: 'Консультация', text: 'Свяжитесь с нами, чтобы задать вопросы, познакомиться со школой и выбрать удобный следующий шаг.' },
                    { number: '02', title: 'Тестирование', text: 'Мы проводим входную диагностику по русскому языку, английскому языку и математике, чтобы определить уровень ребёнка.' },
                    { number: '03', title: 'Заключение договора', text: 'После успешного прохождения тестирования мы оформляем договор на обучение.' },
                    { number: '04', title: 'Подача документов', text: 'Личное дело ребёнка, копия свидетельства о рождении и копии паспортов родителей.' },
                    { number: '05', title: 'Медицинские справки', text: 'Справки формы №026 и №063, справка о месте жительства и фотография 3x4.' },
                    { number: '06', title: 'Зачисление', text: 'После завершения всех шагов ребёнок получает место в школе и доступ к школьным сервисам.' },
                ],
                documents: {
                    title: 'Необходимые документы',
                    items: [
                        'Личное дело учащегося',
                        'Копия свидетельства о рождении',
                        'Копии паспортов родителей',
                        'Адресная справка',
                        'Медицинская карта (форма №026)',
                        'Паспорт здоровья (форма №063)',
                        'Фотографии 3x4 (2 шт.)',
                        'Табель успеваемости при переводе',
                    ],
                    button: 'Связаться с приёмной комиссией',
                },
            },
            care: {
                hero: {
                    title: 'Забота о самом главном',
                    subtitle: 'Здоровье, безопасность и психологический комфорт ребёнка создают основу для его уверенного роста.',
                    imageAlt: 'Безопасность и забота',
                },
                security: {
                    tag: 'Безопасность',
                    title: 'Территория под защитой',
                    text: 'Школа находится на закрытой охраняемой территории, а доступ в здание контролируется на каждом этапе дня.',
                    imageAlt: 'Пост охраны',
                    items: [
                        'Круглосуточное видеонаблюдение по периметру',
                        'Пропускная система с контролем доступа',
                        'Профессиональная служба охраны',
                        'Тревожные кнопки и протоколы реагирования',
                    ],
                },
                health: {
                    tag: 'Здоровье',
                    title: 'Медицина и психология',
                    text: 'В школе постоянно находится медицинский персонал, а психологическая поддержка помогает детям чувствовать себя спокойно и уверенно.',
                    imageAlt: 'Медицинский кабинет',
                    items: [
                        'Медсестра и регулярный контроль самочувствия',
                        'Профилактические осмотры в течение года',
                        'Штатный психолог для поддержки учеников',
                        'Сенсорная разгрузка и забота о wellbeing',
                    ],
                },
            },
            faq: {
                heroTitle: 'Вопросы и ответы',
                heroAlt: 'Вопросы и ответы',
                items: [
                    {
                        question: 'Какой размер классов в школе?',
                        answer: 'Средняя наполняемость класса около 20 учеников. Это позволяет выстраивать индивидуальную траекторию и уделять внимание каждому ребёнку.',
                    },
                    {
                        question: 'Как организовано питание?',
                        answer: 'Мы обеспечиваем сбалансированное трёхразовое питание: завтрак, обед и полдник. При необходимости учитываем медицинские рекомендации.',
                    },
                    {
                        question: 'Есть ли развозка?',
                        answer: 'Да, школа предоставляет трансфер. Маршруты формируются по районам, а детей сопровождает взрослый.',
                    },
                    {
                        question: 'Обязательна ли школьная форма?',
                        answer: 'Да, в школе действует деловой стиль и фирменная форма для официальных мероприятий. Это помогает создавать чувство общности и дисциплины.',
                    },
                ],
            },
            values: {
                hero: {
                    title: 'Будущее начинается здесь',
                    subtitle: 'Мы раскрываем потенциал ребёнка в безопасной среде, где высокие ожидания сочетаются с уважением и поддержкой.',
                    imageAlt: 'Ученики в библиотеке',
                },
                stats: [
                    { value: '5', label: 'Лет устойчивого роста' },
                    { value: '~20', label: 'Учеников в классе' },
                    { value: '24/7', label: 'Охрана территории' },
                ],
                achievements: {
                    title: 'Ключевые достижения',
                    points: [
                        'Разработали авторские методики вместе с сильнейшими педагогами страны',
                        'Стали представителями международных чемпионатов по ментальной арифметике и памяти',
                        'Подготовили команды, выступившие на Central Asia’s Got Talent',
                        'Вырастили учеников с результатами IELTS 8.5 и 8.8',
                    ],
                    cards: [
                        { emoji: '🏆', value: '5', title: 'чемпионатов мира', subtitle: 'официальное представительство' },
                        { emoji: '👥', value: 'CAGT', title: 'Вундеркинды из Бишкека', subtitle: 'запоминающаяся история команды школы' },
                    ],
                },
                stars: {
                    title: 'Наши звёзды',
                    description: 'Ученики Intellect уверенно выступают на соревнованиях, олимпиадах и публичных площадках, превращая упорство в заметный результат.',
                    tags: ['Memoriad', 'Mental Calculation World Cup', 'World Memory Championship', "Central Asia's Got Talent"],
                },
                cta: {
                    title: 'Убедитесь сами',
                    description: 'Лучший способ принять решение — увидеть атмосферу школы своими глазами на индивидуальной экскурсии.',
                    button: 'Записаться на экскурсию',
                },
            },
            portals: {
                parentsSchool: {
                    title: 'Школа родителей',
                    subtitle: 'Мероприятия, курсы и семинары для родителей нашей школы',
                },
                parentsPlatforms: {
                    title: 'Полезные платформы',
                    subtitle: 'Образовательные ресурсы и цифровые платформы для родителей',
                },
            },
        },
        teachers: {
            portals: {
                teachersSchool: {
                    title: 'Школа для учителей',
                    subtitle: 'Профессиональное развитие и повышение квалификации',
                },
            },
            culture: {
                heroAlt: 'Учителя школы',
                loungeAlt: 'Учительское пространство',
                teamAlt: 'Команда на совместной встрече',
            },
        },
        about: {
            fallbackMeta: {
                title: 'О нас | Intellect School',
                description: 'История, философия и подход Intellect School.',
            },
            hero: {
                badge: 'Vision 2025',
                title: 'Формируем будущее сегодня',
                highlight: 'будущее',
                description: 'Intellect School создаёт среду, где академическая сила соединяется с заботой, международным взглядом и уважением к личности ребёнка.',
                button: 'Изучить программы',
                statsLabel: 'учеников и выпускников экосистемы',
            },
            founder: {
                title: 'Путь к мечте',
                subtitle: 'История школы выросла из личной истории преодоления, высокой планки и желания изменить образование в Кыргызстане.',
                cardTitle: 'Жакшылык Матанов',
                cardSubtitle: 'Основатель и образовательный визионер',
                timeline: [
                    { year: '1995', title: 'Начало', text: 'Ранние трудности научили ответственности, дисциплине и уважению к образованию как к шансу изменить жизнь.' },
                    { year: '2011', title: 'Мечта', text: 'После учёбы за рубежом сформировалась ясная цель: построить школу, которая даёт детям больше возможностей и уверенности.' },
                    { year: '2021', title: 'Реализация', text: 'Открытие Intellect School стало шагом к созданию масштабной образовательной среды с сильной академикой и человеческим отношением.' },
                ],
                quote: 'Наша задача — дать детям такое образование, которое раскрывает их потенциал и помогает смотреть в будущее уверенно.',
                quoteAuthor: 'Жакшылык Матанов',
                quoteRole: 'Основатель Intellect School',
            },
            stats: [
                { value: '10 000+', label: 'Учеников и выпускников экосистемы' },
                { value: '20+', label: 'Центров и образовательных площадок' },
                { value: '15+', label: 'Лет опыта в образовании' },
                { value: '4', label: 'Ключевые траектории развития' },
            ],
            mission: {
                title: 'Наша миссия',
                subtitle: 'Мы растим личность, которая умеет думать, брать ответственность и уверенно взаимодействовать с миром.',
                values: [
                    { icon: 'Sparkles', title: 'Инновации', description: 'Современные методики, цифровые инструменты и постоянное обновление практик обучения.' },
                    { icon: 'ShieldCheck', title: 'Качество', description: 'Сильная академическая база, системная подготовка команды и высокая культура обратной связи.' },
                    { icon: 'Code2', title: 'Технологии', description: 'IT, логика, исследовательская работа и умение создавать, а не только потреблять.' },
                    { icon: 'Globe2', title: 'Глобальное мышление', description: 'Билингвальная среда и подготовка к международным возможностям.' },
                ],
            },
            programs: {
                title: 'Программы обучения',
                items: [
                    { title: 'Intellect Primary', badge: '1–4 классы', bullets: ['Ментальная арифметика', 'Робототехника', 'Английский язык'], href: '/programs/primary' },
                    { title: 'Intellect Middle', badge: '5–9 классы', bullets: ['Cambridge pathway', 'STEAM проекты', 'Второй язык'], href: '/programs/middle' },
                    { title: 'Intellect Senior', badge: '10–11 классы', bullets: ['Подготовка к ОРТ', 'IELTS/TOEFL', 'Профориентация'], href: '/programs/senior' },
                ],
                more: 'Подробнее',
            },
            results: {
                title: 'Результаты обучения',
                subtitle: 'Наши ученики получают не только академическую базу, но и сильные когнитивные, языковые и лидерские навыки.',
                columns: [
                    ['Продвинутые IT-навыки', 'Развитая память', 'Скорость мышления'],
                    ['Свободный английский', 'Навыки лидерства', 'Тяга к знаниям'],
                ],
            },
            stars: {
                title: 'Наши звёзды',
                description: 'Команды и отдельные ученики Intellect выступают на международных площадках и становятся заметными благодаря системной подготовке.',
            },
        },
    },
    en: {
        parents: {
            academics: {
                hero: {
                    title: 'Learning Environment',
                    subtitle: 'A coherent academic journey from grades 1 to 11, built around age-appropriate expectations and individual support.',
                    imageAlt: 'Learning environment',
                },
                stages: {
                    title: 'Three Stages of Growth',
                    subtitle: 'Each school stage is designed for a child’s age and helps students grow with the right level of challenge and care.',
                    more: 'Learn more',
                    items: [
                        {
                            title: 'Intellect Primary',
                            badge: 'Grades 1–4',
                            description: 'Gentle school adaptation, emotional intelligence, mental arithmetic, and strong English in an engaging environment.',
                            bullets: ['Full day until 17:00', 'Soft skills development'],
                            href: '/programs/primary',
                            image: '/images/junior-morning-exercise.png',
                            imageAlt: 'Intellect Primary',
                        },
                        {
                            title: 'Intellect Middle',
                            badge: 'Grades 5–9',
                            description: 'Core academics, project-based learning, early career awareness, and olympiad preparation.',
                            bullets: ['Advanced mathematics', 'IT and robotics'],
                            href: '/programs/middle',
                            image: '/images/middle-entrance-group.png',
                            imageAlt: 'Intellect Middle',
                        },
                        {
                            title: 'Intellect Senior',
                            badge: 'Grades 10–11',
                            description: 'Individual study tracks, ORT and IELTS/TOEFL preparation, and guidance for university admissions abroad.',
                            bullets: ['Career guidance', 'University preparation'],
                            href: '/programs/senior',
                            image: '/images/senior-medalists.png',
                            imageAlt: 'Intellect Senior',
                        },
                    ],
                },
                focus: {
                    title: 'Academic Focus',
                    items: [
                        { name: 'Mathematics', icon: 'Calculator', desc: 'Advanced progression' },
                        { name: 'English', icon: 'Globe', desc: 'Cambridge and international exams' },
                        { name: 'IT and programming', icon: 'Code2', desc: 'Python, web, and digital literacy' },
                        { name: 'Science', icon: 'Microscope', desc: 'Labs and inquiry' },
                        { name: 'Mental arithmetic', icon: 'Brain', desc: 'Memory and mental speed' },
                        { name: 'History', icon: 'BookOpen', desc: 'Critical thinking and context' },
                        { name: 'Sport', icon: 'Trophy', desc: 'Physical development and discipline' },
                        { name: 'Arts', icon: 'Palette', desc: 'Creative potential' },
                    ],
                },
                extracurricular: {
                    title: 'Clubs and Activities',
                    subtitle: 'Talent does not unfold only in the classroom. After lessons, students choose activities that help them explore, practice, and grow.',
                    imageAlt: 'Children in clubs',
                    columns: [
                        ['Chess', 'Robotics', 'Taekwondo', 'Choreography'],
                        ['Art studio', 'Debate club', 'Football', 'Vocal performance'],
                    ],
                },
            },
            admission: {
                hero: {
                    title: 'Admissions Process',
                    subtitle: 'A clear and transparent path into a strong school environment.',
                    imageAlt: 'Admissions process',
                },
                steps: [
                    { number: '01', title: 'Consultation', text: 'Contact us to ask questions, get to know the school, and choose the most convenient next step.' },
                    { number: '02', title: 'Assessment', text: 'We conduct entry diagnostics in Russian, English, and mathematics to understand the child’s current level.' },
                    { number: '03', title: 'Agreement', text: 'After a successful assessment, we formalise the enrolment agreement.' },
                    { number: '04', title: 'Document submission', text: 'A student file, birth certificate copy, and parent passport copies are required.' },
                    { number: '05', title: 'Medical forms', text: 'Form No. 026 and 063, proof of residence, and a 3x4 photo are submitted at this stage.' },
                    { number: '06', title: 'Enrolment', text: 'Once all steps are complete, the child receives a place in school and access to school services.' },
                ],
                documents: {
                    title: 'Required Documents',
                    items: [
                        'Student personal file',
                        'Birth certificate copy',
                        'Parent passport copies',
                        'Proof of residence',
                        'Medical card (Form No. 026)',
                        'Health passport (Form No. 063)',
                        'Two 3x4 photos',
                        'Academic transcript for transfers',
                    ],
                    button: 'Contact the admissions office',
                },
            },
            care: {
                hero: {
                    title: 'Care for What Matters Most',
                    subtitle: 'Health, safety, and psychological comfort create the conditions for a child to grow with confidence.',
                    imageAlt: 'Safety and care',
                },
                security: {
                    tag: 'Safety',
                    title: 'A Protected Campus',
                    text: 'The school is located on a gated campus, and access to the building is controlled throughout the day.',
                    imageAlt: 'Security post',
                    items: [
                        '24/7 perimeter video monitoring',
                        'Controlled entry and access system',
                        'Professional security team',
                        'Emergency buttons and response protocols',
                    ],
                },
                health: {
                    tag: 'Health',
                    title: 'Medical and Psychological Support',
                    text: 'A medical professional is present at school, and psychological support helps children feel calm, seen, and secure.',
                    imageAlt: 'Medical room',
                    items: [
                        'On-site nurse and regular wellbeing checks',
                        'Preventive screenings during the year',
                        'School psychologist for student support',
                        'Sensory reset and wellbeing support',
                    ],
                },
            },
            faq: {
                heroTitle: 'Questions and Answers',
                heroAlt: 'Questions and answers',
                items: [
                    {
                        question: 'How large are the classes?',
                        answer: 'The average class size is around 20 students. This allows teachers to build an individual learning path and pay attention to every child.',
                    },
                    {
                        question: 'How is school nutrition organised?',
                        answer: 'We provide balanced three-meal nutrition: breakfast, lunch, and an afternoon snack. Medical recommendations can be accommodated when needed.',
                    },
                    {
                        question: 'Is school transport available?',
                        answer: 'Yes, the school provides transport. Routes are organised by district, and children travel with adult supervision.',
                    },
                    {
                        question: 'Is school uniform mandatory?',
                        answer: 'Yes. The school follows a business-style dress code and uses branded uniform elements for formal events. It supports both discipline and a sense of belonging.',
                    },
                ],
            },
            values: {
                hero: {
                    title: 'The Future Starts Here',
                    subtitle: 'We unlock a child’s potential in a safe environment where high expectations are matched by respect and support.',
                    imageAlt: 'Students in the library',
                },
                stats: [
                    { value: '5', label: 'Years of steady growth' },
                    { value: '~20', label: 'Students per class' },
                    { value: '24/7', label: 'Campus security' },
                ],
                achievements: {
                    title: 'Key Achievements',
                    points: [
                        'Built proprietary teaching approaches with some of the country’s strongest educators',
                        'Became representatives of international mental arithmetic and memory championships',
                        'Prepared teams that performed on Central Asia’s Got Talent',
                        'Raised students with IELTS results of 8.5 and 8.8',
                    ],
                    cards: [
                        { emoji: '🏆', value: '5', title: 'world championships', subtitle: 'official representation' },
                        { emoji: '👥', value: 'CAGT', title: 'The Bishkek Wunderkinds', subtitle: 'a memorable team story from the school' },
                    ],
                },
                stars: {
                    title: 'Our Stars',
                    description: 'Intellect students perform confidently at competitions, olympiads, and public stages, turning consistent work into visible results.',
                    tags: ['Memoriad', 'Mental Calculation World Cup', 'World Memory Championship', "Central Asia's Got Talent"],
                },
                cta: {
                    title: 'See It for Yourself',
                    description: 'The best way to decide is to experience the atmosphere of the school on a personal tour.',
                    button: 'Book a school tour',
                },
            },
            portals: {
                parentsSchool: {
                    title: 'Parents School',
                    subtitle: 'Events, courses, and seminars for parents in our school community',
                },
                parentsPlatforms: {
                    title: 'Useful Platforms',
                    subtitle: 'Educational resources and digital platforms for parents',
                },
            },
        },
        teachers: {
            portals: {
                teachersSchool: {
                    title: 'Teachers School',
                    subtitle: 'Professional growth and development programs',
                },
            },
            culture: {
                heroAlt: 'Teachers of the school',
                loungeAlt: 'Teacher lounge',
                teamAlt: 'Team gathering',
            },
        },
        about: {
            fallbackMeta: {
                title: 'About | Intellect School',
                description: 'The story, philosophy, and educational approach of Intellect School.',
            },
            hero: {
                badge: 'Vision 2025',
                title: 'Shaping the Future Today',
                highlight: 'future',
                description: 'Intellect School creates an environment where academic strength is matched with care, international perspective, and deep respect for every child.',
                button: 'Explore Programs',
                statsLabel: 'students and graduates across the ecosystem',
            },
            founder: {
                title: 'A Path Toward a Dream',
                subtitle: 'The school grew out of a personal story of resilience, ambition, and a determination to raise the standard of education in Kyrgyzstan.',
                cardTitle: 'Zhakshylyk Matanov',
                cardSubtitle: 'Founder and educational visionary',
                timeline: [
                    { year: '1995', title: 'The Beginning', text: 'Early hardship shaped a deep sense of responsibility, discipline, and respect for education as a way to change life.' },
                    { year: '2011', title: 'The Dream', text: 'After studying abroad, a clear goal emerged: to build a school that gives children broader opportunities and stronger confidence.' },
                    { year: '2021', title: 'The Launch', text: 'The opening of Intellect School marked a step toward a larger educational ecosystem with strong academics and a human-centred culture.' },
                ],
                quote: 'Our task is to give children an education that reveals their potential and helps them face the future with confidence.',
                quoteAuthor: 'Zhakshylyk Matanov',
                quoteRole: 'Founder of Intellect School',
            },
            stats: [
                { value: '10 000+', label: 'Students and graduates across the ecosystem' },
                { value: '20+', label: 'Centers and educational spaces' },
                { value: '15+', label: 'Years of educational experience' },
                { value: '4', label: 'Core development pathways' },
            ],
            mission: {
                title: 'Our Mission',
                subtitle: 'We shape people who can think independently, take responsibility, and interact with the world with confidence.',
                values: [
                    { icon: 'Sparkles', title: 'Innovation', description: 'Modern methods, digital tools, and a commitment to continuously refining learning practice.' },
                    { icon: 'ShieldCheck', title: 'Quality', description: 'A strong academic core, systematic teacher development, and a culture of feedback.' },
                    { icon: 'Code2', title: 'Technology', description: 'IT, logic, inquiry, and the habit of creating rather than merely consuming.' },
                    { icon: 'Globe2', title: 'Global Mindset', description: 'A bilingual environment and preparation for international opportunities.' },
                ],
            },
            programs: {
                title: 'Learning Programs',
                items: [
                    { title: 'Intellect Primary', badge: 'Grades 1–4', bullets: ['Mental arithmetic', 'Robotics', 'English language'], href: '/programs/primary' },
                    { title: 'Intellect Middle', badge: 'Grades 5–9', bullets: ['Cambridge pathway', 'STEAM projects', 'Second language'], href: '/programs/middle' },
                    { title: 'Intellect Senior', badge: 'Grades 10–11', bullets: ['ORT preparation', 'IELTS/TOEFL', 'Career guidance'], href: '/programs/senior' },
                ],
                more: 'Learn more',
            },
            results: {
                title: 'Learning Outcomes',
                subtitle: 'Our students leave with more than academics: they build strong cognitive, language, and leadership capacities.',
                columns: [
                    ['Advanced IT skills', 'Developed memory', 'Thinking speed'],
                    ['Confident English', 'Leadership skills', 'Curiosity for learning'],
                ],
            },
            stars: {
                title: 'Our Stars',
                description: 'Teams and individual students from Intellect perform on international stages because consistent preparation turns talent into visible achievement.',
            },
        },
    },
} as const;

export function getSitePageContent(locale: PublicLocale) {
    return sitePages[locale];
}
