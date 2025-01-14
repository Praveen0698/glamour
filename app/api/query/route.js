import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Query } from "@/models";

export const dynamic = "force-dynamic";

// POST - Add a new Query entry
export async function POST(request) {
  try {
    await connectToDatabase();

    const { name, mobile, requirement } = await request.json();

    if (!name || !mobile || !requirement) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, mobile, and requirement are required.",
        },
        { status: 400 }
      );
    }

    const QueryEntry = new Query({ name, mobile, requirement });
    await QueryEntry.save();

    return NextResponse.json(
      { success: true, data: QueryEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/Query:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all Query entries
export async function GET() {
  try {
    await connectToDatabase();
    const query = await Query.find();
    return NextResponse.json({ success: true, data: query }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/query:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a Query entry
export async function DELETE(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedQuery = await Query.findByIdAndDelete(id);
    if (!deletedQuery) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Query entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/Query:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
