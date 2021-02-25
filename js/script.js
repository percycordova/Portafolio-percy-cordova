/******************Menu**************/
((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
        $abrir = $btnMenu.firstElementChild,
        $cerrar = $btnMenu.lastElementChild,
        $menu = d.querySelector(".menu");
    $btnMenu.addEventListener('click', () => {
        $abrir.classList.toggle("none");
        $cerrar.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    d.addEventListener('click', (e) => {
        //Si el elemento no lo origino ningun elemento a que esta dentro de la clase menu
        if (!e.target.matches(".menu a")) {
            return false;
        }
        else {
            $abrir.classList.remove("none");
            $cerrar.classList.add("none");
            $menu.classList.remove("is-active");
        }
    });

})(document);

/******************Intersection_Observer************************/
((d) => {
    const $video = d.querySelector("#video");
    const options = {
        //root:d.querySelector('body'),
        rootMargin: '0px 0px 0px 0px',
        threshold: 1,
    };

    function callback(entries, observer) {

        if (entries[0].isIntersecting) {
            $video.play();
        } else {
            $video.pause();
        }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe($video);
})(document);

/***********************ScrollBtn ******************************/
((d) => {
    const w = window;
    const $scrollBtn = d.querySelector(".scroll-top-btn");
    w.addEventListener("scroll", (e) => {
        //console.log(w.pageYOffset, d.documentElement.scrollTop);
        let scrollTop = d.documentElement.scrollTop || w.pageYOffset;
        if (scrollTop > 900) {
            $scrollBtn.classList.remove("hidden");
        } else {
            $scrollBtn.classList.add("hidden");
        }
    });

    d.addEventListener("click", (e) => {
        if (e.target.matches(".scroll-top-btn")) {
            w.scrollTo({
                behavior: "smooth", //el comportamiento
                top: 0 //a donde quieres que regrese la barra vertical
                //lef:0
            });
        }
        
    });
})(document);
/***********************Modal***************************/
((d) => {

    const $portfolios = d.querySelectorAll(".portfolio-grid a"),      //Recibo todos las etiquetas a que esten dentro de mi .grid-portfolio
        $trabajos = d.querySelectorAll("article.modal .modal-close"), //Recibo todos los div con la clase .modal-close que esten dentro de article.modal  
        $contentModal = d.querySelector(".modal-content"); //Recibo la div del contenedor del modall

    $portfolios.forEach((el, acc) => { 
        el.addEventListener("click", (e) => {
            d.querySelector(`#trabajo-${acc + 1}`).classList.add("open-modal");//Dependiendo del click del enlace me abre mi modal
            $contentModal.classList.remove("close-modal-close");
        });

    });
    $trabajos.forEach((el, acc) => {
        el.addEventListener("click", () => {
            $contentModal.classList.add("close-modal-close");
            d.querySelector(`#trabajo-${acc + 1}`).classList.remove("open-modal");
        });
    });
})(document);

/* ********** ContactForm ********** */
((d) => {
    const $form = d.querySelector(".contact-form"),
      $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");
  
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      $loader.classList.remove("none");
      fetch("https://formsubmit.co/ajax/cordovaflores1994@hotmail.com", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          location.hash = "#gracias";
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message =
            err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
          $response.querySelector(
            "h3"
          ).innerHTML = `Error ${err.status}: ${message}`;
        })
        .finally(() => {
          $loader.classList.add("none");
          setTimeout(() => {
            location.hash = "#close";
          }, 3000);
        });
    });
  })(document);