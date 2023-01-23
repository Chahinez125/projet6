import Media from './Media.js';

export default class Image extends Media {
  constructor (data, target) {
    super(data, target);
    /*  Image du media */
    this.img = data.image;
    /* Alt du media */
    this.alt = data.alt;
    
    /* Sotck la vue specifique dans l'element */
    this.element = this.getView();
  }

  /**
   * Cette fonction va retourner la vue d'une carte media
   * @returns {HTMLElement}
   */
  getView = () => {
    const container = document.createElement('article');
    container.setAttribute('class', 'media');

    const media = document.createElement('a');
    media.setAttribute('href', '#');
    media.setAttribute('role', 'button');
    media.setAttribute('class', 'media__link');

    media.innerHTML = this.getThumbnail();

   
    /*  Sur le clique du media, on affiche la lightbox */
    media.addEventListener('click', () => Media.newLightbox(Media.instances, Media.instances.indexOf(this)));

    
    /* En pressant la touche enter sur le media, on affiche la lightbox */
    media.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        Media.newLightbox(Media.instances, Media.instances.indexOf(this));
      }
    });

    const footer = document.createElement('footer');
    footer.setAttribute('class', 'media__infos');
    footer.innerHTML = `<p class="media__infos__title">${this.title}</p>`;

    /* On créer une div concernant le like */
    const like = document.createElement('div');
    like.setAttribute('class', 'media__infos__likes');

   
    /* Cette span sera à l'intérieur de la div like */
    const likeNb = document.createElement('span');
    likeNb.setAttribute('tabindex', '0');
    likeNb.setAttribute('class', 'media__infos__likes-nb');
    likeNb.innerHTML = this.likes;
    likeNb.setAttribute('aria-label', likeNb.innerHTML);

    
    /* On stock la span dans une variable likeCount précédé d'un this */
    this.likeCount = likeNb;

    
    /* on fait apparaitre l'enfant à propos de la div like */
    like.appendChild(likeNb);
    like.appendChild(this.getLikeBtn());
    footer.appendChild(like);
    container.appendChild(media);
    container.appendChild(footer);

    return container;
  };

  /**
   * Element image / video de la carte media
   * @returns {HTMLElement}
   */
  getThumbnail = () => {
    return `<img class="media__link__img" src="assets/images/${this.photographerId}/${this.img}" alt="${this.title}">`;
  };
}
