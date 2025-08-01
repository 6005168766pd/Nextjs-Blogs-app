'use client'
import Bloglist from "@/Ccomponents/Bloglist";
import "./globals.css";
import Header from "@/Ccomponents/Header";
import Footer from "@/Ccomponents/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Bloglist />
      <Footer />
    </>
  );
}
