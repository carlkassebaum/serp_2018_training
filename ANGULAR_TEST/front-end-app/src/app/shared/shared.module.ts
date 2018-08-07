import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    // SharedModule importers won't have to import FormsModule too
    FormsModule
  ]
})
export class SharedModule { }
