import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

const routes: Routes = [
  // { path: 'detail/:id', component: HeaderComponent },
  { path: '', redirectTo: '/contact', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: "**", redirectTo: '/contact' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
