export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const corsHeaders = { "Access-Control-Allow-Origin": "*" };

    try {
      // Health check endpoint
      if (url.pathname === "/api/health" && request.method === "GET") {
        return Response.json({ status: "ok", time: new Date().toISOString() }, { headers: corsHeaders });
      }

      // Get active stores endpoint
      if (url.pathname === "/api/stores" && request.method === "GET") {
        const { results } = await env.DB.prepare("SELECT * FROM stores WHERE active = 1").all();
        return Response.json(results, { headers: corsHeaders });
      }

      // Fallback 404
      return Response.json({ error: "Not Found", path: url.pathname }, { status: 404, headers: corsHeaders });
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
  },
};