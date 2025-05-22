// localStorage에 접근하는 hook
export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            //localStorage에 값을 저장할때는 JSON.stringify로 변환해서 저장해야함
        } catch (error) {
            console.error(error);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error(e);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            console.error(e);
        }
    };

    return { setItem, getItem, removeItem };
};
