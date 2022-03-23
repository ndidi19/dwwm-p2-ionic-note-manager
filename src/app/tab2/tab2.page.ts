import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../model/note.model';
import { NoteService } from '../services/note.service';
import { take } from 'rxjs/operators';
import { ModalController, AlertController } from '@ionic/angular';
import { EditModal } from './edit-modal/edit-modal';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {

  allNotes = [];
  sub: Subscription;
  isLoading = false;

  constructor(private noteService: NoteService,
    private modalController: ModalController,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    // this.allNotes = this.noteService.allNote;
    // console.log('ngOnInit', this.noteService.allNote);
    this.sub = this.noteService.allNote().subscribe(data => {
      this.allNotes = data.map(e => {
        console.log('item', e);
        const noteItem = {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Note
        } as Note;
        return noteItem;
      })
    }, error => {
      console.error(error);
    })
  }

  async edit(id) {
    console.log('edit item', id);
    const modal = await this.modalController.create({
      component: EditModal,
      componentProps: { id }
    });
    return await modal.present();
  }

  async delete(id) {
    console.log('delete item', id);
    const alert = await this.alertController.create({
      header: 'Delete note ?',
      subHeader: 'Are you sure you want to delete this note ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.isLoading = true;
            this.noteService.deleteNote(id)
              .pipe(
                take(1)
              )
              .subscribe(() => {
                this.isLoading = false;
              }, error => {
                console.error(error);
                this.isLoading = false;
              })
          }
        }
      ]
    })
    await alert.present();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
