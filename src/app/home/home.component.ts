import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptons = {

  headers : new HttpHeaders({'Content-Type': 'application/json'})    
  };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {


  is_loading = false; 
  users: any;

  is_update = false;
  _id = "";

  url = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.loadData();
  }

  deleteData(id)
  {

   if(confirm('Are you sure to delete this record?'))
   {
    this.http.delete(this.url+'delete/'+id,httpOptons).subscribe((data)=>{

      this.loadData();
      console.log(data);

    });
  } 
  }

  searchData()
  {
    
    var name = (document.getElementById('name') as HTMLInputElement).value;
    var gender = (document.getElementById('gender') as HTMLInputElement).value;
    var company = (document.getElementById('company') as HTMLInputElement).value;
    var email = (document.getElementById('email') as HTMLInputElement).value;
    var phone = (document.getElementById('phone') as HTMLInputElement).value;

   
    
    var data = {};

    if(name != '')
    {
      data['name'] = name;
    }

    if(gender != '')
    {
      data['gender'] = gender;
    }

    if(company != '')
    {
      data['company'] = company;
    }

    if(email != '')
    {
      data['email'] = email;
    }

    if(phone != '')
    {
      data['phone'] = phone;
    }

    console.log(data);

    


    this.http.post(this.url+'search',data,httpOptons).subscribe((rs: JSON)=>{

     this.users = rs;

      });

  }

  editData(id)
  {

    scrollTo(0,0);
  
     this.http.get(this.url+'user/'+id).subscribe((rsp: JSON)=>{

     

      (document.getElementById('name') as HTMLInputElement).value=rsp[0].name;
      (document.getElementById('gender') as HTMLInputElement).value=rsp[0].gender;
      (document.getElementById('company') as HTMLInputElement).value=rsp[0].company;
      (document.getElementById('email') as HTMLInputElement).value=rsp[0].email;
      (document.getElementById('phone') as HTMLInputElement).value=rsp[0].phone;

      this.is_update = true;
      this._id = id;

     });

  }
  
  saveData()
  {
   
      var name = (document.getElementById('name') as HTMLInputElement).value;
      var gender = (document.getElementById('gender') as HTMLInputElement).value;
      var company = (document.getElementById('company') as HTMLInputElement).value;
      var email = (document.getElementById('email') as HTMLInputElement).value;
      var phone = (document.getElementById('phone') as HTMLInputElement).value;

      var data = {name: name, gender: gender, company: company, email: email, phone: phone};
     
        if(name != '' && gender != '' && company != '' && email != '' && phone != '')
        {

        if(this.is_update)
        {

          this.http.put(this.url+'update/'+this._id,data,httpOptons).subscribe((rs)=>{

        
            (document.getElementById('name') as HTMLInputElement).value="";
            (document.getElementById('gender') as HTMLInputElement).value='';
            (document.getElementById('company') as HTMLInputElement).value='';
            (document.getElementById('email') as HTMLInputElement).value='';
            (document.getElementById('phone') as HTMLInputElement).value='';
    
            

            this.is_update = false;
            this._id = '';
            

            this.loadData();
        }
      }
        else
        {

        this.http.post(this.url+'save',data,httpOptons).subscribe((rs)=>{

        
        (document.getElementById('name') as HTMLInputElement).value="";
        (document.getElementById('gender') as HTMLInputElement).value='';
        (document.getElementById('company') as HTMLInputElement).value='';
        (document.getElementById('email') as HTMLInputElement).value='';
        (document.getElementById('phone') as HTMLInputElement).value='';

        console.log(rs);

       

      });
    }
    }
  }

  loadData()
  {
    this.is_loading = true;
      this.http.get(this.url+'users').subscribe((usersx: JSON)=>{
        this.users = usersx;
        this.is_loading = false;
      });
  }

}
