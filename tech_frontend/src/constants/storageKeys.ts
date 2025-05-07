const STORAGE_KEYS = {
  theme: "tech_notes_web_app.theme",
};

export default STORAGE_KEYS;
export type StorageKeysType = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];