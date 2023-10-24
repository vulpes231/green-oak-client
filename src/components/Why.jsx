import React from "react";
import WhyArticle from "./WhyArticle";
import { save, trc } from "../assets";

const Why = () => {
  return (
    <section className=" mt-20 bg-[#F2F2F2]">
      <div className="lg:max-w-[1100px] mx-auto p-6 flex  flex-col gap-4">
        <WhyArticle
          img={
            <img
              src={save}
              className="h-[200px] w-full md:w-[100%] rounded-md"
            />
          }
          title="The ultimate opportunity savings account"
          text="GreenOak has patnered with Suze Ormen to offer high rate savings account and bonus for its member"
        />
        <WhyArticle
          img={
            <img
              src={trc}
              className="h-[200px] w-full md:w-[100%] rounded-md"
            />
          }
          title="Track and reach your financial goals"
          text="GreenOak has patnered with Suze Ormen to offer high rate savings account and bonus for its member"
        />
      </div>
    </section>
  );
};

export default Why;
