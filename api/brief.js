// Vercel serverless function — receives a Blue Lagoon contact/brief submission
// and forwards it to LEAD_WEBHOOK_URL (the same mechanism as the Sleight & Co.
// bureau: a webhook, e.g. a Google Apps Script web app bound to a Sheet).
// Same-origin POST, so no CORS needed. CommonJS so it runs without
// "type":"module" in package.json.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      body = {};
    }
  }
  body = body || {};

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  if (!name || !email) {
    res.status(400).json({ ok: false, error: 'Name and email are required.' });
    return;
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    propertyType: (body.propertyType || '').toString().trim(),
    message: (body.message || '').toString().trim(),
    house: (body.house || 'Blue Lagoon').toString().trim(),
    niche: (body.niche || 'Hospitality').toString().trim(),
    source: (body.source || 'blue-lagoon contact').toString().trim(),
  };

  console.log('[brief] new lead', JSON.stringify(lead));

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.error('[brief] LEAD_WEBHOOK_URL is not configured');
    res.status(503).json({ ok: false, error: 'Lead delivery is not configured.' });
    return;
  }

  try {
    const response = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  } catch (err) {
    console.error('[brief] webhook forward failed', err);
    res.status(502).json({ ok: false, error: 'Lead delivery failed.' });
    return;
  }

  res.status(200).json({ ok: true });
};
