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

async function writeImageData(data) {
  const db = getDatabase(app);
  let ts = new Date().getTime();
  set(ref(db, "data/"+ts), data);
}

// Get a list of cities from your database
const getDrawings = async function () {
  const db = getDatabase(app);
  const dbRef = ref(getDatabase(app));
  let data = null;

  let snapshot = await get(child(dbRef, `data`));
  if(snapshot.exists()){
    data = snapshot.val()
  }
  return data

    // .then((snapshot) => {
    //   if (snapshot.exists()) {
    //     // console.log(snapshot.val());
    //     data = snapshot.val()
    //     return data;
    //   } else {
    //     console.log("No data available");
    //   }
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

  
}

export { writeImageData, getDrawings };
