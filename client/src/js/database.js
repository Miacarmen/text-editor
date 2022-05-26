import { openDB } from "idb";

const initdb = async () =>
  // creating new DB called 'jate', using version 1
  openDB("jate", 1, {
    // adding database schema if it doesn't already exist
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // create new object store for the data with a key name of 'id'
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// ADD content to the database
export const putDb = async (id, content) => {
  console.log("PUT request to database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: id, content: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// GET all content from the database
export const getDb = async (content) => {
  console.log("GET request to database");
  // create connection to the database and version we want to use
  const jateDb = await openDB("jate", 1);
  // new transaction with specified database and data privileges
  const tx = jateDb.transaction("jate", "readwrite");
  // open desiered object store
  const store = tx.objectStore("jate");
  // use getAll method to get all data in the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log("🚀 - data saved to the database", result);
  return result;
};

initdb();
