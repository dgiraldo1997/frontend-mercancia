import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormComponent as CargoFormComponent}  from './cargos/components/form/form.component';
import { FormComponent as MercanciaFormComponent}  from './mercancia/components/form/form.component';
import { FormsModule } from '@angular/forms';
import { MercanciaComponent } from './mercancia/components/container/mercancia.component';
import { UsuariosComponent } from './usuarios/components/container/usuarios.component';
import { FormComponent } from './usuarios/components/form/form.component';
import { CargosComponent } from './cargos/components/container/cargos.component';
import { CargoService } from './cargos/components/container/cargo.service';


const router: Routes = [
  {path: '',redirectTo:'/mercancias',pathMatch: 'full'},
  {path: 'cargos',component: CargosComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'mercancias', component: MercanciaComponent},
  {path: 'usuarios/form', component: FormComponent},
  {path: 'usuarios/form/:id', component: FormComponent},
  {path: 'cargos/form', component: CargoFormComponent},
  {path: 'cargos/form/:id', component: CargoFormComponent},
  {path: 'mercancias/form', component: MercanciaFormComponent},
  {path: 'mercancias/form/:id', component: MercanciaFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CargosComponent,
    UsuariosComponent,
    MercanciaComponent,
    FormComponent,
    CargoFormComponent,
    MercanciaFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [CargoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
