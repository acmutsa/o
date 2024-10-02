// app/login/github/callback/route.ts
import { notion, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("notion_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await notion.validateAuthorizationCode(code);
    const notionResponse = await fetch("https://api.notion.com/v1/users/me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "Notion-Version": "2022-06-28",
      },
    });
    const notionUser: NotionUser = await notionResponse.json();
    console.log("Notion user:", notionUser);
    if (notionUser.bot.workspace_name != "ACM UTSA")
      return new Response(null, {
        status: 400,
        statusText: "Not in ACM UTSA Workpace",
      });

    // Make sure this is the actual type
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.notionId, notionUser.id),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      if (existingUser.isRegistrationComplete) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/app",
          },
        });
      }
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/onboarding",
        },
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    // Replace this with your own DB client.
    await db.insert(userTable).values({
      id: userId,
      notionId: notionUser.id,
      email: notionUser.bot.owner.user.person.email,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/onboarding",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }

    console.error(e);
    return new Response(null, {
      status: 500,
    });
  }
}

interface NotionUser {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  bot: {
    owner: {
      type: string;
      user: {
        object: string;
        id: string;
        name: string;
        avatar_url: string;
        type: string;
        person: { email: string };
      };
    };
    workspace_name: string;
  };
}
