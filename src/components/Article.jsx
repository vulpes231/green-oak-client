import React from "react";

const Article = ({ icon, title, paragraph }) => {
  return (
    <article className="flex flex-col gap-4 bg-slate-700 p-6 rounded-xl hover:border-2 hover:border-slate-300 cursor-pointer">
      <span>{icon}</span>
      <h3 className=" text-xl md:text-2xl font-bold capitalize font-[Roboto]">
        {title}
      </h3>
      <small className="leading-5 text-slate-300">{paragraph}</small>
    </article>
  );
};

export default Article;
