import { openDB } from "idb";

const jateDB = 'jate';

const initdb = async () =>
  // creating new DB called 'jate', using version 1
  openDB(jateDB, 1, {
    // adding database schema if it doesn't already exist
    upgrade(db) {
      if (db.objectStoreNames.contains(jateDB)) {
        console.log("jate database already exists");
        return;
      }
      // create new object store for the data with a key name of 'id'
      db.createObjectStore(jateDB, { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// ADD content to the database
export const putDb = async (content) => {
  console.log("PUT request to database");
  const jateDb = await openDB(jateDB, 1);
  const tx = jateDb.transaction(jateDB, "readwrite");
  const store = tx.objectStore(jateDB);
  const request = store.put({ id: 1, content: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// GET all content from the database
export const getDb = async () => {
  console.log("GET request to database");
  // create connection to the database and version we want to use
  const jateDb = await openDB(jateDB, 1);
  // new transaction with specified database and data privileges
  const tx = jateDb.transaction(jateDB, "readonly");
  // open desiered object store
  const store = tx.objectStore(jateDB);
  // use getAll method to get all data in the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result.content;
};

initdb();
