import React, { useState, useEffect } from "react";

const apiUrl = "https://api.etherscan.io/api";
const convertWeiToEth = (value: number) => {
  return value / 1000000000000000000;
}

interface TransactionsProp {
  wallet: string;
  block: string;
}

interface TransactionType {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export const Transactions = (props: TransactionsProp) => {
  const { block, wallet } = props;
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${apiUrl}/?module=account&action=txlist&address=${wallet}&startblock=${block}&sort=desc&apikey=4N7C6JIACE46WX7RF35B7KGMW6J3WQW6D9`
    )
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.result || []);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setIsLoading(false);
      });
  }, [block, wallet]);

  return (
    <div className="App-transactions">
      {isLoading ? (
        <span>Loading...</span>
      ) : transactions.length ? (
        <table>
          <thead>
            <th>Txn Hash</th>
            <th>Block</th>
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Txn Fee</th>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr>
                <td>{trx.blockHash}</td>
                <td>{trx.blockNumber}</td>
                <td>{trx.timeStamp}</td>
                <td>{trx.from}</td>
                <td>{trx.to ? trx.to : trx.contractAddress ? 'Contract Creation' : ''}</td>
                <td>{convertWeiToEth(parseFloat(trx.value))}</td>
                <td>{convertWeiToEth(parseFloat(trx.gasUsed) * parseFloat(trx.gasPrice))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No data"
      )}
    </div>
  );
};
