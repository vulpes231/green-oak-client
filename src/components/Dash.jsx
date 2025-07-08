import React from "react";
import Transaction from "./Transaction";
// import Account from "./Account";

const Dash = ({ accts, userTrnxs, latestTransactions }) => {
	return (
		<div className="flex flex-col gap-4 p-6">
			<div className="rounded-lg flex flex-col gap-4">
				<h3 className="text-xl font-medium">Accounts</h3>
				<div className="">{accts}</div>
			</div>
			<div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
				<div className="mt-8">
					<h3 className="font-semibold text-xl text-gray-800 mb-4">
						Recent Activities
					</h3>

					<div className="flex flex-col gap-3 mb-24">
						{userTrnxs && userTrnxs.length ? (
							<Transaction data={latestTransactions} />
						) : (
							<div className="p-6 text-center text-gray-400 text-sm">
								You have no recent transactions
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dash;
