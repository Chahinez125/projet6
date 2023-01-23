import Api from './class/Api.js';
import Photographer from './class/Photographer.js';
import FormContact from './class/FormContact.js';
import Media from './class/Media.js';
import CardInfos from './class/CardInfos.js';
import SortDropDownSelector from './class/SortDropDownSelector.js';
import MediaFactory from './class/MediaFactory.js';


/* Cibles */

const photographerTarget = document.getElementById('photographer-profile');
const cardInfosTarget = document.getElementById('card-infos');
const sortTarget = document.getElementById('sort');


/* Fonctions */

const dispatch = (element, target) => {
 
  /* Compare l'élement id qui est par exemple la div id et la target du div id */
  if (element.id === target.id) {
    
    /* Prend la target du parent et remplace son enfant (le parent dans ce cas sera la section se trouvant dans le html) */
    target.parentNode.replaceChild(element, target);
  } else {
    target.appendChild(element);
  }
};

const getParam = (param) => {
  const search = window.location.search;
  const result = new URLSearchParams(search).get(param);

  if (result != null) {
    return result;
  }

  return false;
};

/* Api initialization */

try {
  await Api.init();
} catch (error) {
  console.log(error);
}

/* Récuperation de l'id du photographe provenant du parametre de la méthode GET */
const photographerId = getParam('id');


/* Création de l'element photographe */
const photographer = new Photographer(Api.getPhotographerById(photographerId));

/* Injecter du photographe */
Photographer.instances.forEach(photographer => {
  dispatch(photographer.element, photographerTarget);
});

const sort = new SortDropDownSelector();

dispatch(sort.getView(), sortTarget);

//
/* Obtenir les media d'un photographe */
const medias = Api.getPhotographerMedia(photographerId);

MediaFactory.createMedia(medias);

Media.sortBy(SortDropDownSelector.value);

const cardInfos = new CardInfos(photographer.price);

dispatch(cardInfos.getView(), cardInfosTarget);


/*Initialisation du formulaire de contact */
FormContact.initialization();
