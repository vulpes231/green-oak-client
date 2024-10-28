import React from "react";
import WhyArticle from "./WhyArticle";
import { save, trc } from "../assets";

const Why = () => {
  return (
    <section className="bg-slate-50 p-10 lg:p-20">
      <div className="lg:max-w-[1100px] lg:mx-auto flex flex-col gap-6">
        <WhyArticle
          img={save}
          title="The ultimate opportunity savings account"
          text="GreenOak has patnered with Suze Ormen to offer high rate savings account and bonus for its member"
        />
        <WhyArticle
          img={trc}
          title="Track and reach your financial goals"
          text="GreenOak has patnered with Suze Ormen to offer high rate savings account and bonus for its member"
        />
      </div>
    </section>
  );
};

export default Why;
