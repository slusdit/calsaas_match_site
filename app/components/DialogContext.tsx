import React, { createContext, useContext, useState } from 'react';

const DialogContext = createContext({
  isOpen: false,
  closeDialog: () => {},
});

export const DialogProvider = ({ children }: {children:React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);