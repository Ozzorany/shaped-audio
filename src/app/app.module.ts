import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonsModule, IconsModule, MDBBootstrapModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import { ProgressComponent } from './components/progress/progress.component';
import { UploadFileDirective } from './directives/upload-file.directive';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    UploadFileDirective,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    IconsModule,
    NgxMaterialTimepickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
