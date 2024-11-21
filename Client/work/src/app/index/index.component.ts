import { Component } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
interface Blog {
  id: number;
  title: string;
  content: string;
  newComment: string[];  // Array to hold comments for each post
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(public m: MediatorService, private route: ActivatedRoute, public r: Router) {}

  // blog:any = []; // Array to store blogs
  blog = [];
  data = { id: "", email: "", first_name: "", gender: "", last_name: "", mobilenumber: "", password: "", username: "" };
  b = { title: "", content: "", user: "" }; // Temporary storage for blog details
  newComments: { [key: number]: string } = {};
  data = { id: 1 }; // Example: The logged-in user's ID
  editedTitle: string = '';
  editedContent: string = '';
  // newComments: { [key: number]: string } = {};

  ngOnInit() {
    // this.loadPosts();
    this.route.queryParams.subscribe(params => {
      console.log(params); // { key1: 'value1', key2: 'value2' }
      this.data['id'] = params['id'];
      this.data['email'] = params['email'];
      this.data['first_name'] = params['first_name'];
      this.data['last_name'] = params['last_name'];
      this.data['mobilenumber'] = params['mobilenumber'];
      this.data['password'] = params['password'];
      this.data['username'] = params['username'];
      this.data['gender'] = params['gender'];
    });
  

    this.m.viewblog(this.data['id']).subscribe((res: any) => {
      this.blog = res['data'].map((blog: any) => ({
        ...blog,
        showComment: false // initialize showComment to false for each blog item
      }));
    });
  
  }
  blogadd(a: any) {
    this.b['title'] = a['title'];
    this.b['content'] = a['content'];
    this.b['user'] = this.data['id']; // Use the user ID from logged-in data

    this.m.addblog(this.b).subscribe((res: any) => {
      console.log(res);
      if (res['status'] === 1) {
        alert('Blog added successfully');
      } else {
        alert('Failed to add the blog');
      }
    });
  }

  editBlog(blogId: number) {
    const editedBlog = {
      title: this.editedTitle,
      content: this.editedContent,
      user_id: this.data['id']
    };
  
    this.m.editblog(blogId, editedBlog).subscribe((res: ApiResponse) => {
      console.log(res);
      if (res.status === 1) {
        alert('Blog updated successfully');
      } else {
        alert('Failed to update the blog');
      }
    });
  }
  
  deleteBlog(blogId: number) {
    const data = { user_id: this.data['id'] };
  
    this.m.deleteblog(blogId, data).subscribe((res: ApiResponse) => {
      console.log(res);
      if (res.status === 1) {
        alert('Blog deleted successfully');
      } else {
        alert('Failed to delete the blog');
      }
    });
  }

  addComment(postId: number) {
    const post = this.blog.find((p) => p.id === postId);
    if (post) {
      console.log('Comment for post:', postId, post.newComment);
      // Handle comment logic here
    }
  }
 
}
