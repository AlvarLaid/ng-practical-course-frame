import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule  } from '@angular/material';
import { HeaderComponent } from './components/header/header.component'
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
