import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from './en/translations';
import { TRANSLATIONS_GUJ } from './guj/translations';
import { TRANSLATIONS_HIN } from './hindi/translations';
import { TRANSLATIONS_SWEDISH } from './swedish/translations';
import { TRANSLATIONS_JAP } from './jap/translations';

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
            },
            swedish: {
                translation: TRANSLATIONS_SWEDISH
            },
            jap: {
                translation: TRANSLATIONS_JAP
            }
        }
    });

i18n.changeLanguage(localStorage.getItem("language") || 'en');