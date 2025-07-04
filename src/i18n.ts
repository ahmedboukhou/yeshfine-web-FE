import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { supportedLanguages } from './constants/mappedData';

const languages = supportedLanguages.map(({ value }) => value);

i18n
	.use(
		resourcesToBackend((language, namespace, callback) => {
			import(`../src/assets/locales/${language}/${namespace}.json`)
				.then((resources) => {
					callback(null, resources);
				})
				.catch((error) => {
					callback(error, null);
				});
		})
	)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		supportedLngs: languages,
		debug: false,
		ns: ['common'],
		detection: {
			order: ['cookie', 'navigator', 'path', 'subdomain'],
			caches: ['cookie'],
			lookupCookie: 'siteLang',
			cookieMinutes: 60 * 24 * 100, // 100 days
		},
		react: {
			useSuspense: true,
		},
		nsSeparator: ':',
	});

export default i18n;
