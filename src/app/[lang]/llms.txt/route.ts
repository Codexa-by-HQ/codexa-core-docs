import { source } from '@/lib/source';
import { appName } from '@/lib/shared';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/[lang]/llms.txt'>) {
  const { lang } = await params;
  const pages = source.getPages(lang);

  const lines = pages.map(
    (page) => `- [${page.data.title}](${page.url}): ${page.data.description ?? ''}`,
  );

  return new Response(`# ${appName}\n\n${lines.join('\n')}`);
}
