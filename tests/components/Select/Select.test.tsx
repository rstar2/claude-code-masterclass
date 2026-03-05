import { render, screen } from "@testing-library/react";
import Select from "@/components/Select/Select";
import type { SelectOption } from "@/components/Select/Select";

describe("Select", () => {
  const options: SelectOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  it("renders successfully", () => {
    render(<Select name="test" label="Test Select" options={options} />);
    expect(screen.getByLabelText("Test Select")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Select name="test" label="Test Select" options={options} />);
    const select = screen.getByLabelText("Test Select") as HTMLSelectElement;
    expect(select.options.length).toBe(3);
    expect(select.options[0].label).toBe("Option 1");
    expect(select.options[1].label).toBe("Option 2");
    expect(select.options[2].label).toBe("Option 3");
  });

  it("applies required attribute", () => {
    render(
      <Select name="test" label="Test Select" options={options} required />,
    );
    expect(screen.getByLabelText("Test Select")).toBeRequired();
  });

  it("sets default value", () => {
    render(
      <Select
        name="test"
        label="Test Select"
        options={options}
        defaultValue="2"
      />,
    );
    const select = screen.getByLabelText("Test Select") as HTMLSelectElement;
    expect(select.value).toBe("2");
  });
});
