type Saved<T> = T & {
  id: string;
  lastSeen: string;
};

export type AgentBase = {
  name: string;
  email: string;
  status: "Active" | "Inactive";
};

export type Agent = Saved<AgentBase>;
