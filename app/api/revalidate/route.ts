import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _type } = body;

    // Revalidate paths based on content type
    if (_type === "profile") {
      revalidatePath("/");
      revalidatePath("/about");
    }
    if (_type === "job") {
      revalidatePath("/");
    }
    if (_type === "project") {
      revalidatePath("/projects");
      revalidatePath("/projects/[project]");
    }

    return Response.json({
      revalidated: true,
      message: `Revalidated paths for ${_type}`,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to revalidate", details: String(error) },
      { status: 500 }
    );
  }
}
