import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "../components/Common/ErrorBoundary";

const ChildComponent = () => {
    throw new Error("Test error");
};

describe("ErrorBoundary", () => {
    it("renders fallback UI when there is an error", () => {
        render(
            <ErrorBoundary>
                <ChildComponent />
            </ErrorBoundary>
        );

        // Assert that the fallback UI is rendered
        expect(screen.getByText("Error occurred!")).toBeInTheDocument();
    });

    it("renders child component when there is no error", () => {
        render(
            <ErrorBoundary>
                <div>No error</div>
            </ErrorBoundary>
        );

        // Assert that the child component is rendered
        expect(screen.getByText("No error")).toBeInTheDocument();
    });
});
