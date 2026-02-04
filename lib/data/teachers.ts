
export const getCareersData = (t: any) => {
    return {
        hero: t.teachers.careers.hero,
        reserve: t.teachers.careers.reserve,
        positions: {
            title: t.teachers.careers.positions.title,
            applyButton: t.teachers.careers.positions.applyButton,
            items: [
                {
                    id: 'math',
                    ...t.teachers.careers.positions.items.math,
                    subject: 'Учитель Математики' // Fallback or extracted if needed for mailto
                },
                {
                    id: 'english',
                    ...t.teachers.careers.positions.items.english,
                    subject: 'Учитель Английского'
                },
                {
                    id: 'tutor',
                    ...t.teachers.careers.positions.items.tutor,
                    subject: 'Тьютор'
                }
            ]
        }
    };
};

export const getBenefitsData = (t: any) => {
    const cards = t.teachers.benefits.cards;
    return {
        hero: t.teachers.benefits.hero,
        list: [
            { icon: '🚀', ...cards.growth },
            { icon: '💻', ...cards.equipment },
            { icon: '🥗', ...cards.health },
            { icon: '⚖️', ...cards.balance },
            { icon: '💰', ...cards.pay },
            { icon: '🤝', ...cards.mentorship }
        ]
    };
};

export const getCultureData = (t: any) => {
    return {
        hero: t.teachers.culture.hero,
        manifesto: t.teachers.culture.manifesto,
        slider: t.teachers.culture.slider
    };
};
