import { Component, EventEmitter,  OnInit, Output, ViewChild } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})

export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  @ViewChild('filePicker', {static: false}) filePicker;
  showPreview = false;
  selectedImage: string;
  useFilePicker = false;

  constructor(private platform: Platform) { }
  
  ngOnInit() {
    this.showPreview = false;
    //checking if the app is running of a destop, and using filepicker
    if(this.platform.is('mobile') && !this.platform.is('hybrid') || this.platform.is('desktop')) {
      this.useFilePicker = true;
    }
  }

  onPickImage() {
    if(!Capacitor.isPluginAvailable('Camera') || this.useFilePicker)  {
      this.filePicker.nativeElement.click(); //click on the hidden input in case no camera is available
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt, //prompt is giving the choice whether to use camera or gallery
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.DataUrl 
    }).then(image => {
      this.selectedImage = image.base64String;
      this.showPreview = true;
      this.imagePick.emit(image.base64String);
    }).catch(error => {
      console.log(error);
      return false;
    });
  }

  onFileChosen(event) {
    const pickedFile = event.target.files[0]; //as HTMLInputElement
    if(!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(this.selectedImage);
      this.showPreview = true;
    };
    fr.readAsDataURL(pickedFile);
  }
}
