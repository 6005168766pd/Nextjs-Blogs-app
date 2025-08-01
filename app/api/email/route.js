import connectDB from "@/lib/config/db";
import Emailmodel from "@/lib/models/emailmodel";
import next from "next";
import { NextResponse } from "next/server";
const LoadDB = async () => {
  await connectDB();
}
LoadDB();
export async function POST(request) {
  const formdata = await request.formData();
  const emaildata = {
    email: `${formdata.get("email")}`,
  };

  await Emailmodel.create(emaildata);

  return new Response(JSON.stringify({
    msg: "Email Subscribed Successfully",
    success: true
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export async function GET(request) {
  const emails = await Emailmodel.find({});
  return NextResponse.json({ emails });
}
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await Emailmodel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted Successfully" });
}