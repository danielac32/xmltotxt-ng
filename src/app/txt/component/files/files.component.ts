import { Component ,OnInit,inject} from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
 import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import {SeniatTxtService} from '../../services/seniat-txt.service'
import {File,ListResponse,ResponseData} from '../../interface/SeniatTxt-interface'
import { CommonModule } from '@angular/common';

import {LoadingComponent} from "../loading/loading.component"
import { saveAs } from 'file-saver'; // Necesitarás instalar file-saver: npm install file-saver
 

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    TabsModule,
    AlertModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoadingComponent
    ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})


export class FilesComponent implements OnInit {

public files: File[] = [];

public filesP: File[] = [];

public filesE: File[] = [];

private seniatTxtService=inject(SeniatTxtService);

ngOnInit(): void {
      this.closeAlert();
}

 showAlert: boolean = false; // Controla la visibilidad de la alerta
 err:string="";

 showInfo: boolean = false;
 showList: boolean = false;
 showListPE: boolean = false;
 fileSize:string="0";
 isLoading: boolean = false;
 showAlertErr: boolean = false; 


responseData!: ResponseData;


  triggerAlertERROR(err:string) {
    this.showAlertErr = true; // Muestra la alerta
    this.err=err;
  }

  closeAlertERROR() {
    this.showAlertErr = false; // Oculta la alerta
  }


  triggerAlert(err:string) {
    this.showAlert = true; // Muestra la alerta
    this.err=err;
  }

  closeAlert() {
    this.showAlert = false; // Oculta la alerta
    this.showInfo = false; // Oculta la alerta
  }

  closeAlertList() {
    this.showList = false; // Oculta la alerta
  }

  

  closeAlertListPE() {
    this.showListPE = false; // Oculta la alerta
 
  }
  triggerAlertPE() {
    this.showListPE = true; // Oculta la alerta
 
  }




isButtonDisabled: boolean = false;   

  // Método que activa el botón
  enableButton(): void {
    this.isButtonDisabled = false;  // Habilita el botón
  }

  // Método que deshabilita el botón
  disableButton(): void {
    this.isButtonDisabled = true;  // Deshabilita el botón
  }

list():void {
        this.closeAlert();
        this.closeAlertListPE();
        this.closeAlertERROR();
        this.showList=true;
        this.seniatTxtService.list().subscribe((response) => {
        //this.files=list
        ///this.files = response.list; // Asignar los archivos recibidos
            this.files=response.list;

            //console.log(this.files);
            if (Array.isArray(this.files)) {
                this.files.forEach((file) => {
                  const fileName = file.name ?? ""; // Asegurarse de que name no sea undefined o null

                  if (fileName.endsWith('.xml')) {
                    //console.log(`${fileName} es un archivo XML.`);
                  } else {
                    console.log(`${fileName} no es un archivo XML.`);
                    this.deletexml();
                    this.triggerAlert(fileName);
                  }
                });
            } else {
              console.error("this.files no es un array válido.");
            }

        },error => {
           console.error('Error en la solicitud :', error);
            this.triggerAlertERROR("Error en la solicitud");
        });
}
 

deletexml():void {
  this.closeAlert();
  this.closeAlertListPE();
  this.closeAlertERROR();
  this.showList=false;

      this.seniatTxtService.delete().subscribe((response) => {
         this.list();
        },error => {
           console.error('Error en la solicitud :', error);
            this.triggerAlertERROR("Error en la solicitud");
        });
}


 




formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes >= 1024 * 1024 * 1024) {
    // Si el tamaño es mayor o igual a 1 GB
    const sizeInGB = (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2);
    return `${sizeInGB} GB`;
  } else if (sizeInBytes >= 1024 * 1024) {
    // Si el tamaño es mayor o igual a 1 MB
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
  } else if (sizeInBytes >= 1024) {
    // Si el tamaño es mayor o igual a 1 KB
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    return `${sizeInKB} KB`;
  } else {
    // Si el tamaño es menor a 1 KB
    return `${sizeInBytes} bytes`;
  }
}


listProcess():void{
this.seniatTxtService.listProcess().subscribe((response) => {
  console.log(response)
  this.filesP=response.list;
 
  //this.fileSize=this.formatFileSize(fileSize);
  //console.log(fileSize,this.fileSize);
 },error => {
   console.error('Error en la solicitud :', error);
    this.triggerAlertERROR("Error en la solicitud");
});
}

listError():void{
this.seniatTxtService.listError().subscribe((response) => {
  console.log(response)
  this.filesE=response.list;
 },error => {
   console.error('Error en la solicitud :', error);
    this.triggerAlertERROR("Error en la solicitud");
});
}

resetLoad():void {
  this.isLoading=false;
}
process():void {
  this.closeAlert();
  this.closeAlertListPE();
  this.showList=false;
  this.isLoading=true;
  this.disableButton();
  this.closeAlertERROR();


        this.seniatTxtService.process().subscribe((response:ResponseData) => {
         this.responseData = response; 
         //console.log(response);
         if(this.responseData.error){
            this.triggerAlert(this.responseData.msg);
            this.resetLoad(); 
         }else{
             this.showInfo = true;
             console.log(response);
             this.listProcess();
             this.listError();
             this.triggerAlertPE();
             this.fileSize=this.formatFileSize(response.FileSizeTotal ?? 0);
              //this.isLoading = false; // Ocultar el spinner
             this.resetLoad(); 
         }

         this.enableButton();
         //this.list();
        },error => {
           console.error('Error en la solicitud :', error);
           this.triggerAlertERROR("Error en la solicitud");
        });
        


}
download() {
    this.seniatTxtService.downloadFile().subscribe(blob => {
      // Crea un enlace temporal para descargar el archivo
      saveAs(blob, "XmlToTxt.log");
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });
  }

}
