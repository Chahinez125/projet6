import Api from './class/Api.js';
import Photographer from './class/Photographer.js';


/* FRA: Cibles */

const photographerTarget = document.getElementById('photographers-list');

/* FRA: Fonctions */
const dispatch = (element, target) => {
  target.appendChild(element);
};

/* FRA: Api initialization */

try {
  await Api.init();
} catch (error) {
  console.log(error);
};


/* FRA: Récupère et crée tous les photographes */

Api.getAllPhotographers().forEach(photographer => new Photographer(photographer));


/* FRA: Injecter les photographes */
Photographer.instances.forEach(photographer => {
  
  /* FRA: Nous prenons l'élément pour chaque instance de photographe et injectons dans le photographeTarget qui est l'élément de la liste des photographes */
  dispatch(photographer.element, photographerTarget);
});
