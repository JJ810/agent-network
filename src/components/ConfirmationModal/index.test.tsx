import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "./index";

describe("ConfirmationModal Component", () => {
  it("should render the confirmation message", () => {
    render(
      <ConfirmationModal
        message="Are you sure you want to delete this agent?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(
      screen.getByText(/are you sure you want to delete this agent\?/i)
    ).toBeInTheDocument();
  });

  it("should call onConfirm when the delete button is clicked", () => {
    const onConfirmMock = jest.fn();
    render(
      <ConfirmationModal
        message="Are you sure you want to delete this agent?"
        onConfirm={onConfirmMock}
        onCancel={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/confirm/i));
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it("should call onCancel when the cancel button is clicked", () => {
    const onCancelMock = jest.fn();
    render(
      <ConfirmationModal
        message="Are you sure you want to delete this agent?"
        onConfirm={jest.fn()}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByText(/cancel/i));
    expect(onCancelMock).toHaveBeenCalled();
  });
});
