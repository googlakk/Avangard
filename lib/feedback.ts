export type FeedbackLocale = 'ru' | 'en' | 'ky'
export const feedbackCopy = {
 ru: {
 title: 'Предложения и жалобы',
 intro: 'Ваше мнение помогает нам становиться лучше. Сообщите о проблеме или предложите улучшение. Обращения рассматриваются стратегическим отделом и ответственными сотрудниками вашего учреждения. Можно обратиться анонимно или запросить обратную связь.',
 institutions: ['Интеллект Джуниор', 'Интеллект Про', 'Интеллект Колледж'],
 button: 'Отправить обращение',
 qrHint: 'На телефоне нажмите кнопку — сканировать QR-код с собственного экрана не требуется. QR-код можно отсканировать камерой другого устройства.',
 guide: 'Как подать обращение',
 steps: ['Выберите учреждение.', 'Выберите предложение или жалобу, категорию и опишите ситуацию.', 'Если хотите получить индивидуальный ответ через сайт, включите обратную связь и укажите ФИО и email.', 'Сохраните номер и персональный QR-код обращения для доступа к переписке.'],
 privacy: 'Анонимные обращения также рассматриваются. Номер и персональный QR-код открывают вашу переписку — не передавайте их другим.',
 publicQr: 'QR-коды выше — общедоступные ссылки учреждений. Персональный QR-код отдельного обращения вы получите после его отправки.',
 policy: 'Политика работы с предложениями и жалобами', download: 'Скачать политику в PDF',
 },
 en: {
 title: 'Suggestions and complaints',
 intro: 'Your feedback helps us improve. Report a problem or suggest an improvement. Cases are considered by the Strategic Department and the responsible staff at your institution. You can submit anonymously or request a response.',
 institutions: ['Intellect Junior', 'Intellect Pro', 'Intellect College'], button: 'Submit a case',
 qrHint: 'On your phone, tap the button — there is no need to scan a QR code from your own screen. You can scan the QR code with another device’s camera.',
 guide: 'How to submit a case', steps: ['Choose your institution.', 'Select a suggestion or complaint, choose a category and describe the situation.', 'To receive an individual response through the website, enable the response option and provide your full name and email.', 'Save your case number and personal QR code to access the correspondence.'],
 privacy: 'Anonymous cases are also considered. Your case number and personal QR code open your correspondence — do not share them with others.',
 publicQr: 'The QR codes above are public institution links. You will receive a personal QR code for your individual case after submitting it.',
 policy: 'Suggestions and Complaints Policy', download: 'Download the policy as PDF',
 },
 ky: {
 title: 'Сунуштар жана даттануулар',
 intro: 'Сиздин пикириңиз бизге жакшырууга жардам берет. Көйгөй жөнүндө кабарлаңыз же жакшыртуу боюнча сунуш бериңиз. Кайрылууларды стратегиялык бөлүм жана мекемеңиздин жооптуу кызматкерлери карашат. Анонимдүү кайрылууга же жооп сурап кайрылууга болот.',
 institutions: ['Интеллект Джуниор', 'Интеллект Про', 'Интеллект Колледж'], button: 'Кайрылуу жөнөтүү',
 qrHint: 'Телефондо баскычты басыңыз — өз экраныңыздагы QR-кодду сканерлөөнүн кереги жок. QR-кодду башка түзмөктүн камерасы менен сканерлөөгө болот.',
 guide: 'Кантип кайрылуу жөнөтүү керек', steps: ['Мекемеңизди тандаңыз.', 'Сунушту же даттанууну, категорияны тандап, кырдаалды сүрөттөп жазыңыз.', 'Сайт аркылуу жеке жооп алгыңыз келсе, жооп алуу мүмкүнчүлүгүн күйгүзүп, аты-жөнүңүздү жана email дарегиңизди көрсөтүңүз.', 'Кат алышууга кирүү үчүн кайрылуунун номерин жана жеке QR-кодун сактап коюңуз.'],
 privacy: 'Анонимдүү кайрылуулар да каралат. Кайрылуунун номери жана жеке QR-коду кат алышууңузга кирүүгө мүмкүндүк берет — аларды башкаларга бербеңиз.',
 publicQr: 'Жогорудагы QR-коддор — мекемелердин жалпыга ачык шилтемелери. Өзүнчө кайрылуунун жеке QR-кодун аны жөнөткөндөн кийин аласыз.',
 policy: 'Сунуштар жана даттануулар менен иштөө саясаты', download: 'Саясатты PDF форматында жүктөө',
 },
}
export function feedbackPath(locale: FeedbackLocale) { return `/${locale}/feedback` }
