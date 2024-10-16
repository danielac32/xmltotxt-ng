import { Component ,OnInit,inject} from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
 import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    CommonModule
    ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {

ngOnInit(): void {
       
}
}
