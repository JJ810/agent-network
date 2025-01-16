"use client";

import React, { useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import { AgentContext } from "@/contexts/AgentContext";
import AgentForm from "@/components/AgentForm";
import { Agent } from "@/types/agent";

const EditAgentPage: React.FC = () => {
  const { agents, updateAgent } = useContext(AgentContext);
  const router = useRouter();
  const { id } = useParams();

  const agentToEdit = agents.find((agent) => agent.id === id);

  if (!agentToEdit) {
    router.push("/agents");
    return null;
  }

  const handleUpdateAgent = (updatedData: Agent) => {
    updateAgent(agentToEdit.id, updatedData);
    router.push("/agents");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Agent</h1>
      <AgentForm
        initialData={agentToEdit}
        onSubmit={handleUpdateAgent}
        onCancel={() => router.push("/agents")}
        isEdit
      />
    </div>
  );
};

export default EditAgentPage;
