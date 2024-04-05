import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    { shortLabel: 'Inventário' ,label: 'Inventário', icon: 'po-icon-archive', link: '/inventario' }
  ];

  readonly logo: string = "https://static.wixstatic.com/media/0f37d7_7b6a2fc48f0542669e1e1cb9280b089e~mv2.png/v1/fill/w_171,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0f37d7_7b6a2fc48f0542669e1e1cb9280b089e~mv2.png"
  readonly shortLogo: string = "https://megtv.terraviva.agr.br/_next/static/media/logo.aca46fbe.png"
  readonly logoAlt: string = "Terra Viva"

  constructor() {}
}
