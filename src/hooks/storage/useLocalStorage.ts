import { useCallback, useEffect, useState } from "react";

/**
 * Custom React hook for localStorage with state sync and edge case handling.
 * @param key The localStorage key
 * @param initialValue The initial value if not present in storage
 * @returns [value, setValue, clearValue]
 */
const useLocalStorage = (key: string, initialValue: string | null = null) => {
	// Read value from localStorage
	const readValue = useCallback((): string | null => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.localStorage.getItem(key);
			return item !== null ? item : initialValue;
		} catch {
			return initialValue;
		}
	}, [key, initialValue]);

	const [storedValue, setStoredValue] = useState<string | null>(readValue);

	// Set value in state and localStorage
	const setValue = useCallback(
		(value: string | null) => {
			try {
				if (typeof window === "undefined") return;
				if (value === null) {
					window.localStorage.removeItem(key);
					setStoredValue(null);
				} else {
					window.localStorage.setItem(key, value);
					setStoredValue(value);
				}
			} catch (err) {
				console.log("Error setting localStorage:", err);
			}
		},
		[key],
	);

	// Remove value from localStorage and state
	const clearValue = useCallback(() => {
		try {
			if (typeof window === "undefined") return;
			window.localStorage.removeItem(key);
			setStoredValue(null);
		} catch (err) {
			console.log("Error clearing localStorage:", err);
		}
	}, [key]);

	// Listen for storage changes from other tabs
	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key === key) {
				setStoredValue(event.newValue);
			}
		};
		window.addEventListener("storage", handleStorage);

		return () => window.removeEventListener("storage", handleStorage);
	}, [key]);

	return [storedValue, setValue, clearValue] as const;
};

export default useLocalStorage;
