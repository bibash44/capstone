import { faEnvelope, faMobile, faMarker } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  faEnvelope = faEnvelope;
  faMobile = faMobile;
  faMarker = faMarker;
}
