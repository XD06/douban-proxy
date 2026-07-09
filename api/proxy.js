export default async (req) => {
  const url = req.query.url;
  if (!url) return new Response('missing url', { status: 400 });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  const resp = await fetch(url, {
    headers: { 'Referer': 'https://book.douban.com/' },
    signal: controller.signal
  });
  clearTimeout(timer);
  return new Response(resp.body, {
    headers: {
      'Content-Type': resp.headers.get('Content-Type'),
      'Cache-Control': 'public, max-age=31536000',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
