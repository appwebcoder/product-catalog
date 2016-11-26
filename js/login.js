/**
 * Created by ivan on 25/11/16.
 */
// hace que el codigo es ejecutado solamente despues que la pagina termina de cargarse y protege toda varible contenida dentro del script para prevenir que no se hagan variables globales
$(function() {
    // indica el modo en que el navegador debe ejecutar el código JavaScript
    // El modo estricto elimina algunos errores silenciosos de JavaScript haciendo que lancen excepciones, corrige errores que hacen que sea difícil para los motores de JavaScript realizar optimizaciones y  prohibe cierta sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
    "use strict";

    const setAppCookie = () => firebase.auth().currentUser &&
        firebase.auth().currentUser.getToken().then(token => {
            cookies.set('token', token, {
            domain: window.location.hostname,
            expire: 1 / 24, // One hour
            path: '/',
            secure: true // If served over HTTPS
        });
    });
    const auth = firebase.auth();

    var email, password;

    $('#loginForm').change(function () {
        email = $('#email').val();
        password = $('#password').val();

        if (email && password) {
            $('#loginButton').removeAttr('disabled');
        } else {
            $('#loginButton').attr('disabled','disabled');
        }
    });

    function cancelLogin() {
        location.assign('index.html');
    }

    function registerUser() {
        location.assign('register.html');
    }
    
    function loginUser() {
        var email = $('#email').val();
        var password = $('#password').val();

        const promise = auth.signInWithEmailAndPassword(email, password);

        promise.catch(error => console.log(error.message));
        setAppCookie;
        /*
        var user = firebase.auth().currentUser;

        if (user) {
            location.assign('productlisting.html');
        }
        */
        console.log('aqui: ', promise, 'email:' , email, 'pass: ',password);
    }

    auth.onAuthStateChanged(function(user) {
        if(user) {
            console.log(user.email, user);
            location.assign('index.html');
        } else {
            console.log('User not logged in');
        }
    });


    $('#loginButton').click(loginUser);
    $('#cancelButton').click(cancelLogin);
    $('#registerButton').click(registerUser);

});