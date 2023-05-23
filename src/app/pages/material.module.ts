import { NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './home/home.component'

@NgModule({
  imports: [MatDialogModule, MatTabsModule, MatSnackBarModule],
  exports: [MatDialogModule, MatTabsModule, MatSnackBarModule],
  declarations: [
    HomeComponent
  ],
})
export class MaterialModule {}
