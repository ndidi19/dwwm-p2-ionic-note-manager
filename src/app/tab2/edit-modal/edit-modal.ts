import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/model/note.model';
import { NoteService } from 'src/app/services/note.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Category } from 'src/app/model/category.model';
import { noteCategories } from 'src/app/model/data/note-categories';

@Component({
    selector: 'edit-modal',
    templateUrl: './edit-modal.html'
})
export class EditModal implements OnInit, OnDestroy {
    @Input() id: string;
    noteItem: Note;
    sub: Subscription;
    form: FormGroup;
    categories: Category[];

    constructor(private noteService: NoteService,
        private formBuilder: FormBuilder,
        private modalController: ModalController,
        private toastController: ToastController) {}

    ngOnInit(): void {
        this.categories = noteCategories;
        this.sub = this.noteService.getNote(this.id).subscribe(data => {
            this.noteItem = {
                id: data.payload.id,
                ...data.payload.data() as Note
            } as Note;
            console.log(this.noteItem);
            this.createForm();
        }, error => {
            console.error(error);
        })
    }

    createForm() {
        this.form = this.formBuilder.group({
            category: new FormControl(this.noteItem.category, {
                validators: Validators.required
            }),
            noteContent: new FormControl(this.noteItem.noteContent, {
                validators: [Validators.required]
            }),
            date: new FormControl(this.noteItem.date, {
                validators: [Validators.required]
            })
        });
    }

    update() {
        console.log(this.form.value);
        const updatedNote = this.form.value;
        this.noteService.updateNote(this.id, updatedNote).subscribe(async () => {
            console.log(`Note ${this.id} updated`);
            const toast = await this.toastController.create({
                message: 'Note has been successfully updated !',
                duration: 3000,
                color: 'primary',
                position: 'middle',
                icon: 'alert-circle-outline',
                // translucent: true
            });
            toast.present();
            this.modalController.dismiss();
        })
    }

    closeModal() {
        this.modalController.dismiss();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}