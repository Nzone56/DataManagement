const DB_NAME = "MyDatabase";
const DB_VERSION = 1;

const COLLECTIONS = [
  "settings",
  "clients",
  "expensesConcepts",
  "expenses",
  "fees",
  "lawyers",
  "worklogs",
  "bills",
  "receipts",
];

export const openDatabase = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      event.stopPropagation();
      const db = request.result;
      const existingStores = new Set(db.objectStoreNames);

      COLLECTIONS.forEach((storeName) => {
        if (!existingStores.has(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
          console.log(`✅ Tabla creada en IndexedDB: ${storeName}`);
        }
      });

      console.log("📌 IndexedDB actualizado. Tablas existentes:", Array.from(db.objectStoreNames));
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveToIndexedDB = async <T>(storeName: string, data: T[]): Promise<void> => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  await Promise.all(data.map((item) => store.put(item)));

  await tx.oncomplete;
};

export const getFromIndexedDB = async <T>(storeName: string): Promise<T[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        console.log(`📤 Datos obtenidos de ${storeName} en INDEXED:`, request.result.length);
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        console.error(`❌ Error al obtener datos de ${storeName} en INDEXED:`, request.error);
        reject(request.error);
      };
    } catch (error) {
      console.error(`⚠️ Error general en getFromIndexedDB(${storeName}):`, error);
      reject(error);
    }
  });
};
