// Keep legacy CMS copy consistent with the school's confirmed Cambridge start grade.
const legacyCopy: Record<string, string> = {
    'Время больших открытий и формирования личности. Международная программа, проектная деятельность и развитие лидерских качеств.':
        'Время больших открытий и формирования личности. Проектная деятельность, развитие лидерских качеств и обучение по международной программе Cambridge с 7-го класса.',
    'A transformative journey for students in grades 5-9, combining international curriculum with project-based learning and personal growth.':
        'A transformative journey for students in grades 5–9, with project-based learning, personal growth, and the international Cambridge curriculum starting in Grade 7.',
    'Science and Math in English (International Program)':
        'Daily English practice from primary school; the international Cambridge curriculum starts in Grade 7.',
};

export function correctCurriculumCopy<T>(value: T): T {
    if (typeof value === 'string') return (legacyCopy[value] ?? value) as T;
    if (Array.isArray(value)) return value.map(correctCurriculumCopy) as T;
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, correctCurriculumCopy(item)])) as T;
    }
    return value;
}
