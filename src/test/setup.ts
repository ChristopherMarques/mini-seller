import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

// Mock URL.createObjectURL
Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: vi.fn(() => "mocked-url"),
});

// Mock URL.revokeObjectURL
Object.defineProperty(URL, "revokeObjectURL", {
  writable: true,
  value: vi.fn(),
});

// Mock File constructor
global.File = class MockFile implements File {
  name: string = "";
  constructor(
    public _chunks: any[],
    public _name: string,
    public _options?: any,
  ) {}
  get size() {
    return 1024;
  }
  get type() {
    return "text/plain";
  }
  get lastModified() {
    return Date.now();
  }
  get webkitRelativePath() {
    return "";
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  }

  slice(_start?: number, _end?: number, _contentType?: string): Blob {
    return new Blob();
  }

  stream(): ReadableStream<Uint8Array> {
    return new ReadableStream();
  }

  async text(): Promise<string> {
    return "";
  }
} as any;

// Mock Blob constructor
global.Blob = class MockBlob {
  constructor(
    public _chunks?: any[],
    public _options?: any,
  ) {}
  get size() {
    return 1024;
  }
  get type() {
    return "text/plain";
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  }

  slice(_start?: number, _end?: number, _contentType?: string): Blob {
    return new MockBlob();
  }

  stream(): ReadableStream<Uint8Array> {
    return new ReadableStream();
  }

  async text(): Promise<string> {
    return "";
  }
} as any;
