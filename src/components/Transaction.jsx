import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Transaction = ({ data }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const transactionsPerPage = 6;

	// Sort transactions by date (newest first)
	const sortedTransactions = [...(data || [])].sort((a, b) => {
		// Convert dates to Date objects for comparison
		const dateA = new Date(a.date.split("/").reverse().join("/"));
		const dateB = new Date(b.date.split("/").reverse().join("/"));
		return dateB - dateA; // Descending order (newest first)
	});

	// Calculate pagination
	const indexOfLastTransaction = currentPage * transactionsPerPage;
	const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
	const currentTransactions = sortedTransactions.slice(
		indexOfFirstTransaction,
		indexOfLastTransaction
	);
	const totalPages = Math.ceil(
		(sortedTransactions.length || 0) / transactionsPerPage
	);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const nextPage = () =>
		currentPage < totalPages && setCurrentPage(currentPage + 1);
	const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

	return (
		<div className="font-[Roboto]">
			{/* Transaction Table */}
			<div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gradient-to-r from-green-600 to-green-500">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
								Date
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
								Description
							</th>
							<th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
								Amount
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{currentTransactions.length > 0 ? (
							currentTransactions.map((trnx) => (
								<tr
									key={trnx._id}
									className="hover:bg-gray-50 transition-colors"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{trnx.date}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
										{trnx.desc}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
										<span
											className={`inline-flex items-center ${
												trnx.trx_type === "deposit"
													? "text-green-600"
													: "text-red-600"
											}`}
										>
											{trnx.trx_type !== "deposit" && (
												<span className="mr-0.5">-</span>
											)}
											{numeral(trnx.amount).format("$0,0.00")}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan="3"
									className="px-6 py-4 text-center text-sm text-gray-500"
								>
									No transactions found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between mt-4 px-2">
					<div className="text-sm text-gray-500">
						Showing{" "}
						<span className="font-medium">{indexOfFirstTransaction + 1}</span>{" "}
						to{" "}
						<span className="font-medium">
							{Math.min(indexOfLastTransaction, sortedTransactions.length || 0)}
						</span>{" "}
						of{" "}
						<span className="font-medium">
							{sortedTransactions.length || 0}
						</span>{" "}
						transactions
					</div>
					<div className="flex space-x-2">
						<button
							onClick={prevPage}
							disabled={currentPage === 1}
							className={`p-2 rounded-md ${
								currentPage === 1
									? "text-gray-400 cursor-not-allowed"
									: "text-blue-600 hover:bg-blue-50"
							}`}
						>
							<FiChevronLeft className="h-5 w-5" />
						</button>

						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(number) => (
								<button
									key={number}
									onClick={() => paginate(number)}
									className={`px-3 py-1 rounded-md text-sm ${
										currentPage === number
											? "bg-blue-600 text-white"
											: "text-gray-600 hover:bg-gray-100"
									}`}
								>
									{number}
								</button>
							)
						)}

						<button
							onClick={nextPage}
							disabled={currentPage === totalPages}
							className={`p-2 rounded-md ${
								currentPage === totalPages
									? "text-gray-400 cursor-not-allowed"
									: "text-blue-600 hover:bg-blue-50"
							}`}
						>
							<FiChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Transaction;
