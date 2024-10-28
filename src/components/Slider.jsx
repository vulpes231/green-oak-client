import React from "react";
import { BsBank, BsCreditCard, BsPrinter, BsSafe } from "react-icons/bs";
import Article from "./Article";

const Slider = () => {
  return (
    <section className="p-10 bg-slate-800 text-[#fff] lg:p-16">
      <div className="lg:max-w-[1100px] grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:mx-auto">
        <Article
          icon={<BsSafe className="text-5xl" />}
          title="
          Save more money
        "
          paragraph="Our High Rate Savings account pays you the bank bational average"
        />
        <Article
          icon={<BsBank className="text-5xl" />}
          title="
        Bank online stress free
        "
          paragraph="Bank anywhere, anytime using online banking."
        />
        <Article
          icon={<BsCreditCard className="text-5xl" />}
          title="
        Earn Unlimited Cash Back
        "
          paragraph="Unlimited cash back credit card with no annual fee and no tricky
        spending categories to track"
        />
        <Article
          icon={<BsPrinter className="text-5xl" />}
          title="
        Check out our checking
        "
          paragraph="ATm rebates - No ATM scavenger hunts plus no overdraft fees"
        />
      </div>
    </section>
  );
};

export default Slider;
