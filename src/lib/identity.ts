export const USER = "joao";

export const HOST = "portfolio";

export type Profile = {
  name: string;
  roles: string[];
  manifesto: string[];
};

export const parseProfile = (whoami: string[], manifesto: string[]): Profile => {
  const [name, ...roles] = whoami.filter(Boolean);
  return { name, roles, manifesto };
};

export const githubUrl = (user: string) => `https://github.com/${user}`;

export const linkedinUrl = (user: string) => `https://linkedin.com/in/${user}`;

export const mailtoUrl = (email: string) => `mailto:${email}`;
