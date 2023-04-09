type PersistenceOptions<T, DefaultValue = T> = {
  key: string;
  defaultValue: () => DefaultValue;
  validate: (mixed: T) => boolean;
};

const storage = typeof window !== 'undefined' ? window.localStorage : null;

export const localStorageEffect =
  <T>(options: PersistenceOptions<T>) =>
  ({ setSelf, onSet }) => {
    const savedValue = storage?.getItem(options.key);
    if (savedValue != null) {
      try {
        const val = JSON.parse(savedValue);

        if (options.validate(val)) {
          setSelf(val);
        }
      } catch (e) {
        console.warn(e);
        console.warn(
          `[LocalStorage Error(${options.key})] init defaultValue of ${options?.key}`
        );
        setSelf(options.defaultValue());
      }
    }

    onSet((newValue) => {
      try {
        storage?.setItem(options.key, JSON.stringify(newValue));
      } catch (e) {
        console.warn(e);
        storage?.setItem(options.key, JSON.stringify(options.defaultValue()));
      }
    });
  };
