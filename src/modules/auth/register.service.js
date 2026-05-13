// src/modules/auth/register.service.js
import { auth, db } from '../core/firebase.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class RegisterService {
  static async registerUser({ email, password, role }) {
    try {
      // Crear usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Crear documento en Firestore con rol
      await setDoc(doc(db, 'users', user.uid), {
        email,
        role
      });
      return user.uid;
    } catch (error) {
      ErrorHandler.handle(error, 'RegisterService.registerUser');
      throw error;
    }
  }
}
