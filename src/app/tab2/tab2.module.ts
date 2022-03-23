import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { Tab2Page } from './tab2.page';
import { EditModal } from './edit-modal/edit-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page, EditModal],
  entryComponents: [EditModal]
})
export class Tab2PageModule {}
