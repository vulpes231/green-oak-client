import React from "react";
import numeral from "numeral";

const trnxStyle = {
  th: "px-4 py-3 text-center font-bold uppercase text-sm md:text-lg",
  td: "px-4 py-3 text-center capitalize whitespace-nowrap",
};

const Transaction = ({ data }) => {
  // console.log(data);
  return (
    <div className="overflow-auto font-[Roboto] border border-slate-200 shadow">
      <table className="divide-slate-300 min-w-full ">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className={trnxStyle.th}>Date</th>
            <th className={trnxStyle.th}>Memo</th>
            <th className={trnxStyle.th}>Amount</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light  text-slate-600">
          {data?.map((trnx, index) => {
            return (
              <tr
                key={trnx._id}
                className={`${
                  index % 2 !== 0 ? "bg-slate-100" : "bg-white"
                } border-b border-slate-300`}
              >
                <td className={trnxStyle.td}>{trnx.date}</td>
                <td className={` ${trnxStyle.td}`}>{trnx.desc}</td>
                <td className={trnxStyle.td}>
                  <span
                    className={`${
                      trnx.trx_type === "deposit"
                        ? "text-green-500"
                        : "text-red-500"
                    } flex items-center gap-1 justify-end font-medium pr-5`}
                  >
                    <span
                      className={
                        trnx.trx_type === "deposit" ? "hidden" : "flex"
                      }
                    >
                      -
                    </span>{" "}
                    {numeral(trnx.amount).format("$0,0.00")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
