import React from "react";
import { BsBank, BsCreditCard, BsPrinter, BsSafe } from "react-icons/bs";
import Article from "./Article";

const Slider = () => {
  return (
    <section className="p-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:pt-10 lg:max-w-[1100px] mx-auto">
      <Article
        icon={<BsSafe className="text-6xl text-[#347338]" />}
        title="
          Save more money
        "
        paragraph="Our High Rate Savings account pays you the bank bational average"
      />
      <Article
        icon={<BsBank className="text-6xl text-[#347338]" />}
        title="
        Bank online stress free
        "
        paragraph="Bank anywhere, anytime using online banking."
      />
      <Article
        icon={<BsCreditCard className="text-6xl text-[#347338]" />}
        title="
        Earn Unlimited Cash Back
        "
        paragraph="Unlimited cash back credit card with no annual fee and no tricky
        spending categories to track"
      />
      <Article
        icon={<BsPrinter className="text-6xl text-[#347338]" />}
        title="
        Check out our checking
        "
        paragraph="ATm rebates - No ATM scavenger hunts plus no overdraft fees"
      />
    </section>
  );
};

export default Slider;
