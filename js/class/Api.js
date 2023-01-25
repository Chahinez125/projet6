/**class Api*/
export default class Api {
  static photographers;
  static media;

  /**
   
   * Cette fonction récupère toutes les données json
   */
  static init = async () => {
    /* Récuperation des donnéees json avec fetch */
    const request = await fetch('../../data/photographers.json');

    /* Si la requête est ok */
    if (request.ok) {
      console.log('Data loaded !');
    
    /* * Si la requête n'est pas correct on affiche un message et le code du status */
    } else if (!request.ok) {
      console.log('Data not found', `status code: ${request.status}`);
    }

    /* * Stocker les données json de la requête dan une variable */
    const data = await request.json();

    /* * Stocker les données des photographes dans static photographers dans Api class */
    Api.photographers = data.photographers;
    Api.medias = data.media;
  };

  /* GETTERS */

  /**
   * * Obtenir tous les photographes
   * @returns {object}
   */
  static getAllPhotographers = () => {
    const res = Api.photographers;
    return res;
  };

  /**
   * * Obtenir le photogaphe par son id
   * @param {number} id
   * @returns {object}
   */
  static getPhotographerById = (id) => {
    id = parseInt(id, 10);

    if (!isNaN(id)) {
      const res = Api.photographers.find(photographer => photographer.id === id);
      return res;
    }
  };

  /**
   * * Obtenir les media d'un photographe par son id
   * @param {number} id
   */
  static getPhotographerMedia = (id) => {
    id = parseInt(id, 10);

    if (!isNaN(id)) {
      const res = Api.medias.filter(media => media.photographerId === id);
      return res;
    }
  };
}
