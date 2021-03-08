import { act, fireEvent, render, waitFor } from "@testing-library/react";
import App from "../pages/index";

describe("App", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText("Github User Repo Search")).toBeDefined();
  });

  it("should give an error if no username entered.", async () => {
    const { container, getByText } = render(<App />);

    const input = container.querySelector("input");

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "",
        },
      });
    });
    getByText("Search").click();
    expect(getByText("Please enter a username.")).toBeDefined();
  });

  it("should display a message if no repos found.", async () => {
    fetch.once(JSON.stringify([]));
    const { container, getByText } = render(<App />);
    const input = container.querySelector("input");

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "faceboook",
        },
      });
    });

    getByText("Search").click();

    await waitFor(() =>
      expect(getByText("No repos found. Try another username.")).toBeDefined()
    );
  });

  it("should display results with count", async () => {
    fetch.once(
      JSON.stringify([
        {
          id: 1,
          name: "react",
          stargazers_count: 1000,
        },
      ])
    );
    const { container, getByText } = render(<App />);
    const input = container.querySelector("input");

    act(() => {
      fireEvent.change(input, {
        target: {
          value: "facebook",
        },
      });
    });

    getByText("Search").click();

    await waitFor(() => {
      expect(getByText("react")).toBeDefined();
      expect(getByText("1,000")).toBeDefined();
    });
  });
});
