import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Icon } from '@/lib/icons';
import CmsProgramPageRenderer from '@/components/cms/CmsProgramPageRenderer';
import { getSitePageContent } from '@/lib/content/site-pages';
import { DEFAULT_LOCALE, isValidLocale, LOCALE_COOKIE_NAME, localizePathname, type PublicLocale } from '@/lib/i18n';
import { getCmsPageSections, getCmsPageSeoMeta, getPublishedCmsPageBySlug } from '@/lib/services/cms-public';
import { cookies } from 'next/headers';

const ABOUT_PAGE_SLUG = 'about';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPublishedCmsPageBySlug(ABOUT_PAGE_SLUG);
    if (!page) {
        return {
            title: 'About | Intellect School',
            description: 'The story, philosophy, and educational approach of Intellect School.',
        };
    }

    const seo = await getCmsPageSeoMeta(page.id);
    const title = seo?.seo_title || page.title_ru;
    const description = seo?.seo_description || page.title_en;
    const canonical = seo?.canonical_url || '/about';
    const ogImage = seo?.og_image_url || '/og-image.jpg';

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            images: [{ url: ogImage }],
            type: 'website',
        },
        robots: {
            index: seo?.robots_index ?? true,
            follow: seo?.robots_follow ?? true,
        },
    };
}

function resolveRequestLocale(): PublicLocale {
    const cookieValue = cookies().get(LOCALE_COOKIE_NAME)?.value;
    return isValidLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE;
}

export default async function AboutPage() {
    const locale = resolveRequestLocale();
    const cmsPage = await getPublishedCmsPageBySlug(ABOUT_PAGE_SLUG);
    if (cmsPage) {
        const sections = await getCmsPageSections(cmsPage.id);
        return <CmsProgramPageRenderer page={cmsPage} sections={sections} />;
    }

    const copy = getSitePageContent(locale).about;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <section className="relative overflow-hidden pt-28 pb-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(234,179,8,0.12),_transparent_35%)]" />
                <div className="relative container mx-auto px-4">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <div className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                {copy.hero.badge}
                            </div>
                            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-navy-900 md:text-6xl">
                                {copy.hero.title.replace(copy.hero.highlight, '')}
                                <span className="text-blue-600">{copy.hero.highlight}</span>
                            </h1>
                            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
                                {copy.hero.description}
                            </p>
                            <Button size="lg" href={localizePathname('/programs', locale)} className="rounded-full bg-blue-600 px-8 text-white hover:bg-blue-700">
                                {copy.hero.button}
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000"
                                    alt="Students at Intellect School"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl">
                                <div className="text-3xl font-bold text-navy-900">10 000+</div>
                                <div className="text-sm text-gray-500">{copy.hero.statsLabel}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-20">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.1fr_1fr]">
                    <div>
                        <h2 className="mb-4 font-heading text-3xl font-bold text-navy-900 md:text-4xl">{copy.founder.title}</h2>
                        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">{copy.founder.subtitle}</p>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000"
                                alt="Founder journey"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute right-6 top-6 max-w-xs rounded-2xl bg-blue-600 p-5 text-white shadow-lg">
                                <h3 className="mb-2 text-xl font-bold">{copy.founder.cardTitle}</h3>
                                <p className="text-sm text-white/90">{copy.founder.cardSubtitle}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        {copy.founder.timeline.map((item, index) => (
                            <div key={item.year} className={`rounded-3xl border p-6 shadow-sm ${index === copy.founder.timeline.length - 1 ? 'border-blue-200 bg-white shadow-lg' : 'border-gray-100 bg-white'}`}>
                                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{item.year}</div>
                                <h3 className="mb-3 text-2xl font-bold text-navy-900">{item.title}</h3>
                                <p className="leading-relaxed text-gray-600">{item.text}</p>
                            </div>
                        ))}

                        <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-8">
                            <p className="text-lg italic leading-relaxed text-navy-900">&ldquo;{copy.founder.quote}&rdquo;</p>
                            <div className="mt-5">
                                <div className="font-bold text-navy-900">{copy.founder.quoteAuthor}</div>
                                <div className="text-sm text-gray-500">{copy.founder.quoteRole}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-navy-900 py-16 text-white">
                <div className="container mx-auto grid gap-8 px-4 text-center md:grid-cols-4">
                    {copy.stats.map((stat) => (
                        <div key={stat.label}>
                            <div className="mb-2 text-4xl font-bold">{stat.value}</div>
                            <div className="text-sm uppercase tracking-[0.18em] text-white/60">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 max-w-3xl">
                        <h2 className="mb-4 font-heading text-3xl font-bold text-navy-900 md:text-4xl">{copy.mission.title}</h2>
                        <p className="text-lg leading-relaxed text-gray-600">{copy.mission.subtitle}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {copy.mission.values.map((value) => (
                            <div key={value.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                    <Icon name={value.icon} className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-navy-900">{value.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 font-heading text-3xl font-bold text-navy-900 md:text-4xl">{copy.programs.title}</h2>
                        <div className="mx-auto h-1 w-24 rounded-full bg-blue-600" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {copy.programs.items.map((program) => (
                            <div key={program.title} className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-lg">
                                <h3 className="mb-2 text-2xl font-bold text-navy-900">{program.title}</h3>
                                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">{program.badge}</p>
                                <ul className="mb-8 space-y-3">
                                    {program.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-center gap-3 text-sm text-gray-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={localizePathname(program.href, locale)} className="inline-flex items-center font-bold text-blue-600 transition-all hover:gap-2">
                                    {copy.programs.more}
                                    <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 py-20">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
                    <div>
                        <h2 className="mb-5 font-heading text-3xl font-bold text-navy-900 md:text-4xl">{copy.results.title}</h2>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">{copy.results.subtitle}</p>
                        <div className="grid gap-4 md:grid-cols-2">
                            {copy.results.columns.map((column, index) => (
                                <ul key={index} className="space-y-4">
                                    {column.map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                                            <span className="font-medium text-navy-900">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-[2rem] bg-navy-900 p-10 text-white shadow-2xl">
                        <div className="mb-4 text-4xl">★</div>
                        <h3 className="mb-4 font-heading text-3xl font-bold">{copy.stars.title}</h3>
                        <p className="leading-relaxed text-white/75">{copy.stars.description}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
