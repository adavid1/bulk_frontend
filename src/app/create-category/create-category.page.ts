import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {

  API_URL = environment.API_URL_DEV;

  categoryForm: FormGroup;
  name: FormControl;
  isPublic: FormControl;
  language: FormControl;
  owner: FormControl;

  newCategory: any;

  constructor(
    @Inject(AuthService)
    public authService: AuthService,
    handler: HttpBackend,
    public http: HttpClient,
    public storage: Storage,
    public toastr: ToastrService,
    public viewCtrl: ModalController) {
      this.http = new HttpClient(handler);
  }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]);
    this.isPublic = new FormControl(true);
    this.language = new FormControl(0);
    this.owner = new FormControl(this.authService.getLoggedUser().userid);
    this.categoryForm = new FormGroup({
      name: this.name,
      isPublic: this.isPublic,
      language: this.language,
      owner: this.owner
    });
  }

  categoryCreationForm()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    };
    
    this.http.post<any>(`${this.API_URL}/category/create`, this.categoryForm.value, httpOptions)
    .subscribe(
      (result) => {
        this.newCategory = result.category;
      },
      (error) => {
        this.toastr.error(error, 'Creation Error');
      },
      () => {
        this.toastr.success('Category successfully created', 'Category creation');
      
        this.viewCtrl.dismiss({newCategory: this.newCategory});
      });
  }

  dismissModal()
  {
    this.viewCtrl.dismiss({newCategory: null});
  }
}
