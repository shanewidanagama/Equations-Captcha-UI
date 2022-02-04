import { LoginService } from './../../services/login.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  captchas: any = []
  captchaIndex = 0
  showCaptchaQ: boolean = false
  question: string = ''
  options: any[] = []
  rightAns: string = ''
  isCaptchaIncorrect: boolean = false

  constructor (private loginService: LoginService) {}

  login () {
    this.loginService.login().then(
      data => {
        this.doCaptcha()
      },
      err => {
        console.log(err)
        window.alert('An error occurred when logging in.')
      }
    )
  }

  doCaptcha () {
    //retreive captchas from DB and store them in an array of JS objects
    //then shows first captcha
    this.loginService.getCaptchas().then(data => {
      this.captchas = data
      this.showCaptchaQ = true
      this.showNewCaptcha()
    })
  }

  showNewCaptcha () {
    this.question = this.captchas[this.captchaIndex].question
    this.options = this.captchas[this.captchaIndex].answers
    this.rightAns = this.captchas[this.captchaIndex].rightAns
    this.captchaIndex++
  }

  testCaptcha () {
    //get dropdown list element
    let select = <HTMLSelectElement>document.querySelector('.captchaOptions')

    //checks if inputted answer is correct and shows an appropriate message
    //tells user to login later if they fail capture 5 times
    if (this.captchaIndex === 5) {
      window.alert('Too many failed attempts. Try again later.')
    } else if (select.value == this.rightAns) {
      this.isCaptchaIncorrect = false
      window.alert('Login Successful!')
    } else {
      this.showNewCaptcha()
      this.isCaptchaIncorrect = true
    }

    //resets the selected answer for the next captcha
    select.value = ''
  }

  ngOnInit (): void {}
}
