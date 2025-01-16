import { Agent } from "@/types/agent";
import dayjs from "dayjs";
import React, { useState } from "react";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";

interface AgentListProps {
  agents: Agent[];
  onDelete: (id: string) => void;
}

const AgentList: React.FC<AgentListProps> = ({ agents, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setAgentToDelete(id);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (agentToDelete) {
      onDelete(agentToDelete);
    }
    setShowPopup(false);
    setAgentToDelete(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setAgentToDelete(null);
  };

  return (
    <>
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
              <td className="border border-gray-300 px-4 py-2">
                {agent.email}
              </td>
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
                  onClick={() => handleDeleteClick(agent.id)}
                  className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <ConfirmationModal
          message="Are you sure you want to delete this agent?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default AgentList;
