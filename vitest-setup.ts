import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '',
  redirect: vi.fn(),
}));

// Mock Audio
class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  currentTime = 0;
  addEventListener = vi.fn((event, cb) => {
    if (event === 'ended') {
      setTimeout(cb, 10);
    }
  });
  removeEventListener = vi.fn();
}
global.Audio = MockAudio as any;
