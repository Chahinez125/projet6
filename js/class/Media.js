import CardInfos from './CardInfos.js';
import LightBox from './LightBox.js';

const gallery = document.getElementById('gallery');
const lightboxModal = document.getElementById('modal-lightbox');

export default class Media {
  
  /* FR: Cible de l'élement gallery */
  static target;
  
  /* FR: Instances stockera tous les medias */
  static instances = [];
  
  /* FR: Nombre total de likes (affiché dans la carte infos du photographe) */
  static totalLikes = 0;

  constructor (data, target) {
   
    /* FRA: Donnée id */
    this.id = data.id;
   
    /* FRA: Photographe id */
    this.photographerId = data.photographerId;
    
    /* FRA: Date du media */
    this.date = data.date;
    
    /* FRA: Nombre de likes du media */
    this.likes = data.likes;
   
    /* FRA: Titre du media */
    this.title = data.title;
    
    /* FRA: Prix du media */
    this.price = data.price;
    
    /* FRA: Media liké, est false par defaut */
    this.liked = false;
   
    /* FRA: Target est la cible on l'on va stocker tout les medias pour les afficher */
    Media.target = target;
   
    /* FRA: Incrementation du total de like */
    Media.totalLikes = Media.totalLikes + this.likes; /* (or Media.totalLikes += this.likes) */
    
    /* FRA: Met les informations sur les medias dans l'instance */
    Media.instances = [...Media.instances, this];
  }

  static fill = () => {
    
    /* FRA: Reset la cible ou on affiche les medias */
    Media.target.innerHTML = '';
   
    /* FRA: Afficher le nouveau contenu trié */
    Media.instances.forEach(media => Media.target.appendChild(media.element));
  };

  
  /* FRA: On récupere tout les medias pour les trier selon un parametre */
  static sortBy = (params) => {
    const element = [...Media.instances];
    switch (params) {
      case 'date':
        element.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'title':
        element.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        element.sort((a, b) => a.likes - b.likes);
        break;
    }
    
    /* FRA: Donnée du nom du photographe */
    Media.instances = element;
    
    /* FRA: Afficher le nouveau contenu trié */
    Media.fill();
  };

  like = () => {
   
    /* FRA: Afficher le nouveau contenu trié */
    if (this.liked) {
      
      /* FRA: enleve 1 au total de like d'un media */
      this.likes = this.likes - 1; /* (or this.likes -= 1) */
      
      /* FRA: enleve 1 au total de likes */
      Media.totalLikes = Media.totalLikes - 1; /* (or Media.totalLikes -= 1) */
    } else {
      
      /* FRA: ajoute 1 au total de like d'un media */
      this.likes = this.likes + 1; /* (or this.likes += 1) */
      
      /* FRA: ajoute 1 au total de likes */
      Media.totalLikes = Media.totalLikes + 1; /* (or Media.totalLikes += 1) */
    };

    
    /* FRA: Toggle pour remplir le coeur ou non */
    this.likeBtn.classList.toggle('fas');
    this.likeBtn.classList.toggle('far');
    
    /* FRA: Toggle liked ou non */
    this.liked = !this.liked;

    
    /* FRA: Mise à jour de l'affichage de la valeur du like du media */
    this.likeCount.innerHTML = this.likes;
    /* FRA: Mise à jour de l'affichage de la valeur total des likes sur la carte info */
    CardInfos.updateTotalLike();
  };

  static showGallery = () => {
    if (!lightboxModal.classList.contains('open')) {
      gallery.setAttribute('visible', 'true');
    }
  };

  static hideGallery = () => {
    if (lightboxModal.classList.contains('open')) {
      gallery.setAttribute('visible', 'false');
    }
  };

  getLikeBtn = () => {
    const containerButton = document.createElement('span');
    containerButton.setAttribute('role', 'button');
    /* FRA: tabindex va permettre de rendre l'element focusable dans un ordre précis ou bien de l'éviter */
    containerButton.setAttribute('tabindex', '0');
    /* FRA: L'attribut aria-label est utilisé pour définir une légende non-visible associée à un élément HTML dont le sens est transmis uniquement par le visuel. */
    containerButton.setAttribute('aria-label', 'likes');
    containerButton.setAttribute('class', 'media__infos__container-likes');
    /* FRA: Boutton like de fontawesome */
    const likeElement = document.createElement('i');
    likeElement.setAttribute('class', 'far fa-heart media__infos__likes-icon');
    
    /* FRA: Sur le lick du boutton like on joue la fonction like */
    likeElement.addEventListener('click', this.like);
    
    /* FRA: Si on appuie sur Entrée sur l'icon du coeur, on peut liker le contenu */
    containerButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.like();
      };
    });

    containerButton.appendChild(likeElement);

    this.likeBtn = likeElement;

    return containerButton;
  };

     /* FRA: EsLint veut que l'on déclare un nouvel objet pas entre accolades */
  static newLightbox = (mediaInstance, mediaIndex) => new LightBox(mediaInstance, mediaIndex);
}
