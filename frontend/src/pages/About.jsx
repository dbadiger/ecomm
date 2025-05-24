import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Divastra, we believe clothing is more than fabric—it's an expression of your identity, confidence, and culture. 
            Founded with a passion for timeless fashion and modern trends, 
            Divastra is a homegrown brand that blends traditional roots with contemporary design, creating attire that celebrates individuality.
          </p>
          <p>
            Our collections are crafted for women who embrace grace, power, and purpose in every outfit they wear. 
            Whether it’s ethnic elegance or everyday chic, each piece is thoughtfully designed to offer comfort, durability, and statement-making style.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Divastra, we don’t just follow fashion—we shape it, with quality and creativity at the core. Join us in redefining what it means to dress with purpose, style, and confidence.
          </p>
        </div>
      </div>

      
      <div className="text-xl py-2">
        <Title text1={"WHAT MEKES "} text2={` US UNIQUE`} />
      </div>
      <div className="mx-4 pb-4">
        <p className="my-2"><b style={{color:"#40403F"}}> &#10004; Authentic Fabrics</b> sourced ethically from trusted weavers and artisans</p>
        <p className="my-2"><b style={{color:"#40403F"}}>&#10004; Trend-led Designs</b> tailored for modern wardrobes</p>
        <p className="my-2"><b style={{color:"#40403F"}}>&#10004; Made in India</b> supporting local craftsmanship and sustainability</p>
        <p className="my-2"><b style={{color:"#40403F"}}>&#10004; Fast Delivery & Easy Returns</b> for a smooth shopping experience</p>
        <p className="my-2"><b style={{color:"#40403F"}}>&#10004; Customer-Centric Service</b> because your satisfaction is our success</p>
      </div>


      <div className="text-xl py-4">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
           At Divastra, every stitch tells a story of craftsmanship. 
           We use premium fabrics and maintain strict quality standards to ensure each garment meets your expectations — and exceeds them. 
           Fashion that lasts, in both style and durability.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
           Your shopping experience, simplified. 
           From intuitive browsing and secure payments to quick deliveries and easy returns, 
           Divastra is designed for effortless elegance at your fingertips — anytime, anywhere.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We’re here for you. Our dedicated support team goes beyond answering questions — we’re committed to making your experience smooth, personal, and satisfying. 
            Because you deserve more than just clothes — you deserve care.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
