import { NgModule } from '@angular/core';

import { MdButtonModule, MdSelectModule, MdMenuModule, MdProgressBarModule, MdSidenavModule,MdTooltipModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    MdButtonModule,
    MdSelectModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdDialogModule,
    MdTooltipModule,
    BrowserAnimationsModule
  ],
  exports: [
    MdButtonModule,
    MdSelectModule,
    MdMenuModule,
    MdDialogModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdTooltipModule,
    BrowserAnimationsModule
  ],
  declarations: []
})
export class MaterialModule { }
