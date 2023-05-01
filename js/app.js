/*
REFACTORING :
déjà fais : 
elInput.addEventListener("keyup", backSpaceSearch);
elInput2.addEventListener("keyup", backSpaceSearch);
elDeleteSearch.addEventListener("click", clearSearch);
elDeleteSearch2.addEventListener("click", clearSearch);
*/
/* ---SELECT HEADER--- */
const elInput = document.querySelector(".bottomMenu input");
const elInput2 = document.querySelector(".contentSecondaryInput input");
const elDeleteSearch = document.querySelector(".deleteSearch");
const elDeleteSearch2 = document.querySelector(".deleteSearch2");
const elCroixSearch = document.querySelector(".croixSearch");
const elCroixSearch2 = document.querySelector(".croixSearch2");
const elTopMenu = document.querySelector(".topMenu");
const elSousMenu = document.querySelector(".sousMenu");
const elNavLinks = document.querySelector(".links");
const elMenu = document.querySelector(".menu");
const elHeader = document.querySelector(".header");
const elLinks = document.querySelectorAll(".links > div > span");
const elOpacityDiv = document.querySelector(".opacityDiv");

/* --- SELECT THUMBNAILS --- */
const elCards = document.querySelectorAll(".mediaCard");
// console.log(elCards);
/* LISTENER HEADER */
elInput.addEventListener("click", clickSearch);
elInput2.addEventListener("click", clickSearch2);

/* * refactoring  ok * */
elInput.addEventListener("keyup", backSpaceSearch);
elInput2.addEventListener("keyup", backSpaceSearch);
elDeleteSearch.addEventListener("click", clearSearch);
elDeleteSearch2.addEventListener("click", clearSearch);
/* * --------------- * */
elCroixSearch.addEventListener("click", closeSearch);
elCroixSearch2.addEventListener("click", closeSearch2);
window.addEventListener("scroll", scrollFunction);
window.addEventListener("load", () => {
  elInput.style.backgroundImage = "url(image/logos/menu/search.svg)";
  elInput2.style.backgroundImage = "url(image/logos/menu/search.svg)";
});

function clickSearch() {
  elInput.classList.add("activeSearch");
  elInput.classList.remove("searchColor");
  elInput.style.backgroundImage = "none";
  elInput.setAttribute("placeholder", "RPG, hack 'n' Slash, multijoueur...");
  elCroixSearch.style.display = "block";
}
function clickSearch2() {
  elInput2.classList.add("activeSearch2");
  elInput2.style.backgroundImage = "none";
  elInput2.setAttribute("placeholder", "RPG, hack 'n' Slash, multijoueur...");
  elCroixSearch2.style.display = "block";
  if (window.matchMedia("(max-width: 650px)").matches) {
    elLogo = document.querySelector('.divLogo').parentNode;
    elIconRight = document.querySelector('.headerRight');
    elLogo.style.display = 'none';
    elIconRight.style.display = 'none';
    elInput2.parentNode.style.marginLeft = "0"
    elInput2.parentNode.style.marginRight = "20px";
  };
}

function closeSearch(e) {
  elInput.removeAttribute("placeholder", "RPG, hack 'n' Slash, multijoueur...");
  elInput.classList.remove("activeSearch");
  elInput.classList.add("searchColor");
  elCroixSearch.style.display = "none";
  elDeleteSearch.style.display = "none";
  elInput.addEventListener("transitionend", closeSearchTransitionEnd);
  function closeSearchTransitionEnd(e) {
    if (e.propertyName === "width") {
      elInput.style.backgroundImage = "url(image/logos/menu/search.svg)";
      elInput.removeEventListener("transitionend", closeSearchTransitionEnd);
    }
  }

}
function closeSearch2(e) {
  elInput2.removeAttribute(
    "placeholder",
    "RPG, hack 'n' Slash, multijoueur..."
  );
  elInput2.classList.remove("activeSearch2");
  // elInput2.classList.add("searchColor");
  elCroixSearch2.style.display = "none";
  elDeleteSearch2.style.display = "none";
  elInput2.addEventListener("transitionend", closeSearchTransitionEnd);
  function closeSearchTransitionEnd(e) {
    if (e.propertyName === "width") {
      elInput2.style.backgroundImage = "url(image/logos/menu/search.svg)";
      elInput2.removeEventListener("transitionend", closeSearchTransitionEnd);
    }
  }
  if (window.matchMedia("(max-width: 650px)").matches) {
    elLogo = document.querySelector('.divLogo').parentNode;
    elIconRight = document.querySelector('.headerRight');
    elLogo.style.display = 'block';
    elIconRight.style.display = 'flex';
    elInput2.parentNode.style.marginLeft = "50px"
    elInput2.parentNode.style.marginRight = "50px";
  };
}

function backSpaceSearch() {
  this.nextElementSibling.style.display = this.value != "" ? "block" : "none";
}

function clearSearch() {
  this.previousElementSibling.value = "";
  this.style.display = "none";
}

function scrollFunction(e) {
  if (window.scrollY > 0) {
    if (window.matchMedia("(max-width: 950px)").matches) {
      elMenu.style.display = "none";
      elOpacityDiv.style.display = "none";
    } else {
      elMenu.classList.remove("menuDown");
      elMenu.classList.add("menuUp");
      elHeader.classList.add("headerScrolled");
      elInput.classList.add("searchScrolled");
      elNavLinks.classList.remove("beforeLinks");
    }

  } else {
    if (window.matchMedia("(max-width: 950px)").matches) {
      elMenu.style.display = "block";
    } else {
      elMenu.classList.remove("menuUp");
      elMenu.classList.add("menuDown");
      elHeader.classList.remove("headerScrolled");
      elInput.classList.remove("searchScrolled");
      setTimeout(() => {
        elNavLinks.classList.add("beforeLinks");
      }, "100");
    }

  }
}

/*   - SOUS MENU - */

elLinks.forEach(function (link) {
  link.addEventListener("click", displayMenu);
  function displayMenu(e) {
    elOpacityDiv.style.display = "block";
    let menuAffiche = e.target.nextElementSibling;
    menuAffiche.style.display = "block";
    let parent = e.target.parentNode;

    parent.addEventListener("mouseleave", function (event) {
      if (event) {
        menuAffiche.style.display = "none";
        elOpacityDiv.style.display = "none";
      }
    });
  }
});

/* - LISTENER THUMBNAILS */

elCards.forEach(function (elCard) {
  let image = elCard.firstElementChild;
  let video = image.nextElementSibling;
  let iconPromo = video.nextElementSibling;
  // let video = elCard.lastElementChild;
  let timeoutVideo;
  elCard.addEventListener("mouseenter", mouseenter);

  function mouseenter() {
    iconPromo.classList.add("fadeOut");
    if (window.matchMedia("(min-width: 801px)").matches) {
      //"Derrière" l'image, La video est déjà zoomé en css, mais en opacity 0.
      //J'ajoute  la class "scale_fadeOut" à mon image : elle va zoomer, et ensuite disparaitre au bout de 500ms (voir keyframes)
      //je supprime la classe unScale car il est possible qu'elle soit déjà attribuée (en rentrant dans l'écouteur "mouseleave")
      image.classList.remove("unScale");
      image.classList.add("scale_fadeOut");


      //Au moment ou mon image disparait, c'est ma video qui va apparaitre avec la classe "fadeIn" (voir keyframes), ça va lui prendre "300ms"
      timeoutVideo = setTimeout(displayedVideo, 300);
    } else {
      //transform: scale(1.07);
      video.style.transform = "scale(1)";
      image.classList.add('fadeOut');

      timeoutVideo = setTimeout(displayedVideo, 300);
    }

  }

  elCard.addEventListener("mouseleave", mouseleave);

  function mouseleave() {
    //je "clear" le timeout de la fonction variable "timeoutVideo".
    //c'est indispensable de clear le TimeOut car si on survol la video, mais qu'instantanément on quitte la zone de survol, à ce moment on entre dans le "mouseleave", et en même temps le settimeout du mouseenter se déclanche. ce qui est facheux...
    //supprime le stopDisplayVideo et survol la vignette à toute vitesse pour voir la différence.
    stopDisplayVideo();
    video.pause();
    //si on sort de la vignette, mettre la video en pause, et on lui supprime la classe pour "nettoyer" les attribus      
    video.classList.remove("fadeIn");
    iconPromo.classList.remove("fadeOut");
    iconPromo.classList.add("fadeIn");
    if (window.matchMedia("(min-width: 801px)").matches) {



      //on fait réapparaitre l'image en remettant son opacité à 1, et un scale identique à la video
      image.style.opacity = "1";
      image.style.tranform = "scale(1.07)";

      //on supprime la classe scale_fadeout pour que les deux lignes ci-dessus prennent effet, autrement le style du keyframe garde le dessus
      image.classList.remove("scale_fadeOut");

      //et on dezoome l'image
      image.classList.add("unScale");


    } else {
      image.style.opacity = "1";
      image.classList.remove('fadeOut');
    }
    //OPTIONNEL :
    //Pour nettoyer les attributs HTML des class et style précédemment appliqué, mais une fois les animations terminées.
    image.addEventListener("animationend", animationendImage);
    function animationendImage(e) {
      if (e.animationName === "unScale") {
        image.removeAttribute("style");
        image.removeAttribute("class");
        video.removeAttribute("class");
        iconPromo.classList.remove("fadeIn");
      }
    }

  }

  function displayedVideo() {
    video.classList.add("fadeIn");
    video.play();
  }
  function stopDisplayVideo() {
    clearTimeout(timeoutVideo);
  }
});

/*   GSAP    */

const elBanner = document.querySelector(".banner");

gsap.to(elBanner, {
  scrollTrigger: {
    trigger: "headerContainer",
    scrub: true,
  },
  y: 200,
});
// gsap.to(elOpacityDiv, {
//   scrollTrigger: {
//     trigger: "headerContainer",
//     scrub: true,
//   },
//   y: 200,
// });




