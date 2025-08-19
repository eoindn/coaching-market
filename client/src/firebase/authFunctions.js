import { auth } from '../../src/firebase/firebase.js';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth'

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password); // Fixed this line
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Removed 'firebase.auth.'
    return signInWithPopup(auth, provider); // Fixed this line
}

export const doSignOut = async () => {
    return signOut(auth); // Fixed this line
}

export const doPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email); // Fixed this line
}

export const doPasswordUpdate = async (password) => {
    const user = auth.currentUser;
    return updatePassword(user, password); // Fixed this line
}