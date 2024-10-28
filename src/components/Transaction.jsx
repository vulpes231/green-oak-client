import React from "react";
import numeral from "numeral";

const Transaction = ({ data }) => {
  // console.log(data);
  return (
    <div className="overflow-auto font-[Roboto]">
      <table className="divide-slate-300 min-w-full ">
        <thead className="text-left text-sm bg-green-700 text-white">
          <tr>
            <th className="px-4 py-2.5 font-medium text-left">Date</th>
            <th className="px-4 py-2.5 font-medium text-left">Description</th>
            <th className="px-4 py-2.5 font-medium text-left">Amount</th>
          </tr>
        </thead>
        <tbody className="text-xs font-light ">
          {data?.map((trnx, index) => {
            return (
              <tr
                key={trnx._id}
                className={index % 2 !== 0 ? "bg-slate-100" : "bg-white"}
              >
                <td className="px-4 py-3.5 whitespace-nowrap text-left">
                  {trnx.date}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-left">
                  {trnx.desc}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-left">
                  <span
                    className={
                      trnx.trx_type === "credit"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
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
