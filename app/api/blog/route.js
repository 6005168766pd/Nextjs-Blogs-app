import connectDB from "@/lib/config/db";
import Blogmodel from "@/lib/models/blogmodel";
import { title } from "process";
import cloudinary from "cloudinary";
const { NextResponse } = require("next/server");
const fs = require('fs');
const path = require('path');
const LoadDB = async () => {
  await connectDB();
};
LoadDB();

// Cloudinary config (ensure these are set in your environment variables)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// API endpoint for getting all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await Blogmodel.findById(blogId);
    return NextResponse.json(blog);
  }
  else {
    const blogs = await Blogmodel.find({});
    return NextResponse.json({ blogs });
  }
}
// API endpoint for uploading blogs
export async function POST(request) {
  const formData = await request.formData();
  const image = formData.get('image');
  let imgUrl = "";
  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Upload to Cloudinary
    imgUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream({ folder: "blogs" }, (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      });
      stream.end(buffer);
    });
  }
  const blogData = {
    title: `${formData.get('title')}`,
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: imgUrl,
    author_img: `${formData.get('author_img')}`,
  };
  await Blogmodel.create(blogData);
  console.log("Blog Saved");
  return NextResponse.json({ success: true, message: "Blog created successfully", data: blogData });
}
// API endpoint for deleting blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blog = await Blogmodel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Safely remove image
    if (blog.image) {
      const imagePath = path.join(process.cwd(), "public", blog.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.warn("Image delete failed or not found:", err.message);
      }
    }

    await Blogmodel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog Deleted Successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}