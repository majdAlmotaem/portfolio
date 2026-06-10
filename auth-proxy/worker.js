// Cloudflare Worker for GitHub OAuth Code Exchange
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      }
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST requests are allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const { code } = await request.json();
    if (!code) {
      return new Response(JSON.stringify({ error: "Authorization code is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Access environment variables bound in Cloudflare Worker:
    // GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
    const clientId = typeof GITHUB_CLIENT_ID !== "undefined" ? GITHUB_CLIENT_ID : null;
    const clientSecret = typeof GITHUB_CLIENT_SECRET !== "undefined" ? GITHUB_CLIENT_SECRET : null;

    if (!clientId || !clientSecret) {
      return new Response(JSON.stringify({ error: "Server configuration missing client ID or client secret bindings." }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Request access token from GitHub
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return new Response(JSON.stringify({ error: tokenData.error_description || tokenData.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    return new Response(JSON.stringify({ token: tokenData.access_token }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
