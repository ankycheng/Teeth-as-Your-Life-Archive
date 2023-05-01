import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, ref, set, get, child } from "firebase/database";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
  databaseURL: "https://share-your-archive-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function writeImageData(id, img) {
  const db = getDatabase(app);
  set(ref(db, "data/" + id), {
    id: id,
    img: "base64",
    ts: new Date().getTime(),
  });
}

// Get a list of cities from your database
async function getDrawings() {
  const db = getDatabase(app);
  //   const drawingCol = collection(db, "data");
  //   const drawingSnapshot = await getDocs(drawingCol);
  //   const drawingList = drawingSnapshot.docs.map((img) => img.data());
  //   console.log(drawingList);
  //   return drawingList;
  const dbRef = ref(getDatabase());
  get(child(dbRef, `data`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export { writeImageData, getDrawings };
