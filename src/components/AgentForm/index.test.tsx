import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import AgentForm from "./index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const defaultProps = {
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
  isEdit: false,
};
const mockPush = jest.fn();

describe("AgentForm Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render form inputs with default values", () => {
    render(<AgentForm {...defaultProps} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/status/i)).toHaveValue("Active");
  });

  it("should display validation errors if fields are empty", () => {
    render(<AgentForm {...defaultProps} />);

    fireEvent.click(screen.getByText(/add agent/i));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it("should call onSubmit with form data when valid", () => {
    const onSubmitMock = jest.fn();
    render(<AgentForm {...defaultProps} onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "Inactive" },
    });

    fireEvent.click(screen.getByText(/Add Agent/i));
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      status: "Inactive",
    });
  });

  it("should display an error message for an invalid email", () => {
    render(<AgentForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "Active" },
    });

    fireEvent.click(screen.getByText(/Add Agent/i));

    expect(mockPush).not.toHaveBeenCalled();
  });
});
