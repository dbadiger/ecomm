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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            consectetur accusantium labore tenetur repellat vel iure, sit minus
            excepturi odio harum, molestiae quia, accusamus perspiciatis
            veritatis dolorum. Nobis, quod molestiae!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At sunt
            quod laboriosam culpa unde perferendis consequuntur dolore natus
            laborum quae omnis alias, reiciendis facere sapiente nesciunt
            accusantium doloribus dolorum nisi. sequi alias! assumenda dolores
            minima! Veritatis saepe officiis, veniam ut velit laboriosam? Quis
            quam beatae vel.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            repellat et ullam. Culpa veritatis alias odio atque velit, officia
            adipisci perspiciatis, illo vero iusto reiciendis asperiores
            aspernatur totam distinctio porro!
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
            ullam! Nam possimus obcaecati amet? Voluptatum optio saepe
            exercitationem qui quas. Optio facere harum aspernatur architecto
            assumenda id cupiditate ex reprehenderit.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenince:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
            ullam! Nam possimus obcaecati amet? Voluptatum optio saepe
            exercitationem qui quas. Optio facere harum aspernatur architecto
            assumenda id cupiditate ex reprehenderit.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
            ullam! Nam possimus obcaecati amet? Voluptatum optio saepe
            exercitationem qui quas. Optio facere harum aspernatur architecto
            assumenda id cupiditate ex reprehenderit.
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
