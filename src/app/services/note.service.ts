import { Injectable } from '@angular/core';
import { Note } from '../model/note.model';
import { AngularFirestore, DocumentReference, DocumentSnapshot, Action } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private firestore: AngularFirestore) { }

  addNote(noteItem: Note): Promise<DocumentReference> {
    // this._allNote = [...this._allNote, noteItem];
    // console.log('NoteService', this._allNote);
    return this.firestore.collection('notes').add(noteItem);
  }

  allNote() {
    return this.firestore.collection('notes').snapshotChanges();
  }

  deleteNote(id: string): Observable<any> {
    return from(this.firestore.doc(`notes/${id}`).delete());
  }

  getNote(id: string): Observable<Action<DocumentSnapshot<unknown>>> {
    return this.firestore.collection('notes').doc(id).snapshotChanges()
  }

  updateNote(id: string, note: Note): Observable<unknown> {
    return from(this.firestore.doc(`notes/${id}`).update(note));
  }
}
