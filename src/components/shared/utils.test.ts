import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  validateEmail,
  getScoreClass,
  getScoreWidth,
  filterLeads,
  generateLeadId,
  formatText,
  validateLeadData,
  debounce,
} from "./utils";
import { SCORE_CLASSES, SCORE_CONFIG } from "./constants";

describe("validateEmail", () => {
  it("should validate correct email formats", () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.co.uk",
      "user+tag@example.org",
      "user123@test-domain.com",
    ];

    validEmails.forEach(email => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });
  });

  it("should invalidate incorrect email formats", () => {
    const invalidEmails = [
      "invalid-email",
      "@domain.com",
      "user@",
      "user@domain",
      "user.domain.com",
      "",
      "user @domain.com",
      "user@domain .com",
    ];

    invalidEmails.forEach(email => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe("Email inválido");
    });
  });
});

describe("getScoreClass", () => {
  it("should return high class for scores >= 90", () => {
    expect(getScoreClass(90)).toBe(SCORE_CLASSES.HIGH);
    expect(getScoreClass(95)).toBe(SCORE_CLASSES.HIGH);
    expect(getScoreClass(100)).toBe(SCORE_CLASSES.HIGH);
  });

  it("should return medium class for scores >= 70 and < 90", () => {
    expect(getScoreClass(70)).toBe(SCORE_CLASSES.MEDIUM);
    expect(getScoreClass(80)).toBe(SCORE_CLASSES.MEDIUM);
    expect(getScoreClass(89)).toBe(SCORE_CLASSES.MEDIUM);
  });

  it("should return low class for scores < 70", () => {
    expect(getScoreClass(0)).toBe(SCORE_CLASSES.LOW);
    expect(getScoreClass(50)).toBe(SCORE_CLASSES.LOW);
    expect(getScoreClass(69)).toBe(SCORE_CLASSES.LOW);
  });
});

describe("getScoreWidth", () => {
  it("should return the score when it is greater than minimum width", () => {
    expect(getScoreWidth(50)).toBe(50);
    expect(getScoreWidth(75)).toBe(75);
    expect(getScoreWidth(100)).toBe(100);
  });

  it("should return minimum width when score is less than minimum", () => {
    expect(getScoreWidth(5)).toBe(SCORE_CONFIG.MIN_WIDTH);
    expect(getScoreWidth(0)).toBe(SCORE_CONFIG.MIN_WIDTH);
    expect(getScoreWidth(-10)).toBe(SCORE_CONFIG.MIN_WIDTH);
  });

  it("should return minimum width when score equals minimum", () => {
    expect(getScoreWidth(SCORE_CONFIG.MIN_WIDTH)).toBe(SCORE_CONFIG.MIN_WIDTH);
  });
});

describe("filterLeads", () => {
  const mockLeads = [
    {
      id: "1",
      name: "John Doe",
      company: "Tech Corp",
      email: "john@techcorp.com",
      status: "new",
    },
    {
      id: "2",
      name: "Jane Smith",
      company: "Design Studio",
      email: "jane@designstudio.com",
      status: "contacted",
    },
    {
      id: "3",
      name: "Bob Johnson",
      company: "Marketing Inc",
      email: "bob@marketing.com",
      status: "qualified",
    },
  ];

  it("should filter leads by name (case insensitive)", () => {
    const result = filterLeads(mockLeads, "john", "all");
    expect(result).toHaveLength(2);
    expect(result.map(lead => lead.name)).toEqual(["John Doe", "Bob Johnson"]);
  });

  it("should filter leads by company (case insensitive)", () => {
    const result = filterLeads(mockLeads, "tech", "all");
    expect(result).toHaveLength(1);
    expect(result[0].company).toBe("Tech Corp");
  });

  it("should filter leads by email (case insensitive)", () => {
    const result = filterLeads(mockLeads, "designstudio", "all");
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe("jane@designstudio.com");
  });

  it("should filter leads by status", () => {
    const result = filterLeads(mockLeads, "", "contacted");
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("contacted");
  });

  it("should filter leads by both search term and status", () => {
    const result = filterLeads(mockLeads, "john", "new");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });

  it('should return all leads when search term is empty and status is "all"', () => {
    const result = filterLeads(mockLeads, "", "all");
    expect(result).toHaveLength(3);
  });

  it("should return empty array when no matches found", () => {
    const result = filterLeads(mockLeads, "nonexistent", "all");
    expect(result).toHaveLength(0);
  });
});

describe("generateLeadId", () => {
  it("should generate unique IDs", () => {
    const id1 = generateLeadId();
    const id2 = generateLeadId();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe("number");
    expect(typeof id2).toBe("number");
  });

  it("should generate positive numbers", () => {
    const id = generateLeadId();
    expect(id).toBeGreaterThan(0);
  });
});

describe("formatText", () => {
  it("should return original text when length is within limit", () => {
    const text = "Short text";
    expect(formatText(text, 50)).toBe(text);
    expect(formatText(text, text.length)).toBe(text);
  });

  it("should truncate text when length exceeds limit", () => {
    const text = "This is a very long text that should be truncated";
    const result = formatText(text, 20);
    expect(result).toBe("This is a very long ...");
    expect(result.length).toBe(23); // 20 + '...'
  });

  it("should use default max length of 50", () => {
    const text = "A".repeat(60);
    const result = formatText(text);
    expect(result.length).toBe(53); // 50 + '...'
    expect(result.endsWith("...")).toBe(true);
  });

  it("should handle empty string", () => {
    expect(formatText("")).toBe("");
  });
});

describe("validateLeadData", () => {
  it("should validate complete and correct lead data", () => {
    const validLead = {
      name: "John Doe",
      email: "john@example.com",
      company: "Tech Corp",
    };
    const result = validateLeadData(validLead);
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it("should invalidate lead without name", () => {
    const invalidLead = {
      email: "john@example.com",
      company: "Tech Corp",
    };
    const result = validateLeadData(invalidLead);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Nome é obrigatório");
  });

  it("should invalidate lead with empty name", () => {
    const invalidLead = {
      name: "   ",
      email: "john@example.com",
      company: "Tech Corp",
    };
    const result = validateLeadData(invalidLead);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Nome é obrigatório");
  });

  it("should invalidate lead without email", () => {
    const invalidLead = {
      name: "John Doe",
      company: "Tech Corp",
    };
    const result = validateLeadData(invalidLead);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Email é obrigatório");
  });

  it("should invalidate lead with invalid email format", () => {
    const invalidLead = {
      name: "John Doe",
      email: "invalid-email",
      company: "Tech Corp",
    };
    const result = validateLeadData(invalidLead);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Email inválido");
  });

  it("should invalidate lead without company", () => {
    const invalidLead = {
      name: "John Doe",
      email: "john@example.com",
    };
    const result = validateLeadData(invalidLead);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Empresa é obrigatória");
  });

  it("should invalidate lead with empty company", () => {
    const invalidLead = {
      name: "John Doe",
      email: "john@example.com",
      company: "   ",
    };
    const result = validateLeadData(invalidLead);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("Empresa é obrigatória");
  });
});

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should delay function execution", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn("test");
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith("test");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should cancel previous calls when called multiple times", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn("first");
    debouncedFn("second");
    debouncedFn("third");

    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith("third");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple arguments", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn("arg1", "arg2", "arg3");
    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2", "arg3");
  });

  it("should work with different wait times", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn("test");
    vi.advanceTimersByTime(100);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledWith("test");
  });
});
