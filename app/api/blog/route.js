import connectDB from "@/lib/config/db";
import Blogmodel from "@/lib/models/blogmodel";
import { title } from "process";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const { NextResponse } = require("next/server");
const fs = require('fs');
const path = require('path');
const LoadDB = async () => {
  await connectDB();
};
LoadDB();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await Blogmodel.findById(blogId);
    if (blog) {
      // Fix old image paths if needed
      if (!blog.image.startsWith("http")) blog.image = "";
      if (!blog.author_img.startsWith("http")) blog.author_img = "";
    }
    return NextResponse.json(blog);
  } else {
    const blogs = await Blogmodel.find({});
    blogs.forEach(blog => {
      if (!blog.image.startsWith("http")) blog.image = "";
      if (!blog.author_img.startsWith("http")) blog.author_img = "";
    });
    return NextResponse.json({ blogs });
  }
}

// API endpoint for uploading blogs
export async function POST(request) {
  const formData = await request.formData();

  // Upload main blog image
  const image = formData.get('image');
  let imgUrl = "";
  if (image && typeof image !== 'string') {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    imgUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "blogs" }, (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }).end(buffer);
    });
  }

  // Upload author image if provided
  const authorImg = formData.get('author_img');
  let authorImgUrl = "";
  if (authorImg && typeof authorImg !== 'string') {
    const arrayBuffer = await authorImg.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    authorImgUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "authors" }, (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }).end(buffer);
    });
  } else {
    authorImgUrl = typeof authorImg === 'string' ? authorImg : "";
  }

  const blogData = {
    title: formData.get('title') || "",
    description: formData.get('description') || "",
    category: formData.get('category') || "",
    author: formData.get('author') || "",
    image: imgUrl,
    author_img: authorImgUrl,
  };

  await Blogmodel.create(blogData);
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