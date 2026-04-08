import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/auth/upsert-user",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const secret = process.env.HEALTHIMUS_CONVEX_SYNC_SECRET;
    const headerSecret = req.headers.get("x-healthimus-sync-secret");

    if (secret && headerSecret !== secret) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = (await req.json()) as {
      provider?: string;
      providerAccountId?: string;
      email?: string;
      name?: string;
      image?: string;
    };

    if (!body.provider || !body.providerAccountId) {
      return new Response("provider and providerAccountId are required", {
        status: 400,
      });
    }

    await (ctx as { runMutation: (name: string, args: unknown) => Promise<unknown> }).runMutation(
      "users:upsertGoogleUser",
      {
      provider: body.provider,
      providerAccountId: body.providerAccountId,
      email: body.email,
      name: body.name,
      image: body.image,
      },
    );

    return Response.json({ ok: true });
  }),
});

export default http;
