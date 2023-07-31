import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "gb-torakis";

  constructor(private renderer: Renderer2) {
    if (screen.height <= 768) {
      this.renderer.addClass(document.body, "zoom60");
    }
    else if (screen.height <= 900) {
      this.renderer.addClass(document.body, "zoom80"); 
    }
    else {
      this.renderer.addClass(document.body, "zoom100"); 
    }
  }
}
