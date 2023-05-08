import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { FormGroup, FormControl,Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Correo Electronico';
  private FileTyp:any;
  datos: FormGroup;
  constructor(private httpclien:HttpClient){
    this.datos=new FormGroup({
      para: new FormControl('',[Validators.required,Validators.email]),
      asunto: new FormControl('',Validators.required),
      mensaje: new FormControl('',Validators.required),
      archivo: new FormControl('')
    })
  }
  enviocorreo(){
    Notiflix.Loading.standard('Cargando...');
    let params={
      asunto:this.datos.value.asunto,
      email:this.datos.value.para,
      mensaje:this.datos.value.mensaje,
      archivo:this.datos.value.archivo
    }

    console.log(params)

   this.httpclien.post('http://localhost:3000/envio',params ).subscribe(resp=>{
    console.log(resp)
    Notiflix.Loading.remove();
    Notiflix.Notify.success('Enviado Correctamente')
   })
  }
  getfile($event :any):void{
    const [file] = $event.target.files;
   this.FileTyp={
    fileRaw:file,
   filName:file.name
   }
  }
}
