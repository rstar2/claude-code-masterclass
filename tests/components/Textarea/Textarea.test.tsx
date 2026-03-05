import { render, screen } from "@testing-library/react";
import Textarea from "@/components/Textarea/Textarea";

describe("Textarea", () => {
  it("renders successfully", () => {
    render(<Textarea name="test" label="Test Textarea" />);
    expect(screen.getByLabelText("Test Textarea")).toBeInTheDocument();
  });

  it("applies required attribute", () => {
    render(<Textarea name="test" label="Test Textarea" required />);
    expect(screen.getByLabelText("Test Textarea")).toBeRequired();
  });

  it("applies maxLength attribute", () => {
    render(<Textarea name="test" label="Test Textarea" maxLength={200} />);
    const textarea = screen.getByLabelText(
      "Test Textarea",
    ) as HTMLTextAreaElement;
    expect(textarea.maxLength).toBe(200);
  });

  it("has correct name attribute", () => {
    render(<Textarea name="description" label="Test Textarea" />);
    expect(screen.getByLabelText("Test Textarea")).toHaveAttribute(
      "name",
      "description",
    );
  });

  it("has 4 rows by default", () => {
    render(<Textarea name="test" label="Test Textarea" />);
    const textarea = screen.getByLabelText(
      "Test Textarea",
    ) as HTMLTextAreaElement;
    expect(textarea.rows).toBe(4);
  });
});
