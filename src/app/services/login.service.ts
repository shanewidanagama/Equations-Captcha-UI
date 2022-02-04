import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs/internal/firstValueFrom'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL: string = 'http://localhost:3000/'
  constructor (private http: HttpClient) {}

  //fake login attempt to mock API
  login () {
    return firstValueFrom(
      this.http.post(this.baseURL + 'testPosts', null, {
        headers: { 'Content-type': 'application/json' }
      })
    )
  }

  getCaptchas () {
    return firstValueFrom(this.http.get(this.baseURL + 'captchas'))
  }
}
