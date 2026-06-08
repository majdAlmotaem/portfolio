// Vercel Serverless Function for GitHub OAuth Code Exchange
// Deploy this file as api/auth.js (or configured Vercel API path)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is required." });
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "Vercel environment variables GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are missing." });
    }

    // Exchange the code for a token with GitHub
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const tokenData = await response.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    return res.status(200).json({ token: tokenData.access_token });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
