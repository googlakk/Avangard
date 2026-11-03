import FeedbackPage from '@/components/FeedbackPage'
import { feedbackCopy } from '@/lib/feedback'
export const metadata = { title: `${feedbackCopy.ky.title} | Intellect`, description: feedbackCopy.ky.intro, alternates: { canonical: '/ky/feedback', languages: { ru: '/ru/feedback', en: '/en/feedback', ky: '/ky/feedback' } } }
export default function Page() { return <FeedbackPage locale="ky" /> }
