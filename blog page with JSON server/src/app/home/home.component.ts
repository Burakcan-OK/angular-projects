import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor (private blogService: BlogService, public dialog: MatDialog) {}

  blogData : Array<any> = []
  pageSize = 8;
  page = 13

  ngOnInit():void {
    this.blogService.getPosts().subscribe((res) => {
      this.blogData = res
      
    })
  }

  openDialog(element: any, viewOrUpdate:boolean) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data : {blog:element, isUpdate: viewOrUpdate},
      width: 'auto',
      maxWidth: 'none',
    })
  }

}
