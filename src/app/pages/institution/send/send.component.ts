import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-send',
  styleUrls: ['./send.component.scss'],
  templateUrl: './send.component.html',
})

export class SendComponent implements OnInit {

  bigFontsChecked: Boolean = false;
  highContrastChecked: Boolean = false;
  textToSpeechChecked: Boolean = false;

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {

  }

  bigFontsToggle(checked: boolean) {
    this.bigFontsChecked = checked;
  }
  highContrastToggle(checked: boolean) {
    this.bigFontsChecked = checked;
  }
  textToSpeechToggle(checked: boolean) {
    this.bigFontsChecked = checked;
  }

  back() { this.location.back(); }
}


