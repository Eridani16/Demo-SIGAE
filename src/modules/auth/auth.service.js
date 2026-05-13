// src/modules/auth/auth.service.js
import { auth, db } from '../core/firebase.js';
import { signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class AuthService {
  static async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Obtener rol desde Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) throw new Error('Usuario sin rol asignado');
      const data = userDoc.data();
      return { uid: user.uid, email: user.email, role: data.role };
    } catch (error) {
      ErrorHandler.handle(error, 'AuthService.login');
      throw error;
    }
  }

  static async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      ErrorHandler.handle(error, 'AuthService.logout');
      throw error;
    }
  }
}