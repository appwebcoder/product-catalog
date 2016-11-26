/**
 * Created by ivan on 25/11/16.
 */
// hace que el codigo es ejecutado solamente despues que la pagina termina de cargarse y protege toda varible contenida dentro del script para prevenir que no se hagan variables globales
$(function() {
    // indica el modo en que el navegador debe ejecutar el código JavaScript
    // El modo estricto elimina algunos errores silenciosos de JavaScript haciendo que lancen excepciones, corrige errores que hacen que sea difícil para los motores de JavaScript realizar optimizaciones y  prohibe cierta sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
    "use strict";

    var email, password, passwordConfirm;

    $('#registerForm').change(function () {
        password = $('#password').val();
        passwordConfirm = $('#password2').val();

        if (password == passwordConfirm) {
            $('#registerButton').removeAttr('disabled');
        } else {
            $('#registerButton').attr('disabled','disabled');
        }
    });

    function registerUser() {
        email = $('#email').val();
        password = $('#password').val();

        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);

        promise.catch(error => console.log(error.message));
        /*
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (error) {
                console.log(errorMessage);
            }
        }).then(function (user) {
            if (user) {
                console.log('Successfully created user account');
                location.assign('index.html');
            }
        });
        */

    }


    function cancelRegister() {
        location.assign('index.html');
    }


    $('#registerButton').click(registerUser);
    $('#cancelButton').click(cancelRegister);

});