"use client";
import React, { useContext, useState } from "react";
import { AgentContext } from "@/contexts/AgentContext";
import AgentList from "@/components/AgentList";
import Link from "next/link";

const AgentsPage: React.FC = () => {
  const { agents, deleteAgent } = useContext(AgentContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteAgent = (id: string) => {
    deleteAgent(id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Agents Dashboard</h1>

      <div className="flex justify-between items-center mb-4 gap">
        <input
          type="text"
          placeholder="Search agents by name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-[400px] p-2 border border-gray-300 rounded-md text-black"
        />
        <Link href="/agents/add" className="hidden md:block">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Agent
          </button>
        </Link>
      </div>
      <AgentList agents={filteredAgents} onDelete={handleDeleteAgent} />
      <div className="md:hidden mt-4 flex justify-end">
        <Link href="/agents/add">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Agent
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AgentsPage;
