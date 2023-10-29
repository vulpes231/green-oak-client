import React from "react";

const Account = ({ title, number, balance, date }) => {
  return (
    <section>
      <article>
        <div className="grid grid-cols-4">
          <p className="underline uppercase">{title}</p>
          <p>{number}</p>
          <p>{balance}</p>
          <p>{date}</p>
        </div>
      </article>
    </section>
  );
};

export default Account;
