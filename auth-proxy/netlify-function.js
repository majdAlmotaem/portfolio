// Netlify Function for GitHub OAuth Code Exchange
// Deploy this file in netlify/functions/auth.js (or configured netlify functions directory)

const fetch = require("node-fetch"); // Note: fetch is built-in in Node 18+, but node-fetch is supported as fallback

exports.handler = async function (event, context) {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Only POST requests are allowed." })
    };
  }

  try {
    const { code } = JSON.parse(event.body || "{}");
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Authorization code is required." })
      };
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Netlify environment variables GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are missing." })
      };
    }

    // Request access token from GitHub
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
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: tokenData.error_description || tokenData.error })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ token: tokenData.access_token })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
