import { Agent } from "@/types/agent";
import dayjs from "dayjs";
import React from "react";
import Link from "next/link";

interface AgentListProps {
  agents: Agent[];
}

const AgentList: React.FC<AgentListProps> = ({ agents }) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-black">
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Last Seen</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {agents.map((agent) => (
          <tr key={agent.id} className="text-center">
            <td className="border border-gray-300 px-4 py-2">{agent.name}</td>
            <td className="border border-gray-300 px-4 py-2">{agent.email}</td>
            <td
              className={`border border-gray-300 px-4 py-2 ${
                agent.status === "Active" ? "text-green-500" : "text-red-500"
              }`}
            >
              {agent.status}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {dayjs(agent.lastSeen).format("MM/DD/YYYY hh:mm A")}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <Link href={`/agents/${agent.id}`}>
                <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => console.log(`Delete ${agent.id}`)}
                className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgentList;
