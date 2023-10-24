import React from "react";

const WhyArticle = ({ img, title, text }) => {
  return (
    <article className="flex flex-col gap-4 md:flex-row text-[#333]">
      <figure className="w-full md:w-[30%]">{img}</figure>
      <div className="flex flex-col gap-4 bg-[#fff] p-5 rounded-md w-full md:w-[70%]">
        <h3 className="text-xl leading-6 capitalize font-light">{title}</h3>
        <p className="leading-6 opacity-60 ">{text}</p>
        <a href="#" className="text-[#347338] underline">
          Learn More
        </a>
      </div>
    </article>
  );
};

export default WhyArticle;
