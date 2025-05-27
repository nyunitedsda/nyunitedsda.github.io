

import { render } from "../../../utils/vitest-setup";
import FooterSegment from "./FooterSegment";


describe("FooterSegment", () => {
  const title = "Test Title";
  const subtitle = "Test Subtitle";
  const children = <div data-testid="child">Child Content</div>;
  const sx = { backgroundColor: "red" };

  it("renders the title in Typography h6", () => {
    const { getByText } = render(
      <FooterSegment title={title}>{children}</FooterSegment>
    );
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe("h6");
  });

  it("renders the subtitle if provided", () => {
    const { getByText } = render(
      <FooterSegment title={title} subtitle={subtitle}>
        {children}
      </FooterSegment>
    );
    const subtitleElement = getByText(subtitle);
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName.toLowerCase()).toBe("p");
  });

  it("does not render subtitle Typography if subtitle is not provided", () => {
    const { queryByText } = render(
      <FooterSegment title={title}>{children}</FooterSegment>
    );
    expect(queryByText(subtitle)).toBeNull();
  });

  it("renders children inside Box", () => {
    const { getByTestId } = render(
      <FooterSegment title={title}>{children}</FooterSegment>
    );
    expect(getByTestId("child")).toBeInTheDocument();
  });

  it("passes sx prop to Grid", () => {
    const { container } = render(
      <FooterSegment title={title} sx={sx}>
        {children}
      </FooterSegment>
    );
    // MUI applies sx as inline style, so check for backgroundColor
    const grid = container.querySelector(".MuiGrid-root");
    expect(grid).toHaveStyle("background-color: rgb(255, 0, 0)");
  });
});