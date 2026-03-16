import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface EasterEggContextType {
  found: Set<string>;
  totalEggs: number;
  findEgg: (id: string) => void;
  allFound: boolean;
}

const EasterEggContext = createContext<EasterEggContextType | null>(null);

export const TOTAL_EGGS = 7;

export const useEasterEggs = () => {
  const ctx = useContext(EasterEggContext);
  if (!ctx) throw new Error("useEasterEggs must be used within EasterEggProvider");
  return ctx;
};

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [found, setFound] = useState<Set<string>>(new Set());

  const findEgg = useCallback((id: string) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return (
    <EasterEggContext.Provider value={{ found, totalEggs: TOTAL_EGGS, findEgg, allFound: found.size >= TOTAL_EGGS }}>
      {children}
    </EasterEggContext.Provider>
  );
};
