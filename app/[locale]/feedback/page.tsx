import FeedbackPage from '@/components/FeedbackPage'
import { feedbackCopy } from '@/lib/feedback'
import type { PublicLocale } from '@/lib/i18n'
export function generateMetadata({ params }: { params: { locale: PublicLocale } }) {
 const c = feedbackCopy[params.locale]
 return { title: `${c.title} | Intellect`, description: c.intro, alternates: { canonical: `/${params.locale}/feedback`, languages: { ru: '/ru/feedback', en: '/en/feedback', ky: '/ky/feedback' } } }
}
export default function Page({ params }: { params: { locale: PublicLocale } }) { return <FeedbackPage locale={params.locale} /> }
