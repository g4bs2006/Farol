import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type SOSFase = 'idle' | 'countdown' | 'ativo';

interface SOSContextType {
  fase: SOSFase;
  countdown: number;
  iniciarSOS: () => void;
  cancelarSOS: () => void;
  confirmarSOS: () => void;
  encerrarSOS: () => void;
}

const SOSContext = createContext<SOSContextType>({} as SOSContextType);

export function SOSProvider({ children }: { children: React.ReactNode }) {
  const [fase, setFase]           = useState<SOSFase>('idle');
  const [countdown, setCountdown] = useState(3);
  const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null);

  const limparInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const iniciarSOS = () => {
    setCountdown(3);
    setFase('countdown');
  };

  const cancelarSOS = () => {
    limparInterval();
    setCountdown(3);
    setFase('idle');
  };

  const confirmarSOS = () => {
    limparInterval();
    setFase('ativo');
  };

  const encerrarSOS = () => {
    setCountdown(3);
    setFase('idle');
  };

  useEffect(() => {
    if (fase === 'countdown') {
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            limparInterval();
            setFase('ativo');
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return limparInterval;
  }, [fase]);

  return (
    <SOSContext.Provider value={{ fase, countdown, iniciarSOS, cancelarSOS, confirmarSOS, encerrarSOS }}>
      {children}
    </SOSContext.Provider>
  );
}

export function useSOS() {
  return useContext(SOSContext);
}
