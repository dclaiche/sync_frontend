import * as SecureStore from 'expo-secure-store';

class Store {

    static async save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    static async get(key) {
        return await SecureStore.getItemAsync(key);
    }

    static async delete(key) {
        await SecureStore.deleteItemAsync(key);
    }

    static async deleteAll() {
        await SecureStore.deleteAllItemsAsync();
    }
}

export default Store;