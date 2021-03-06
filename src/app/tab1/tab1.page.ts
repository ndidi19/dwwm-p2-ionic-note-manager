import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../model/category.model';
import { NoteService } from '../services/note.service';
import { noteCategories } from '../model/data/note-categories';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  form: FormGroup;
  isLoading = false;
  categories: Category[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.categories = noteCategories;
    this.form = new FormGroup({
      noteTitle: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        validators: Validators.required
      }),
      noteContent: new FormControl(null),
      date: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  add() {
    console.log(this.form);
    this.isLoading = true;
    this.noteService.addNote(this.form.value)
      .then(data => {
        console.log('add Data', data);
        this.form.reset();
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
      })
  }

}
