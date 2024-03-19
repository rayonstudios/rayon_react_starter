import { useLocalStorageState, useUpdateEffect } from "ahooks";
import { ConfigProvider, Modal, theme } from "antd";
import { HookAPI } from "antd/es/modal/useModal";
import antdEnUS from "antd/locale/en_US";
import antdUrPK from "antd/locale/ur_PK";
import i18n from "i18next";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { initReactI18next } from "react-i18next";
import { ThemeProvider } from "react-jss";
import enUS from "../../translations/en-US.json";
import urPK from "../../translations/ur-PK.json";
import { GenericObject } from "../types/common";

const primaryColor = "#4AA081";
const langKey = "lang";

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
  System = "system",
}
type ThemeType = ThemeMode.Light | ThemeMode.Dark;
type ThemeModeType = `${ThemeMode}`;

const getDeviceTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeMode.Dark
    : ThemeMode.Light;
};
const getAppTheme = (_themeMode: ThemeMode) =>
  _themeMode === ThemeMode.System ? getDeviceTheme() : _themeMode;

export enum Lang {
  EN_US = "en-US",
  UR_PK = "ur-PK",
}

const translations = {
  [Lang.EN_US]: {
    translation: enUS,
    title: enUS.lang.name,
    antdLocale: antdEnUS,
    direction: "ltr",
  },
  [Lang.UR_PK]: {
    translation: urPK,
    title: urPK.lang.name,
    antdLocale: antdUrPK,
    direction: "rtl",
  },
};

const fallbackLng = Object.values(Lang)[0];

i18n.use(initReactI18next).init({
  resources: Object.keys(translations).reduce((acc, langId) => {
    acc[langId] = translations[langId as keyof typeof translations].translation;
    return acc;
  }, {} as GenericObject),
  lng: localStorage.getItem(langKey) || fallbackLng,
  fallbackLng,
  interpolation: {
    escapeValue: false,
  },
});

type RootContextType = {
  setCssFromOutside: (css: string) => void;
  openFile: (props: {
    accept?: string;
    multiple?: boolean;
    onChange?: (files: File[]) => void;
  }) => void;
  setPopoverWidth: (width: string) => void;
  themeMode: ThemeType;
  _themeMode: ThemeMode;
  toggleThemeMode: (themeMode: ThemeModeType) => void;
  primaryColor: string;
  lang: Lang;
  setLang: (lang: Lang) => void;
  translations: typeof translations;
  t: typeof i18n.t;
  modalInstance?: HookAPI;
};
const initialValues: RootContextType = {
  setCssFromOutside: () => {},
  openFile: () => {},
  setPopoverWidth: () => {},
  themeMode: ThemeMode.Light,
  _themeMode: ThemeMode.Light,
  toggleThemeMode: () => {},
  primaryColor,
  lang: fallbackLng,
  setLang: () => {},
  translations,
  t: i18n.t.bind(i18n),
  modalInstance: undefined,
};
const RootContext = createContext<RootContextType>(initialValues);
const rootContextValues = { ...initialValues };
export const getRootContextValues = () => rootContextValues;

//hooks
export const useRootContextValues = () => useContext(RootContext);
export const useThemeMode = () => {
  const values = useRootContextValues();
  return {
    themeMode: values.themeMode,
    toggleThemeMode: values.toggleThemeMode,
    _themeMode: values._themeMode,
  };
};
export const useLang = () => {
  const values = useRootContextValues();
  return {
    lang: values.lang,
    setLang: values.setLang,
    translations: values.translations,
    t: values.t,
  };
};

const JSSThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = theme.useToken();
  const { themeMode } = useThemeMode();
  return (
    <ThemeProvider theme={{ ...token, isDark: themeMode === "dark" }}>
      {children}
    </ThemeProvider>
  );
};

const RootContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [css, setCss] = useState<string>();
  const ipRef = useRef<HTMLInputElement>(null);
  const [_themeMode = ThemeMode.Light, _setThemeMode] =
    useLocalStorageState<ThemeMode>("theme", {
      defaultValue: ThemeMode.Light,
    });
  const [themeMode, setThemeMode] = useState<ThemeType>(
    getAppTheme(_themeMode)
  );
  const [lang = fallbackLng, setLang] = useLocalStorageState<Lang>(langKey, {
    defaultValue: fallbackLng,
  });
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    const handleSystemThemeChange = ({ matches }: MediaQueryListEvent) => {
      if (_themeMode === ThemeMode.System) {
        setThemeMode(matches ? ThemeMode.Dark : ThemeMode.Light);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [_themeMode]);

  useUpdateEffect(() => {
    const mode = getAppTheme(_themeMode);
    setThemeMode(mode);

    //tailwind dark mode
    if (mode === ThemeMode.Dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [_themeMode]);

  const setCssFromOutside: RootContextType["setCssFromOutside"] = (css) => {
    setCss(css);
  };

  const openFile: RootContextType["openFile"] = ({
    accept,
    multiple = true,
    onChange,
  }) => {
    const ip = ipRef.current;
    if (!ip) return;

    if (accept) ip.setAttribute("accept", accept);
    if (multiple) ip.setAttribute("multiple", multiple.toString());
    if (onChange) {
      //@ts-ignore
      ip.onchange = (e: { target: { files: File[] } }) => {
        const files = [];
        for (const file of e.target.files) files.push(file);
        typeof onChange === "function" && files.length && onChange(files);
      };
    }
    ip.click();
  };

  const setPopoverWidth: RootContextType["setPopoverWidth"] = (width) => {
    setCssFromOutside(`
          .ant-popover {
              width: ${width};
            }      
          `);
  };

  rootContextValues.setCssFromOutside = setCssFromOutside;
  rootContextValues.openFile = openFile;
  rootContextValues.setPopoverWidth = setPopoverWidth;
  rootContextValues.modalInstance = modal;

  return (
    <RootContext.Provider
      value={{
        setCssFromOutside,
        setPopoverWidth,
        openFile,
        themeMode,
        toggleThemeMode: (themeType) => {
          console.log({ themeType });
          _setThemeMode(themeType as ThemeMode);
        },
        _themeMode,
        primaryColor,
        lang,
        setLang: (lang) => {
          i18n.changeLanguage(lang);
          setLang(lang);
        },
        translations: initialValues.translations,
        t: initialValues.t,
        modalInstance: modal,
      }}
    >
      <ConfigProvider
        locale={translations[lang].antdLocale}
        direction={translations[lang].direction as any}
        theme={{
          algorithm:
            themeMode === ThemeMode.Dark
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
            borderRadius: 8,
          },
        }}
      >
        <JSSThemeProvider>
          {children}
          {contextHolder}
          {css ? <style>{css}</style> : null}
          <input
            ref={ipRef}
            id="global_file_input"
            type="file"
            className="hidden"
          />
        </JSSThemeProvider>
      </ConfigProvider>
    </RootContext.Provider>
  );
};

export default RootContextProvider;
