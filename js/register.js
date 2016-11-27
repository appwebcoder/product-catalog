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

        if (password === passwordConfirm && password.length > 5) {
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

        promise.catch(function (error) {
            console.log(error.message);
        });
    }

    function cancelRegister() {
        location.assign('index.html');
    }

    $('#registerButton').click(registerUser);
    $('#cancelButton').click(cancelRegister);

});