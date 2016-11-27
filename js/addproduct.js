/**
 * Created by ivan on 24/11/16.
 */
// hace que el codigo es ejecutado solamente despues que la pagina termina de cargarse y protege toda varible contenida dentro del script para prevenir que no se hagan variables globales
$(function() {
    // indica el modo en que el navegador debe ejecutar el código JavaScript
    // El modo estricto elimina algunos errores silenciosos de JavaScript haciendo que lancen excepciones, corrige errores que hacen que sea difícil para los motores de JavaScript realizar optimizaciones y  prohibe cierta sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
    "use strict";

    function StartFb() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC47tLIfXbbwiQbSFjgglwKgyvbfUDTM2Y",
            authDomain: "product-catalog-fd479.firebaseapp.com",
            databaseURL: "https://product-catalog-fd479.firebaseio.com",
            storageBucket: "product-catalog-fd479.appspot.com",
            messagingSenderId: "175992378112"
        };
        firebase.initializeApp(config);
    }

    const auth = firebase.auth();
    var db = firebase.database();

    var itemName;
    var itemDescription;
    var itemPrice;
    var baseImg;

    $('#imageInput').change(function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            baseImg = reader.result;
            $('#preview').attr('src', reader.result);
        };
        reader.readAsDataURL(this.files[0]);
    });

    $('#addForm').change(function () {
        itemName = $('#itemName').val();
        itemDescription = $('#itemDescription').val();
        itemPrice = $('#itemPrice').val();
        if (itemName && itemDescription && itemPrice) {
            $('#saveButton').removeAttr('disabled');
        } else {
            $('#saveButton').attr('disabled','disabled');
        }
    });

    function AddProduct() {
        itemName = $('#itemName').val();
        itemDescription = $('#itemDescription').val();
        itemPrice = $('#itemPrice').val();

        if(!baseImg) {
            baseImg = 'NONE';
        }

        var prodRef = db.ref().child('products');

        prodRef.push({
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: baseImg
        });
    }

    $('#saveButton').click(AddProduct);

    function logOff() {
        auth.signOut().then(function() {
            location.assign('index.html');
        }, function(error) {
            // An error happened.
            console.log('Error al salir', error);
        });
    }

    auth.onAuthStateChanged(function(user) {
        if (user) {
            var loggedIn = '<li><p class="navbar-text">' + user.email + '</p></li>';
            loggedIn += '<li><a href="#" id="logoutLink">Salir</a></li>';

            $(loggedIn).appendTo('.navbar-right');
            $('#logoutLink').click(logOff);
            console.log('Usuario logueado');
        } else {
            console.log('Usuario no logueado');
            location.assign('login.html');
        }
    });

});
