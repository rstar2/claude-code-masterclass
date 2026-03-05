import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeistCard from "@/components/HeistCard";

describe("HeistCard", () => {
  const defaultProps = {
    id: "1",
    title: "Steal the office coffee machine",
    targetUser: "@SecretSauceAgent",
    createdBy: "@NightOwl",
    deadline: "Mar 12, 2026",
    status: "active" as const,
  };

  it("renders successfully", () => {
    render(<HeistCard {...defaultProps} />);
    expect(
      screen.getByText("Steal the office coffee machine"),
    ).toBeInTheDocument();
  });

  it("links title to heist detail page", () => {
    render(<HeistCard {...defaultProps} id="123" />);
    const link = screen.getByRole("link", {
      name: "Steal the office coffee machine",
    });
    expect(link).toHaveAttribute("href", "/heists/123");
  });

  it("displays target user with primary color styling", () => {
    render(<HeistCard {...defaultProps} />);
    expect(screen.getByText("@SecretSauceAgent")).toBeInTheDocument();
  });

  it("displays creator with secondary color styling", () => {
    render(<HeistCard {...defaultProps} />);
    expect(screen.getByText("@NightOwl")).toBeInTheDocument();
  });

  it("displays deadline", () => {
    render(<HeistCard {...defaultProps} />);
    expect(screen.getByText("Mar 12, 2026")).toBeInTheDocument();
  });

  it('shows "Active" status for active heists', () => {
    render(<HeistCard {...defaultProps} status="active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it('shows "Assigned" status for assigned heists', () => {
    render(<HeistCard {...defaultProps} status="assigned" />);
    expect(screen.getByText("Assigned")).toBeInTheDocument();
  });

  it('shows "Overdue" status for expired heists', () => {
    render(<HeistCard {...defaultProps} status="expired" />);
    expect(screen.getByText("Overdue")).toBeInTheDocument();
  });

  it("renders menu button with aria-label", () => {
    render(<HeistCard {...defaultProps} />);
    expect(screen.getByLabelText("More options")).toBeInTheDocument();
  });
});
