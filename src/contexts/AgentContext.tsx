"use client";
import React, { createContext, useState, useEffect } from "react";
import { Agent } from "@/types/agent";

interface AgentContextProps {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updatedAgent: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
}

export const AgentContext = createContext<AgentContextProps>({
  agents: [],
  addAgent: () => {},
  updateAgent: () => {},
  deleteAgent: () => {},
});

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const storedAgents = localStorage.getItem("agents");
    if (storedAgents) {
      setAgents(JSON.parse(storedAgents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);

  const addAgent = (agent: Agent) => setAgents((prev) => [...prev, agent]);

  const updateAgent = (id: string, updatedAgent: Partial<Agent>) =>
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, ...updatedAgent } : agent
      )
    );

  const deleteAgent = (id: string) =>
    setAgents((prev) => prev.filter((agent) => agent.id !== id));

  return (
    <AgentContext.Provider
      value={{ agents, addAgent, updateAgent, deleteAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
};
