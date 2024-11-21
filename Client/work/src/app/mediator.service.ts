import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  private apiUrl ='http://127.0.0.1:8000/'
  constructor(public h:HttpClient) { }

  sentdata(data:any){
    console.log(data)
    return this.h.post('http://127.0.0.1:8000/register/',data)
  }
  loginuser(data:any){
    console.log(data)
    return this.h.post('http://127.0.0.1:8000/login/',data)
  }
  addblog(b:any){
    console.log(b)
    return this.h.post('http://127.0.0.1:8000/add_blog/',b)
  }
  viewblog(b:any){
    // let a1 = parseInt(b)
    // console.log(a1)
    // return this.h.get('http://127.0.0.1:8000/view_blog/?id='+b)
    return this.h.get('http://127.0.0.1:8000/view_blog/')

  }
  delblog(id:any){
    return this.h.delete('http://127.0.0.1:8000/delete_blog/'+id)
  }

  editblog(id:any){
    let a1 = parseInt(id)
    console.log(a1)
    return this.h.get('http://127.0.0.1:8000/update_blog/?id='+a1)
  }

  deleteblog(b:any){
    return this.h.post('http://127.0.0.1:8000/update_blog/',b)
  }

  addComment(comment: any) {
    return this.h.post(this.apiUrl + 'add_comment/', comment);
}

viewComments(blogId: number) {
    return this.h.get(this.apiUrl + 'view_comments/' + blogId + '/');
}


}
