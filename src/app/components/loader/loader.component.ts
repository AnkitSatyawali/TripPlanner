import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubService } from '../../services/sub.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
loader:boolean=true;
  constructor(private subService : SubService,private router: Router,public dialogRef: MatDialogRef<LoaderComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  	console.log(this.data);
  	setTimeout(()=>
      { this.loader=false;
      	this.dialogRef.close();
  	    
  		this.subService.emit(this.data);
      }, 3000);
  	

  }
  // onNoClick(): void {
  //     this.dialogRef.close();
  //   }

}
