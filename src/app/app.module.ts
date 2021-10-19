import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataSectionComponent } from './data-section/data-section.component';
import { FormatCasePipe } from './format-case.pipe';

@NgModule({
  declarations: [AppComponent, DataSectionComponent, FormatCasePipe],
  imports: [BrowserModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
