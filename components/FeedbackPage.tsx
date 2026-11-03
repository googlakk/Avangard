import Image from 'next/image'
import { feedbackCopy, feedbackPath, type FeedbackLocale } from '@/lib/feedback'
import policies from '@/lib/feedback-policy.json'

const slugs = ['intellect-junior', 'intellect-pro', 'intellect-college']

export default function FeedbackPage({ locale }: { locale: FeedbackLocale }) {
 const c = feedbackCopy[locale]
 return <article lang={locale} className="bg-[#F8FAFC] pt-32 pb-20 text-navy-900">
  <div className="mx-auto max-w-6xl px-5 sm:px-8">
   <nav aria-label="Language" className="mb-8 flex gap-3">{(['ru', 'en', 'ky'] as const).map(l => <a key={l} href={feedbackPath(l)} hrefLang={l} aria-current={l === locale ? 'page' : undefined} className={`rounded-full border px-5 py-2 font-semibold ${l === locale ? 'bg-navy-900 text-white' : 'bg-white'}`}>{l.toUpperCase()}</a>)}</nav>
   <h1 className="font-heading text-3xl sm:text-5xl font-semibold leading-tight">{c.title}</h1>
   <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-600">{c.intro}</p>
   <div className="mt-10 grid gap-6 md:grid-cols-3">{slugs.map((slug, i) => {
    const url = `https://feedback.intel.edu.kg/i/${slug}`
    return <section key={slug} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
     <h2 className="text-xl font-heading font-semibold text-center">{c.institutions[i]}</h2>
     <a href={url} aria-label={`${c.button}: ${c.institutions[i]} (QR)`} className="my-6 block rounded-xl bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"><Image src={`/feedback/${slug}-QR.png`} alt={`QR — ${c.institutions[i]}`} width={800} height={1120} className="h-auto w-full max-w-[240px] object-contain" unoptimized /></a>
     <a href={url} className="mt-auto w-full rounded-full bg-[#C6A96B] px-4 py-3 text-center font-semibold text-[#0F223A] hover:bg-[#D8C08A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{c.button}</a>
    </section>
   })}</div>
   <p className="mt-6 text-slate-600 leading-relaxed">{c.qrHint}</p>
   <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.publicQr}</p>
   <section className="my-12 rounded-2xl bg-navy-900 p-6 sm:p-10 text-white">
    <h2 className="font-heading text-2xl font-semibold">{c.guide}</h2>
    <ol className="mt-6 list-decimal space-y-4 pl-6 leading-relaxed">{c.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <p className="mt-8 border-t border-white/20 pt-6 leading-relaxed text-white/90">{c.privacy}</p>
   </section>
   <section aria-labelledby="feedback-policy" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
    <h2 id="feedback-policy" className="font-heading text-2xl sm:text-3xl font-semibold">{c.policy}</h2>
    <a href={`/feedback/policy-${locale}.pdf`} download className="my-6 inline-block rounded-full border border-navy-900 px-6 py-3 font-semibold hover:bg-slate-100">{c.download}</a>
    <div className="max-w-4xl space-y-5 leading-relaxed text-slate-700">{policies[locale].map((text, i) => /^\d /.test(text) ? <h3 key={i} className="pt-5 text-xl font-semibold text-navy-900">{text}</h3> : <p key={i} className={i === 0 ? 'whitespace-pre-line text-sm text-slate-500' : ''}>{text}</p>)}</div>
   </section>
  </div>
 </article>
}
