import { he } from "date-fns/locale";
import heLocale from "@fullcalendar/core/locales/he";

/**
 * Global i18n Configuration for Hebrew/Israel
 * Single source of truth for all locale settings
 */

// ===== Locale Settings =====
export const DEFAULT_LOCALE = "he-IL";
export const DEFAULT_TIMEZONE = "Asia/Jerusalem";
export const DATE_FNS_LOCALE = he;
export const FIRST_DAY_OF_WEEK = 0; // Sunday
export const HOUR_CYCLE = 24; // 24-hour format
export const FULLCALENDAR_LOCALE = heLocale;

// ===== Helper Functions =====

/**
 * Format date in Hebrew locale
 * @param date - Date object to format
 * @returns Formatted date string (e.g., "22 בנובמבר 2025")
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(DEFAULT_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Format time in 24-hour Hebrew locale
 * @param date - Date object to format
 * @returns Formatted time string (e.g., "14:30")
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString(DEFAULT_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Format date and time in Hebrew locale
 * @param date - Date object to format
 * @returns Formatted datetime string (e.g., "22 בנובמבר 2025, 14:30")
 */
export const formatDateTime = (date: Date): string => {
  return date.toLocaleString(DEFAULT_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Format time slot for scheduling assistant
 * @param date - Date object to format
 * @returns Formatted time string (e.g., "09:00")
 */
export const formatTimeSlot = (date: Date): string => {
  return date.toLocaleString(DEFAULT_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Get full day name in Hebrew
 * @param date - Date object
 * @returns Day name (e.g., "ראשון", "שני")
 */
export const getHebrewDayName = (date: Date): string => {
  return date.toLocaleDateString(DEFAULT_LOCALE, { weekday: "long" });
};
