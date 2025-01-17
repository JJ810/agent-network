import { render, screen, fireEvent } from "@testing-library/react";
import AgentList from "./index";
import { Agent } from "@/types/agent";

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    lastSeen: "2025-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    lastSeen: "2025-01-02",
  },
];

const onDeleteMock = jest.fn();

describe("AgentList", () => {
  it("should render agent list", () => {
    render(<AgentList agents={mockAgents} onDelete={onDeleteMock} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("should call onDelete when delete button is clicked", () => {
    render(<AgentList agents={mockAgents} onDelete={onDeleteMock} />);

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });

    fireEvent.click(deleteButtons[0]);

    expect(
      screen.getByText("Are you sure you want to delete this agent?")
    ).toBeInTheDocument();
  });

  it("should render Edit buttons with correct hrefs", () => {
    render(<AgentList agents={mockAgents} onDelete={onDeleteMock} />);

    const editLinks = screen.getAllByRole("link", { name: "Edit" });

    expect(editLinks[0]).toHaveAttribute("href", "/agents/1");
    expect(editLinks[1]).toHaveAttribute("href", "/agents/2");
  });

  it('should display "No agents found" when the list is empty', () => {
    render(<AgentList agents={[]} onDelete={jest.fn()} />);

    expect(
      screen.getByText('No agents found. Click "Add Agent" to create one.')
    ).toBeInTheDocument();
  });

  it("should call onDelete and reset state when confirmDelete is triggered", () => {
    render(<AgentList agents={mockAgents} onDelete={onDeleteMock} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(
      screen.getByText("Are you sure you want to delete this agent?")
    ).toBeInTheDocument();
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(onDeleteMock).toHaveBeenCalledWith("1");
    expect(
      screen.queryByText("Are you sure you want to delete this agent?")
    ).not.toBeInTheDocument();
  });

  it("should close the popup and reset state when Cancel is clicked", () => {
    render(<AgentList agents={mockAgents} onDelete={onDeleteMock} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(
      screen.getByText("Are you sure you want to delete this agent?")
    ).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(
      screen.queryByText("Are you sure you want to delete this agent?")
    ).not.toBeInTheDocument();
  });
});
