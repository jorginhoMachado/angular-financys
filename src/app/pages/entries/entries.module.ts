import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import {EntryListComponent} from "./category-list/entry-list.component";
import {EntryFormComponent} from "./category-form/entry-form.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EntriesModule { }
