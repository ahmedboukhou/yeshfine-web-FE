import { type FC, type ReactNode } from 'react';

export const AuthCard: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="p-8 rounded-xl container mx-auto max-w-md card-box-shadow card-gradient">
    {children}
  </section>
);
