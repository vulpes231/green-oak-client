import React from "react";

const Article = ({ icon, title, paragraph }) => {
  return (
    <article className="flex flex-col items-center gap-1 text-center">
      {icon}
      <h3 className="text-[#347338] text-lg font-semibold">{title}</h3>
      <p className="leading-5 text-[#333]">{paragraph}</p>
    </article>
  );
};

export default Article;
