export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model, temperature, max_tokens, apiKey } = req.body;

  try {
    const resp = await fetch('https://api.aisa.one/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey || process.env.AISA_API_KEY || 'sk-d2n3PIPWBOc3VTgqHuqvtmTaSZ5JtolHBnUAaUrAZgTjst41'}`,
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-4-6',
        messages,
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens ?? 2000,
      }),
    });

    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
