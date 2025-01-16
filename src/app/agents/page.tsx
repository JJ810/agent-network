"use client";
import React, { useContext } from "react";
import { AgentContext } from "@/contexts/AgentContext";
import AgentList from "@/components/AgentList";
import Link from "next/link";

const AgentsPage: React.FC = () => {
  const { agents, deleteAgent } = useContext(AgentContext);

  const handleDeleteAgent = (id: string) => {
    deleteAgent(id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Agents Dashboard</h1>

      <div className="flex justify-end mb-4">
        <Link href="/agents/add">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Agent
          </button>
        </Link>
      </div>

      {agents.length > 0 ? (
        <AgentList agents={agents} onDelete={handleDeleteAgent} />
      ) : (
        <p className="text-gray-500">
          No agents found. Click "Add Agent" to create one.
        </p>
      )}
    </div>
  );
};

export default AgentsPage;
