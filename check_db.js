require('dotenv').config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

fetch(`${url}/rest/v1/cms_sections?select=*`, {
    headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
    }
})
.then(res => res.json())
.then(data => {
    const str = JSON.stringify(data);
    if (str.includes('IMG_6812.mp4')) {
        console.log('FOUND IN DATABASE!');
        const sectionsWithIt = data.filter(s => JSON.stringify(s).includes('IMG_6812.mp4'));
        console.log(JSON.stringify(sectionsWithIt, null, 2));
    } else {
        console.log('NOT FOUND IN DATABASE');
    }
})
.catch(err => console.error(err));
