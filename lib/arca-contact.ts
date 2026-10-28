// Condiviso fra il form di /arca e /api/arca-contact, così le regole del
// browser e quelle del server non divergono.

export const contactRoles = [
  "Gestisco un rifugio o un canile",
  "Faccio volontariato in un rifugio",
  "Altro",
] as const;

export const contactLimits = {
  name: 100,
  email: 200,
  phone: 30,
  shelter: 150,
  city: 100,
  message: 3000,
} as const;
