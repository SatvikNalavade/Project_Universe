///// User Authentication /////
import { getFirestore, collection, addDoc, serverTimestamp, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// import faker from 'faker';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";




const firebaseConfig = {
        apiKey: "AIzaSyD0P6ejeCDPqeRsFaHNoQNyOBNXqDbyNFw",
        authDomain: "project-universe-fdbcd.firebaseapp.com",
        databaseURL: "https://project-universe-fdbcd-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "project-universe-fdbcd",
        storageBucket: "project-universe-fdbcd.appspot.com",
        messagingSenderId: "649654916941",
        appId: "1:649654916941:web:08fddde4d2eca1036cc904",
        measurementId: "G-12K3N21MPY"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    

    // const app = firebase.app();
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');
const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');



/// Sign in event handlers

signInBtn.onclick = () => signInWithPopup(auth, provider);
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
        const db = getFirestore(app);
        const thingsRef = collection(db, 'things');
    
        createThing.onclick = () => {
          addDoc(thingsRef, {
            uid: user.uid,
            name: faker.commerce.productName(),
            createdAt: serverTimestamp()
          });
    } 
    const query = where('uid', '==', user.uid);
    const orderedQuery = orderBy('createdAt', 'asc');
    const unsubscribe = onSnapshot(query(thingsRef), orderedQuery, querySnapshot => {
      const items = querySnapshot.docs.map(doc => {
        return `<li>${doc.data().name}</li>`
      });
      thingsList.innerHTML = items.join('');
    });
}else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});




  
