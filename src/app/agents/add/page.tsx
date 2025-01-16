"use client";

import React, { useContext } from "react";
import { AgentContext } from "@/contexts/AgentContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import AgentForm from "@/components/AgentForm";
import { AgentBase } from "@/types/agent";

const AddAgentPage: React.FC = () => {
  const { addAgent } = useContext(AgentContext);
  const router = useRouter();

  const handleAddAgent = (agentData: AgentBase) => {
    const newAgent = {
      id: uuidv4(),
      ...agentData,
      lastSeen: new Date().toISOString(),
    };
    addAgent(newAgent);
    router.push("/agents");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Agent</h1>
      <AgentForm
        onSubmit={handleAddAgent}
        onCancel={() => router.push("/agents")}
      />
    </div>
  );
};

export default AddAgentPage;
