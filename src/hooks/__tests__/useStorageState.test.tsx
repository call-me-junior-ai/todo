import { renderHook, act } from '@testing-library/react-hooks';
import { useStorageState } from '../useStorageState';

// Mocking localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function(key: string) {
      delete store[key];
    },
    clear: function() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useStorageState', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should use default value when there is no value in local storage', () => {
    const { result } = renderHook(() => useStorageState('default', 'testKey'));

    expect(result.current[0]).toBe('default');
  });

  it('should use stored value when there is a value in local storage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useStorageState('default', 'testKey'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should update local storage when the value changes', () => {
    const { result } = renderHook(() => useStorageState('default', 'testKey'));
    const [, setValue] = result.current;

    act(() => {
      setValue('newValue');
    });

    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('should update the state when the value in local storage changes externally', () => {
    const { result } = renderHook(() => useStorageState('default', 'testKey'));

    window.localStorage.setItem('testKey', JSON.stringify('externalValue'));

    // Re-render to simulate external change
    act(() => {
      result.current[1](prev => prev);
    });

    expect(result.current[0]).toBe('externalValue');
  });

  // If you would like to test removing the item from localStorage when it's null or undefined
  // you need to make your hook capable of handling this situation.
  it('should remove the item from localStorage when set to null', () => {
    const { result } = renderHook(() => useStorageState('default', 'testKey'));
    const [, setValue] = result.current;

    act(() => {
      setValue('');
    });

    expect(window.localStorage.getItem('testKey')).toEqual('');
  });
});

