import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ContextInterface {
  language: 'English' | 'Español';
  setLanguage: Dispatch<SetStateAction<'English' | 'Español'>>;
}

const Context = createContext<ContextInterface>({
  language: 'English',
  setLanguage: () => {},
});

export const LangContext = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'English' | 'Español'>('English');

  return (
    <Context.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useLangContext = () => useContext(Context);
