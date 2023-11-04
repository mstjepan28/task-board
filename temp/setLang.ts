import { Lang } from "./types/enums";
import hr from "../translation-json/hr.json";
import rs from "../translation-json/rs.json";
import eng from "../translation-json/en.json";
import { language } from "./cache/languageCache";

// FIXME: refactor to be used as a hook

const DEFAULT_LANG = Lang.HR;

const translations: { [key: string]: { [key: string]: string } } = {
  [Lang.HR]: hr,
  [Lang.ENG]: eng,
  [Lang.RS]: rs,
};

const setLang = (lang: Lang) => {
  const isValidLang = Object.values(Lang).includes(lang as Lang);
  const validatedLang = isValidLang ? (lang as Lang) : DEFAULT_LANG;

  language.set(validatedLang);
  triggerLangChange();
};

const changeLang = (lang: Lang) => {
  setLang(lang);
  window.location.reload();
};

const getLang = (): Lang => {
  const selectedLang = language.get() || DEFAULT_LANG;
  const isValidLang = Object.values(Lang).includes(selectedLang as Lang);

  return isValidLang ? (selectedLang as Lang) : DEFAULT_LANG;
};

let __ = (key: string) => key;

const triggerLangChange = () => {
  const selectedLang = getLang();
  __ = (key: string) => translations[selectedLang][key] || key;
};
triggerLangChange();

export { __, getLang, setLang, changeLang };
