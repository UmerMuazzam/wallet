import React from 'react'

const History = ({ transactionHistory }) => {
  return (
    <div>
      {transactionHistory.length > 0 && (
        <div className="">
          {transactionHistory?.map((item, i) => {
            return (
              <div key={i}>
                <div className="flex flex-col    gap-2   my-6">
                  <span className="text-gray-500 text-[14px]">
                    <b>Sender</b> : {item.from}
                  </span>
                  <span className="text-gray-500 text-[14px]">
                    <b>Reciever</b> : {item.to}
                  </span>
                  <span className="text-gray-500 text-[14px]">
                    <b>Amount Send </b> : {item.value}
                  </span>
                  <span className="text-gray-500 text-[14px]">
                    <b>Status</b> :{" "}
                    <span className="rounded text-[12px] bg-green-400 px-2 py-1 text-white">
                      Successfull
                    </span>
                  </span>
                </div>
                <div className="h-[2px] bg-white w-[100%]"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History
