import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, QuerySnapshot, DocumentData} from '@angular/fire/firestore';

export interface User {
  email: string;
  name: string;
  surname: string;
  age: number;
  date: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {
    
  }

  async getUser(email: string, password: string): Promise<User | undefined> {
    const usersRef = collection(this.firestore, 'users');
    const userQuery = query(usersRef, where('mail', '==', email), where('password', '==', password));

    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as User;
    }
    return undefined; // Devuelve undefined si no se encuentra el usuario
  }
}
