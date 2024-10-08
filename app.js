class App{
    constructor() {


        this.$app = document.querySelector("#app");
        this.$firebaseAuthContainer = document.querySelector("#firebaseui-auth-container");
        this.$authUserText = document.querySelector(".auth-user");
        this.$logoutButton = document.querySelector(".logout");


        // Initialize the FirebaseUI Widget using Firebase.
        
        this.ui = new firebaseui.auth.AuthUI(auth);
        this.handleAuth();

        this.addEventListeners();

       
    }
    handleAuth(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$authUserText.innerHTML = user.displayName;
                this.redirectToApp();
            } else {
                this.redirectToAuth();
            }
          });
        

    }

    handleLogout(){
        firebase.auth().signOut().then(() => {
            this.redirectToAuth();
          }).catch((error) => {
           console.log("ERROR OCCURED", error)
          });
    }

    redirectToApp(){
        this.$firebaseAuthContainer.style.display = "none";
        this.$app.style.display = "block";
    }

    redirectToAuth(){
        this.$firebaseAuthContainer.style.display = "block";
        this.$app.style.display = "none";

        this.ui.start('#firebaseui-auth-container', {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID, 
            ],
            // Other config options...
          });
    }

    addEventListeners() {
        this.$logoutButton.addEventListener("click", (event) => {
            this.handleLogout();
          })
    }

    
}




const app = new App();