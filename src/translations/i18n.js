import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from './en/translations';
import { TRANSLATIONS_GUJ } from './guj/translations';
import { TRANSLATIONS_HIN } from './hindi/translations';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: TRANSLATIONS_EN
            },
            guj: {
                translation: TRANSLATIONS_GUJ
            },
            hin: {
                translation: TRANSLATIONS_HIN
            }
        }
    });

i18n.changeLanguage("en");