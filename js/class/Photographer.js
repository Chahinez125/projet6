import FormContact from './FormContact.js';

/**
 * class Photographer
 */
export default class Photographer {
  
  /* Instances stockera tous les photographes */
  static instances = [];
  
  /*  Quand on n'a rien à montrer sur les photographes et que c'est vide, on affiche la div */
  static emptyTarget = document.getElementById('no-photographer');

  constructor (data) {
    
    /*  Donnée id */
    this.id = data.id;
   
    /*  Donnée concernant la photo profil du photographe */
    this.portrait = data.portrait;
    
    /* Donnée du nom du photographe */
    this.name = data.name;
   
    /* Donnée de la ville du photographe */
    this.city = data.city;
    
    /*  Donnée du pays du photographe */
    this.country = data.country;
    
    /*  Donnée de la tagline du photographe */
    this.tagline = data.tagline;
    
    /* Donnée  sur le prix par jour du photographe */
    this.price = data.price;/* ENG: Put informations into the instance */
    /* * Met les informations sur les photographes dans l'instance */
    Photographer.instances = [...Photographer.instances, this];
    
    /* Stock la vue specifique dans l'element (La vue de la card sur la page de la homepage ou la vue du header dans le profile du photographe) */
    this.element = this.getView();
  }

  /**
  
   *  Cette fonction choisit la vue du photographe en fonction de la page renvoyée
   * @returns {HTMLElement}
   */
  getView = () => {
    
    /*  Récupère le contenu de l'url après le '/' */
    let path = window.location.pathname.split('/');
    path = path[path.length - 1];

    switch (path) {
     
      /*  Le code suivant était nécessaire au bon fonctionnement du switch */
      
      /*  Dans le cas de la homepage qui est la card avec les informations du photographe */
      case '':
      case 'index.html':
        return this.thumbnail();
      case 'photographer.html':
        return this.profile();
      default:
        break;
    }
  };

  /**
   *  Element de la vue de la card du photographe sur la homepage
   * @returns {HTMLElement}
   */
  thumbnail = () => {
    const element = document.createElement('article');
    element.setAttribute('class', 'photographer-thumbnail');

    element.innerHTML =
    `
      <a class="photographer__profile" href="photographer.html?id=${this.id}">
        <img class="photographer__profile__img" src="assets/images/Photographers/${this.portrait}" alt="photo">
        <h2 class="photographer__profile__name">${this.name}</h2>
      </a>
      <div class="photographer__infos">
        <p class="photographer__infos__city">${this.city}, ${this.country}</p>
        <p class="photographer__infos__tagline">${this.tagline}</p>
        <p class="photographer__infos__price">${this.price}€/jour</p>
      </div>
    `;

    return element;
  };

  /**
   *  Element profile de la vue du photographe sur la page photographe
   * @returns {HTMLElement}
   */
  profile = () => {
    /* Elements du profil */
    const container = document.createElement('section');
    container.setAttribute('id', 'photographer-profile');
    container.setAttribute('class', 'photographer-profile');

    const infosElement = document.createElement('div');
    infosElement.setAttribute('class', 'photographer__infos');
    infosElement.setAttribute('tabindex', '0');

    /*  Contenu de l'element infos */
    infosElement.innerHTML =
    `
      <h1 class="photographer__infos__name" tabindex="0">${this.name}</h1>
      <p class="photographer__infos__city" tabindex="0">${this.city}, ${this.country}</p>
      <p class="photographer__infos__tagline" tabindex="0">${this.tagline}</p>
    `;

    const contactBtn = document.createElement('button');
    contactBtn.setAttribute('id', 'contact-btn');
    contactBtn.setAttribute('class', 'btn photographer__btn');
    contactBtn.setAttribute('aria-label', 'Contactez moi');
    contactBtn.innerHTML = 'Contactez-moi';

    const pictureElement = document.createElement('img');
    pictureElement.setAttribute('class', 'photographer__img');
    pictureElement.setAttribute('alt', this.name);
    pictureElement.setAttribute('src', `assets/images/photographers/${this.portrait}`);

    
    /* Ajout des elements créé précédement au container */
    container.appendChild(infosElement);
    container.appendChild(contactBtn);
    container.appendChild(pictureElement);

    /* Ajout d'une écoute d'evenement sur le clique du boutton pour ouvrir le formulaire de contact */
    contactBtn.addEventListener('click', () => FormContact.open());

    return container;
  };
}
