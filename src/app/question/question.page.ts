import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateQuestionPage } from '../create-question/create-question.page';
import { EditQuestionPage } from '../edit-question/edit-question.page';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  private API_URL = environment.API_URL_DEV;
  private questions;
  categoryId: number;

  constructor(
    @Inject(AuthService)
    private authService: AuthService,
    public modalController: ModalController,
    handler: HttpBackend, 
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController:AlertController
    ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.categoryId = this.router.getCurrentNavigation().extras.state.categoryId;
      }
    });
  }

  ngOnInit() {
    if (this.categoryId == undefined)
    {
      this.router.navigateByUrl("/category");
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    };

    this.http.get<any>(`${this.API_URL}/category/${this.categoryId}/questions`, httpOptions)
    .subscribe(
      result => {
        this.questions = result;
      }
    );
  }

  editChoices(id)
  {
    let navigationExtras: NavigationExtras = {
      state : {
        questionId: id
      }
    };
    this.router.navigate(['category/question/choice'], navigationExtras);
  }

  addQuestion()
  {
    this.presentAddModal();
  }

  async deleteQuestion(id)
  {
    // show the user a confirm alert.
    const confirmation = await this.warn();
    // break out of function since they hit cancel.
    if (!confirmation) return;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    };
    
    this.http.delete<any>(`${this.API_URL}/question/delete/${id}`, httpOptions)
    .subscribe(
      (result) => {},
      (error) => {
        this.toastr.error(error, 'Deletion Error');
      },
      () => {
        this.toastr.success('Question successfully deleted', 'Question deletion');
        this.questions = this.questions.
                        filter(x => x.questionId !== id);
      });
  }

  editQuestion(id)
  {
    this.presentEditModal(id);
  }

  async warn() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Question deletion',
        message: 'Are you sure that you want to delete this question ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Yes',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async presentAddModal() {
    const modal = await this.modalController.create({
      component: CreateQuestionPage,
      componentProps: { categoryId: this.categoryId }
    });
    modal.onDidDismiss().then((data:any)=>{
      this.questions.push(data.data.newQuestion);
      });
    return await modal.present();
  }

  async presentEditModal(id: number) {
    const modal = await this.modalController.create({
      component: EditQuestionPage,
      componentProps: { questionId: id }
    });
    modal.onDidDismiss().then((data:any)=>{
      this.questions = this.questions.
                        filter(x => x.questionId !== data.data.updatedQuestion.questionId);

      this.questions.push(data.data.updatedQuestion);
      });
    return await modal.present();
  }
}
