import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
const routes: Routes = [
{path:'plannedday',component:MainPageComponent},
{path:'**',component:InputBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
