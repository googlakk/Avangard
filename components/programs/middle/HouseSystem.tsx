'use  client';

interface House {
    name: string;
    color: string;
    motto: string;
    points: number;
}

interface HouseSystemProps {
    title: string;
    subtitle: string;
    description: string;
    houses: House[];
    competitions: string[];
    benefits: string;
}

export default function HouseSystem({
    title,
    subtitle,
    description,
    houses,
    competitions,
    benefits,
}: HouseSystemProps) {
    // Sort houses by points
    const sortedHouses = [...houses].sort((a, b) => b.points - a.points);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <p className="text-sm uppercase tracking-wider text-gray-600 mb-3 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Houses Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
                    {houses.map((house, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 text-center border-2 hover:shadow-xl transition-all duration-300"
                            style={{ borderColor: house.color }}
                        >
                            {/* House Color Circle */}
                            <div
                                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                                style={{ backgroundColor: house.color }}
                            >
                                {house.name.charAt(0)}
                            </div>

                            {/* House Name */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {house.name}
                            </h3>

                            {/* Motto */}
                            <p className="text-sm italic text-gray-600 mb-4">
                                &quot;{house.motto}&quot;
                            </p>
                        </div>
                    ))}
                </div>

                {/* Leaderboard */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Таблица лидеров
                    </h3>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {sortedHouses.map((house, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                            >
                                {/* Rank */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div
                                        className="text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center text-white"
                                        style={{ backgroundColor: house.color }}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* House Name */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">
                                            {house.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">{house.motto}</p>
                                    </div>
                                </div>

                                {/* Points */}
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {house.points}
                                    </div>
                                    <p className="text-sm text-gray-600">очков</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Competitions */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Соревнования между домами
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {competitions.map((competition, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-[#0f1419] hover:shadow-md transition-all"
                            >
                                <p className="text-sm font-medium text-gray-900">
                                    {competition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-gray-700 leading-relaxed italic">
                        {benefits}
                    </p>
                </div>
            </div>
        </section>
    );
}
