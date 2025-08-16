import { LeadsContext } from "@/contexts/leads-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Lead, Opportunity } from "@/types";
import { RenderOptions, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { vi } from "vitest";

// Mock data for testing
export const mockLeads: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Corp",
    email: "john@techcorp.com",
    source: "Website",
    score: 85,
    status: "New",
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Design Studio",
    email: "jane@designstudio.com",
    source: "Referral",
    score: 92,
    status: "Contacted",
  },
  {
    id: 3,
    name: "Bob Johnson",
    company: "Marketing Inc",
    email: "bob@marketing.com",
    source: "Social Media",
    score: 78,
    status: "Qualified",
  },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    name: "Tech Corp Deal",
    stage: "Proposal",
    amount: 50000,
    accountName: "Tech Corp",
  },
  {
    id: 2,
    name: "Design Studio Project",
    stage: "Negotiation",
    amount: 25000,
    accountName: "Design Studio",
  },
];

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialLeads?: Lead[];
  initialOpportunities?: Opportunity[];
  theme?: "light" | "dark" | "system";
}

// Mock LeadsContext for testing
const MockLeadsProvider = ({
  children,
  initialLeads = mockLeads,
}: {
  children: React.ReactNode;
  initialLeads?: Lead[];
}) => {
  const mockContextValue = {
    leads: initialLeads,
    loading: false,
    addLead: vi.fn(),
    updateLead: vi.fn(),
    deleteLead: vi.fn(),
    importLeads: vi.fn(),
    clearLeads: vi.fn(),
  };

  return <LeadsContext.Provider value={mockContextValue}>{children}</LeadsContext.Provider>;
};

function AllTheProviders({
  children,
  initialLeads = mockLeads,
  theme = "light",
}: {
  children: React.ReactNode;
  initialLeads?: Lead[];
  theme?: "light" | "dark" | "system";
}) {
  return (
    <ThemeProvider defaultTheme={theme} storageKey="test-theme">
      <MockLeadsProvider initialLeads={initialLeads}>{children}</MockLeadsProvider>
    </ThemeProvider>
  );
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { initialLeads, theme, ...renderOptions } = options;

  return render(ui, {
    wrapper: props => <AllTheProviders {...props} initialLeads={initialLeads} theme={theme} />,
    ...renderOptions,
  });
};

// Helper functions for common test scenarios
export const createMockLead = (overrides: Partial<Lead> = {}): Lead => ({
  id: Math.floor(Math.random() * 10000),
  name: "Test Lead",
  company: "Test Company",
  email: "test@example.com",
  source: "Test Source",
  score: 75,
  status: "New",
  ...overrides,
});

export const createMockOpportunity = (overrides: Partial<Opportunity> = {}): Opportunity => ({
  id: Math.floor(Math.random() * 10000),
  name: "Test Opportunity",
  stage: "Proposal",
  amount: 10000,
  accountName: "Test Account",
  ...overrides,
});

// Mock file for testing file uploads
export const createMockFile = (name: string = "test.json", content: string = "[]"): File => {
  const blob = new Blob([content], { type: "application/json" });
  return new File([blob], name, { type: "application/json" });
};

// Wait for async operations
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Re-export everything from testing library
export * from "@testing-library/react";
export { customRender, customRender as render };
