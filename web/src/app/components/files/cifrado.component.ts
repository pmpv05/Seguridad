import { Component, OnInit } from '@angular/core';
import { ReadVarExpr } from '@angular/compiler';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-cifrado',
  templateUrl: './cifrado.component.html'
})

export class CifradoComponent implements OnInit {

  clave: string;

  constructor() { }

  obtenerNombre(fullPath: string){
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


  save(filename, data, type, blob: Blob=undefined) {
    if (!blob){
      var blob = new Blob([data], {type: "text/plain"});
    }
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    
}

  ngOnInit() {
  }

  arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
  }

  base64ToArrayBuffer(base64) {
    var binary_string =  atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }

  b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
  }

  getTypeAndData(data: string){
    const splitted = data.split(";")
    const dataType = splitted[0].split("data:")[1];
    const base64Data = splitted[1].split("base64,")[1]
    return([dataType, base64Data]);
  }

  cifrar() {
    const file = (<HTMLInputElement>document.getElementById("file"));
    const filename = this.obtenerNombre(file.value);
    let key = (<HTMLInputElement>document.getElementById("key")).value;
    const utf8_to_b64 = this.utf8_to_b64;
    const save = this.save;
    if(file.files.length){
      const reader = new FileReader();
      reader.onload = function(event) {
        const res = reader.result.toString();
        const cryp = crypto.AES.encrypt(utf8_to_b64(res), key);
        save(filename, cryp.toString(), "text/plain");
      }
      reader.readAsDataURL(file.files[0]);

    }
  }

  estaCifrado() {
  }

  descifrar() {
    const file = (<HTMLInputElement>document.getElementById("file"));
    const filename = this.obtenerNombre(file.value);
    const key = (<HTMLInputElement>document.getElementById("key")).value;
    const getData = this.getTypeAndData;
    const b64_to_utf8 = this.b64_to_utf8;
    const save = this.save;
    if(file.files.length){
      const reader = new FileReader();
      reader.onload = function(event) {
        const cryp = getData(reader.result.toString())[1];
        const decryp = crypto.AES.decrypt(atob(cryp), key);
        const data = b64_to_utf8(b64_to_utf8(decryp.toString(crypto.enc.Base64)));
        
        var mimetype = getData(data)[0];
        var byteString = atob(getData(data)[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var bb = new Blob([ab], {type: mimetype});
        save(filename, getData(data)[1], getData(data)[0], bb);
      }
      reader.readAsDataURL(file.files[0]);
    }
  }

  firmar() {
  }
}
