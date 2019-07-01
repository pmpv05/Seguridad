import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { JSEncrypt } from 'jsencrypt';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html'
})
export class FirmaComponent implements OnInit {

  file: any;
  clave: string;

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
  }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  uploadDocument() {
    if (this.file != null) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(fileReader.result);
      }
      fileReader.readAsText(this.file);
    }
  }

  obtenerNombre(fullPath: string) {
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
      filename = filename.substring(1);
    }
    return filename;
  }

  download(filename: string, text: string) {
    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  save(filename, data, type, blob: Blob = undefined) {
    if (!blob) {
      var blob = new Blob([data], { type: "text/plain" });
    }
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  base64ToArrayBuffer(base64) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  getTypeAndData(data: string) {
    const splitted = data.split(";")
    const dataType = splitted[0].split("data:")[1];
    const base64Data = splitted[1].split("base64,")[1]
    return ([dataType, base64Data]);
  }

  firmar() {
    const file = (<HTMLInputElement>document.getElementById("file"));
    const filename = this.obtenerNombre(file.value);
    let key = (<HTMLInputElement>document.getElementById("key")).value;
    const utf8_to_b64 = this.utf8_to_b64;
    const save = this.save;
    const criptoAccion = crypto.SHA256;
    if (file.files.length) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const res = reader.result.toString();
        var sign = new JSEncrypt();
        sign.setPrivateKey(key);
        var signature = sign.sign(utf8_to_b64(res), criptoAccion, "sha256");
        console.log(signature);
        save(filename, signature, "text/plain");
      }
      reader.readAsDataURL(file.files[0]);
    }
  }

}
