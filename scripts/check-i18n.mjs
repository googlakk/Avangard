import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const ruPath = path.join(root, 'locales', 'ru.json');
const enPath = path.join(root, 'locales', 'en.json');

const ru = JSON.parse(fs.readFileSync(ruPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const mismatches = [];

function compareShape(a, b, currentPath = '') {
    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);

    if (aIsArray !== bIsArray) {
        mismatches.push(`${currentPath || '<root>'}: array/object mismatch`);
        return;
    }

    if (a === null || b === null) return;
    if (typeof a !== 'object' || typeof b !== 'object') return;

    if (aIsArray) {
        const max = Math.max(a.length, b.length);
        for (let i = 0; i < max; i += 1) {
            if (i >= a.length || i >= b.length) {
                mismatches.push(`${currentPath}[${i}]: missing array item`);
                continue;
            }
            compareShape(a[i], b[i], `${currentPath}[${i}]`);
        }
        return;
    }

    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of keys) {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        if (!(key in a) || !(key in b)) {
            mismatches.push(`${nextPath}: missing key`);
            continue;
        }
        compareShape(a[key], b[key], nextPath);
    }
}

compareShape(ru, en);

if (mismatches.length > 0) {
    console.error('Locale dictionary shape mismatch:');
    for (const mismatch of mismatches.slice(0, 100)) {
        console.error(`- ${mismatch}`);
    }
    process.exit(1);
}

const scanDirs = [
    path.join(root, 'app', 'programs', 'primary'),
    path.join(root, 'app', 'rules'),
    path.join(root, 'components', 'programs', 'junior'),
    path.join(root, 'components', 'rules'),
];

const allowlist = new Set([
    path.join(root, 'app', 'programs', 'primary', 'JuniorProgramClient.tsx'),
    path.join(root, 'components', 'programs', 'junior', 'AdditionalInfoSection.tsx'),
    path.join(root, 'components', 'programs', 'junior', 'HeadOfJuniorMessage.tsx'),
    path.join(root, 'components', 'rules', 'RulesPage.tsx'),
]);

const sourceExt = new Set(['.ts', '.tsx']);
const hardcodedIssues = [];

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
            continue;
        }
        if (!sourceExt.has(path.extname(entry.name)) || allowlist.has(fullPath)) continue;

        const lines = fs.readFileSync(fullPath, 'utf8').split('\n');
        lines.forEach((line, index) => {
            const sanitized = line.replace(/\/\/.*$/, '');
            const trimmed = sanitized.trim();
            if (!trimmed) return;
            if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('{/*')) return;
            if (trimmed.includes('className=') || trimmed.includes('src=') || trimmed.includes('alt=')) return;
            if (/[А-Яа-яЁё]/.test(trimmed)) {
                hardcodedIssues.push(`${path.relative(root, fullPath)}:${index + 1}: ${trimmed}`);
            }
        });
    }
}

scanDirs.forEach(dir => {
    if (fs.existsSync(dir)) walk(dir);
});

if (hardcodedIssues.length > 0) {
    console.error('Hardcoded Cyrillic found in localized public UI files:');
    for (const issue of hardcodedIssues.slice(0, 100)) {
        console.error(`- ${issue}`);
    }
    process.exit(1);
}

console.log('i18n checks passed');
