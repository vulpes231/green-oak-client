import React from "react";

const WhyArticle = ({ img, title, text }) => {
  return (
    <article className="flex flex-col md:gap-4 md:flex-row text-[#333]">
      <figure className="w-full md:w-[30%] h-[200px]">
        <img src={img} alt="" className="bg-contain w-full h-full" />
      </figure>
      <div className="flex flex-col gap-1 bg-[#fff] p-5 rounded-md w-full md:w-[70%] shadow-lg">
        <h3 className=" text-xl md:text-2xl font-bold capitalize font-[Roboto]">
          {title}
        </h3>
        <small className="leading-6 text-sm text-slate-500">{text}</small>
        <div className="pt-5">
          <a className="text-[#347338] underline py-2 text-xs " href="#">
            Learn More
          </a>
        </div>
      </div>
    </article>
  );
};

export default WhyArticle;
