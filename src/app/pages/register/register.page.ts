import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private auth: AuthService
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      code: ['']
    });
  }

  ngOnInit() {
  }

  back() {
    this.navController.navigateBack('/home');
  }

  async next() {
    let loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.auth.signUpWithEmailAndPassword({
        email:this.form.value.email,
        password:this.form.value.password
      }).then(() => {
        this.navController.navigateForward('/register-confirm');
        loading.dismiss();
        this.navController.navigateForward('/home');
      }).catch(error => {
        loading.dismiss();
        console.log(error);
      });
  }
}
