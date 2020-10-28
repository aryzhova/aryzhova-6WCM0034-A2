import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseAllPageRoutingModule } from './browse-all-routing.module';

import { BrowseAllPage } from './browse-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseAllPageRoutingModule
  ],
  declarations: [BrowseAllPage]
})
export class BrowseAllPageModule {}
