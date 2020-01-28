export class AuthService {



  private isAuthenticated = false;
  private tok:any;
  static tok: string;


  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  

}
