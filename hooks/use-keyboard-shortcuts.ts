"use client";

import { useEffect } from "react";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}

/**
 * Custom hook for handling keyboard shortcuts
 * Supports both Mac (Cmd) and Windows/Linux (Ctrl) modifiers
 *
 * @param shortcuts - Array of keyboard shortcut configurations
 * @param enabled - Whether the shortcuts are enabled (default: true)
 *
 * @example
 * useKeyboardShortcuts([
 *   {
 *     key: 'k',
 *     ctrlKey: true,
 *     callback: () => focusSearch(),
 *     preventDefault: true
 *   }
 * ]);
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const {
          key,
          ctrlKey = false,
          metaKey = false,
          shiftKey = false,
          altKey = false,
          callback,
          preventDefault = true,
        } = shortcut;

        // Check if the key matches
        const keyMatches = event.key.toLowerCase() === key.toLowerCase();

        // Check if modifiers match (support both Ctrl and Cmd)
        const modifierMatches =
          (ctrlKey || metaKey
            ? event.ctrlKey || event.metaKey
            : !event.ctrlKey && !event.metaKey) &&
          (shiftKey ? event.shiftKey : !event.shiftKey) &&
          (altKey ? event.altKey : !event.altKey);

        if (keyMatches && modifierMatches) {
          if (preventDefault) {
            event.preventDefault();
          }
          callback(event);
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts, enabled]);
}

/**
 * Utility function to get the modifier key label based on platform
 * @returns 'Cmd' for Mac, 'Ctrl' for Windows/Linux
 */
export function getModifierKey(): string {
  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  return isMac ? "⌘" : "Ctrl";
}

/**
 * Utility function to format keyboard shortcut for display
 * @param key - The key to display
 * @param useModifier - Whether to include the modifier key
 * @returns Formatted shortcut string (e.g., "⌘ K" or "Ctrl + K")
 */
export function formatShortcut(
  key: string,
  useModifier: boolean = true
): string {
  if (!useModifier) return key.toUpperCase();
  const modifier = getModifierKey();
  const separator = modifier === "⌘" ? " " : " + ";
  return `${modifier}${separator}${key.toUpperCase()}`;
}
