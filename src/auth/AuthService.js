import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getApp } from 'firebase/app';
import { auth } from '../config/firebase.config';

class AuthService {
  // constructor(firebaseApp) {
  //   this.auth = getAuth(firebaseApp);
  //   connectAuthEmulator(this.auth, "http://localhost:9099")
  // }

  waitForUser(callable) {
    onAuthStateChanged(auth, (user => {
      callable(user);
    }))
  }

  login() {
    return signInWithPopup(auth, new GoogleAuthProvider)
        .then((result) => {
            return {
              user: result.user,
            }
        })
        .catch((error) => {
            return {
              error: error.message,
            }
        })
  }

  async logout() {
    await signOut(auth);
  }
}

export default new AuthService();