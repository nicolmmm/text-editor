import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// put data in DB
export const putDb = async (content) => {
  try {
    console.log("update the database");

    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB("jate", 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = jateDb.transaction("jate", "readwrite");

    // Open up the desired object store.
    const store = tx.objectStore("jate");

    // Use the .add() method on the store and pass in the content.
    const request = store.add({ content });

    // Get confirmation of the request.
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch {
    console.error("putDb not implemented");
  }
};

//Get data from DB
export const getDb = async () => {
  try {
    console.log("Getting everything from the database");

    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readonly");

    const store = tx.objectStore("jate");
    const request = store.get(1);
    const result = await request;

    console.log("result is:", result);
  } catch {
    console.error("getDb not implemented");
  }
};

initdb();
