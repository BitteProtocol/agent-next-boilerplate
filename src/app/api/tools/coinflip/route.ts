import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate a coin flip
    const result = Math.random() < 0.5 ? "heads" : "tails";

    // Return the result
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in coin flip:", error);
    return NextResponse.json(
      { error: "Failed to perform coin flip" },
      { status: 500 },
    );
  }
}
