import React from "react";
import Check from "../assets/Check";
import Block from "../assets/Block";
import Options from "../assets/Options";

const Table = () => (
  <div className="flex flex-col">
    <div className="overflow-x-auto">
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Source
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                >
                  Received At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                />
              </tr>
            </thead>
            <tbody className="bg-gray-50 border border-gray-200">
              {[1, 2, 3, 4]?.map((s) => (
                <tr key={s} className="border-b border-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center border border-gray-200 bg-gray-100 rounded-md px-2.5 py-1.5">
                        <Check />
                        <span className="ml-1.5 text-sm font-semibold">6</span>
                      </div>
                      <div className="flex items-center border border-gray-200 bg-gray-100 rounded-md px-2.5 py-1.5 ml-2">
                        <Block />
                        <span className="ml-1.5 text-sm font-semibold">0</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    req_9zmcxUAlNG1ZcbZ2PNR4
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    Send_event
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-medium text-right whitespace-nowrap">
                    3:15 PM, Mar 30
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 font-medium text-right">
                    <Options />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Table;
