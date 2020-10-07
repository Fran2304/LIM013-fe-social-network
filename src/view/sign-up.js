/* eslint-disable no-unused-vars */

import { signupUser, googleLogin, facebookLogin } from '../configFirebase.js';

export default () => {
  const viewSignUp = `
  <section class='title-hide'> 
  <img class="bio-thani" src="imagenes/logo-long-bio.png">
  </section>
<section class="signUp-user">
<section class="signUp-user-header">
      <img class="mindfulness" src="imagenes/undraw_register.svg">
      </section>
<section class="signUp-user-container">
<section class="signUp-user-title">
<h1> <img class="bio-thani" src="imagenes/logo-long-bio.png"></h1>
</section>
<section class= "signUp-user-form">
<p class="welcome">¡Registrarse es fácil y rápido!</p>
<form class="signUp-form">
    <input class="signUp-form-input" type="text" id="name-signUp" placeholder="Usuario">
    <input class="signUp-form-input" type="email" id="email-signUp" placeholder="Email">
    <input class="signUp-form-input" type="password" id="password-signUp" placeholder="Password">

    <button type="submit" id="" class="signUp-form-btn">Regístrate</button>
</form>

  <!-- <p class="or">O bien ingresa con...</p>
  <section class="social"> 
    <a id="facebookSignUp"><img class="social-btn" src="imagenes/facebook-logo.png" alt="Facebook"></img></a>
    <a id="googleSignUp"><img class="social-btn" src="imagenes/google-logo.png" alt="Google"></img></a>
  </section>-->


    <p>¿Ya tienes una cuenta?</p> <a href="#">Iniciar sesión</a>
</section>

</section>

</section>


`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view');
  divElemt.innerHTML = viewSignUp;

  function registrarUsuarios(id) {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('user').doc(id);
    const nameSignUp = divElemt.querySelector('#name-signUp');
    const emailSignUp = divElemt.querySelector('#email-signUp');
    const nameSave = nameSignUp.value;
    const emailSave = emailSignUp.value;
    console.log(docRef);

    docRef.set({
      name: nameSave,
      email: emailSave,
      photo: 'imagenes/user-perfil.jpg',
    })
      .then(() => {
        console.log('datos guardados');
        window.location.hash = '#/profile';
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  const signUpBtn = divElemt.querySelector('.signUp-form');
  signUpBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = divElemt.querySelector('#password-signUp');
    const email = divElemt.querySelector('#email-signUp');
    signupUser(email.value, password.value)
      .then((userCredential) => {
      // window.location.hash = '#/profile';
        console.log('singUp');
        const user = firebase.auth().currentUser.uid;
        console.log(user);

        registrarUsuarios(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //   function registrarUsuarios(id) {
  //     const firestore=firebase.firestore();
  //     const docRef=firestore.collection('user').doc(id);
  //     const nameSignUp = divElemt.querySelector('#name-signUp');
  //     const emailSignUp = divElemt.querySelector('#email-signUp');
  //     const nameSave = nameSignUp.value;
  //     const emailSave = emailSignUp.value;
  //     console.log(docRef);

  //     docRef.set({
  //       name: nameSave,
  //       email: emailSave,
  // })
  //   .then(() => {
  //     console.log('datos guardados');
  //     window.location.hash = '#/profile';
  // })
  //   .catch((error) => {
  //     console.error('Error: ', error);
  // });
  // }
  return divElemt;
};
