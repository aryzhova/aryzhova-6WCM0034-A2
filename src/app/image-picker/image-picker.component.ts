import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})

export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  selectedImage: string;

  constructor() { }

  ngOnInit() {}

  onPickImage() {
    if(!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt, //prompt is giving the choice whether to use camera or gallery
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.DataUrl //may use DataUrl instead
    }).then(image => {
      this.selectedImage = image.dataUrl;
      this.imagePick.emit(image.dataUrl);
    }).catch(error => {
      console.log(error);
      return false;
    });
  }
}
