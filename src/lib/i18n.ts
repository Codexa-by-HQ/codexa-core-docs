import type { I18nConfig } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const i18n: I18nConfig = {
    parser: 'dir',
    defaultLanguage: "en",
    languages: ["en", "ar", "ur", "fr", "nl"],
    hideLocale: "always"
};

export const rtlLanguages = ["ar", "ur"];

// Only `displayName` is filled in per locale for now (drives the nav
// language switcher). Add real UI-string overrides here once each
// locale actually has translated content.
export const i18nUI = defineI18nUI(i18n, {
    en: { displayName: 'English' },
    ar: { displayName: 'العربية' },
    ur: { displayName: 'اردو' },
    fr: { displayName: 'Français' },
    nl: { displayName: 'Nederlands' },
});