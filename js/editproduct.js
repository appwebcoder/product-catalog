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
    StartFb();

    var db = firebase.database();

    var prodId = window.name;

    var name;
    var description;
    var price;
    var img;

    var oneProduct = {};


    var prodRef = db.ref('products');

    prodRef.child(prodId).once('value', function (snap) {
        oneProduct = snap.val();

        name = oneProduct.name;
        description = oneProduct.description;
        price = oneProduct.price;
        img = oneProduct.image;

        $('#itemName').val(name);
        $('#itemDescription').val(description);
        $('#itemPrice').val(price);

        $('#preview').attr('src', img);
    });

    $('#imageInput').change(function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            img = reader.result;
            $('#preview').attr('src', reader.result);
        };
        reader.readAsDataURL(this.files[0]);
    });

    function onComplete(error) {
        if (error) {
            alert('update failed, error code: '+ error.code);
        } else {
            alert('update succeeded');
            location.assign('productlisting.html');
        }
    }

    function editProduct() {
        var editName = $('#itemName').val();
        var editDescription = $('#itemDescription').val();
        var editPrice = $('#itemPrice').val();
        var editImg = img;

        prodRef.child(prodId).update({
            name: editName,
            description: editDescription,
            price: editPrice,
            image: editImg
        }, onComplete
        );
    }

$('#editButton').click(editProduct);
});

