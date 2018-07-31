function toggleMenu() {
  // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
  if (sideMenu.className.indexOf('menu_closed') >= 0) {
    // primero revisamos si la clase d-none esta
  openMenu(); // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
  } else {
    closeMenu(); // si no esta la clase, le indicamos que cierre el menu
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed'); // quitando clase display-none
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed'); // añadimos la clase display-none
  sideMenu.classList.remove('menu_open');
}

function registrarVisitas() {
  screenRegister.style.display = 'block';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'block';
  closeMenu();
}

function registrosTotales() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'block';
  menuDesp.style.display = 'block';
  closeMenu();
}

function inicio() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'block';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'none';
  closeMenu();
}

(function() {
  var streaming = false,
    video = document.querySelector('#video'),
    canvas = document.querySelector('#canvas'),
    photo = document.querySelector('#photo'),
    startbutton = document.querySelector('#startbutton'),
    width = 320,
    height = 0;

  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log('An error occured! ' + err);
    }
  );

  video.addEventListener(
    'canplay',
    function(ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
});

  startbutton.addEventListener(
    'click',
    function(ev) {
      takepicture();
      ev.preventDefault();
    },
    false
  );
(); */
//registro de service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
//pedir permiso para realizar notificaciones
let messaging = firebase.messaging();
messaging.requestPermission()
  .then(function() {
    console.log('Se han aceptado las notificaciones');
    return messaging.getToken();
  })
  .the(function(token){
    if(token) {
      guardarToken(token)
    } else {
      anulaToken();
    }
  })
  .catch(function(err) {
    mensajeFeedback(err);
    console.log('No se ha recibido permiso / token: ', err);
  });
  messaging.onMessage(function(payload) {
    console.log("Mensaje recibido con el sitio activo", payload);
    mensajeFeedback(payload.notification.title + ': ' + payload.notification.body);
  });

function takepicture() {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(video, 0, 0, width, height);
  let data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

startbutton.addEventListener(
  'click',
  function(ev) {
    takepicture();
    ev.preventDefault();
  },
  false
);


