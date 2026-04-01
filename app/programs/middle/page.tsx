import MiddleProgramClient from './MiddleProgramClient';
import { getPublishedCmsSectionPayloadsBySlug } from '@/lib/services/cms-public';

export const dynamic = 'force-dynamic';

export default async function MiddleProgramPage() {
    const cmsOverrides = await getPublishedCmsSectionPayloadsBySlug('program-middle');
    return <MiddleProgramClient cmsOverrides={cmsOverrides || undefined} />;
}
