import { Component } from '@angular/core';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent {
  currentYear = new Date().getFullYear();
  version: string = packageJson.version;
}
