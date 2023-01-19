import Media from './Media.js';

export default class SortDropDownSelector {
  constructor () {
    
    /* FRA: Item des choix qui seront dans le dropdown de triage */
    this.item = {
      popularity: 'Popularité',
      date: 'Date',
      title: 'Titre'
    };
    
    /* FRA: Définir une valeur par defaut pour le bouton dropdown */
    this.defaultBtnValue = 'Popularité';
    
    /* FRA: Défini le state par false par defaut */
    this.state = false;
  };

  static value = 'popularity';

  getView = () => {
    const sortView = document.createElement('div');
    sortView.setAttribute('class', 'sort');

    const sortLabel = document.createElement('span');
    sortLabel.setAttribute('id', 'sort-label');
    sortLabel.setAttribute('class', 'sort__label');
    sortLabel.setAttribute('tabindex', '0');
    sortLabel.innerHTML = 'Trier par';

    const sortWrapper = document.createElement('div');
    sortWrapper.setAttribute('id', 'sort-wrapper');
    sortWrapper.setAttribute('class', 'sort__wrapper');
    this.wrapper = sortWrapper;

    const sortBtn = document.createElement('button');
    sortBtn.setAttribute('id', 'sort-btn');
    sortBtn.setAttribute('class', 'btn sort-btn');
    sortBtn.setAttribute('aria-expanded', 'false');
    sortBtn.setAttribute('aria-haspopup', 'listbox');
    sortBtn.setAttribute('labelledby', 'sort-label');
    sortBtn.innerHTML = this.defaultBtnValue;
    this.btn = sortBtn;
    sortBtn.addEventListener('click', this.toggleDropDown);

    /* ENG: Retrieve the sortList through the getSorList method which is the creation of the ul and li */
    /* FRA: On récupere la sortList au travers the la methode getSortList qui est la création du ul et li */
    const sortList = this.getSortList();
    /* ENG: Set the sortList variable inside this.list that we create */
    /* FRA: On set la variable sortList dans this.list que l'on créer */
    this.list = sortList;

    sortWrapper.appendChild(sortBtn);
    sortWrapper.appendChild(sortList);

    sortView.appendChild(sortLabel);
    sortView.appendChild(sortWrapper);

    return sortView;
  };

  /**
   * @returns {HTMLElement} HTMLElement
   */
  getSortList = () => {
    
    /* FRA: On crée le ul qui aura les items li */
    const sortList = document.createElement('ul');
    sortList.setAttribute('id', 'sort-list');
    sortList.setAttribute('class', 'sort-list');
    sortList.setAttribute('role', 'listbox');
    /* FRA: Avec aria-activedescendant, le navigateur garde le focus DOM sur l'élément conteneur ou sur un élément d'entrée qui contrôle l'élément conteneur. Cependant,
    l'agent utilisateur communique les événements et les états de focus du bureau à la technologie d'assistance comme si l'élément référencé par aria-activedescendant avait le focus. */
    sortList.setAttribute('aria-activedescendant', 'popularity');
    /* FRA: L'attribut aria-selected indique l'état actuel "sélectionné" de divers widgets. */
    sortList.setAttribute('aria-selected', 'true');
    /* FRA: L'attribut aria-labelledby identifie l'élément (ou les éléments) qui labelise l'élément auquel il est appliqué. */
    sortList.setAttribute('aria-labelledby', 'sort-label');

    /* FRA: Création des li par rapport au nombre des item à l'intérieur de this.item (3) */
    for (const [key, value] of Object.entries(this.item)) {
      const sortItem = document.createElement('li');
      sortItem.setAttribute('id', value);
      sortItem.setAttribute('class', 'sort-list__item');
      sortItem.setAttribute('data-value', key);
      sortItem.setAttribute('tabindex', '0');
      sortItem.setAttribute('role', 'button');
      sortItem.innerHTML = value;

      sortItem.addEventListener('click', this.updateState);
      
      /* FRA: Permet de donné l'acessibilité à la fonctionnalité de triage en utilisant le bouton entré */
      sortItem.addEventListener('keydown', (e) => {
        e.key === 'Enter' && this.updateState(e);
      });

      sortList.appendChild(sortItem);
    }

    return sortList;
  };

  /**
   
   * FRA: Modifie l'état du bouton de tri lorsqu'une option est cliquée.
   * @param {PointerEvent} e
   */
  updateState = (e) => {
    e.preventDefault();
    this.toggleDropDown();
    const newState = e.target.getAttribute('data-value');
    if (newState !== SortDropDownSelector.value) {
      SortDropDownSelector.value = newState;
      
      /* FRA: On set newState dans un nouveau this.btnValue */
      this.btnValue = newState;
      
      /* FRA: On change la valeur du aria-activedescant avec la nouvelle valeur de l'element selectionné */
      this.list.setAttribute('aria-activedescendant', newState);
      
      /* FRA: on affiche dans le bouton la valeur de la valeur de trie selectionné */
      this.btn.innerHTML = this.item[newState];
      
      /* FRA: On trie les medias par le nouveau état selectionné */
      Media.sortBy(newState);
    };
  };

  /**
  
   * FRA: Ouvre ou ferme le dropdown en prenant en compte l'état (state)
   */
  toggleDropDown = () => {
    if (this.state) {
      this.state = false;
      this.btn.setAttribute('aria-expanded', 'false');
      this.wrapper.classList.remove('open');
      this.list.style.display = 'none';
      document.removeEventListener('click', this.clickOut);
    } else {
      this.state = true;
      this.btn.setAttribute('aria-expanded', 'true');
      this.wrapper.classList.add('open');
      this.list.style.display = 'block';
      document.addEventListener('click', this.clickOut);
    };
  };
}
