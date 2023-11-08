class Accordion {

  accordion
  btnAll
  panelAll
  iconAll
  setting = {}

  constructor(accordion, setting) {
    this.accordion = document.querySelector(accordion);
    this.setting = setting
    this.#getElements();
    this.#click();
    this.#showPanel();
  }

  #getElements() {
    this.#getBtn();
    this.#getPanel();
    if (this.setting.icon) {
      this.#getIcon();
    }
  }

  #getBtn() {
    return this.btnAll = this.accordion.querySelectorAll('.accordion__btn'); //получить все кнопки
  }
  #getPanel() {
    return this.panelAll = this.accordion.querySelectorAll('.accordion__panel'); // получить все панели
  }
  #getIcon() {
    return this.iconAll = this.accordion.querySelectorAll(this.setting.icon); // получить все иконки 
  }

  #click() {
    this.btnAll.forEach((el, id) => {
      el.addEventListener('click', () => {
        //если true показывать только одну панель 
        if (this.setting.onlyOnePanel === true) {
          if (this.panelAll[id].style.maxHeight) {
            this.panelAll[id].style.maxHeight = null;
            this.iconAll ? this.iconAll[id].classList.remove('active') : '';
            return
          }
          this.panelAll.forEach((p, id) => {
            p.style.maxHeight = null;
            this.iconAll ? this.iconAll[id].classList.remove('active') : '';
          });

          this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
          this.iconAll ? this.iconAll[id].classList.add('active') : '';
        } else {
          if (this.panelAll[id].style.maxHeight) {
            this.panelAll[id].style.maxHeight = null;
            this.iconAll ? this.iconAll[id].classList.remove('active') : '';
          } else {
            this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
            this.iconAll ? this.iconAll[id].classList.add('active') : '';
          }
        }
      })
    });
  }

  #showPanel() {
    // открытая панель
    if (this.setting.showPanel) {
      const counter = this.setting.showPanel - 1;
      this.panelAll.forEach((p, id) => {
        if (counter === id) {
          p.style.maxHeight = this.panelAll[id].scrollHeight + "px";
          this.iconAll ? this.iconAll[id].classList.add('active') : '';
        }
      });
    }
  }
}








new Accordion('.accordion', {
  onlyOnePanel: true,        // открывать только одну
  showPanel: 0,               // выбираем открытую панель
  icon: '.accordion__icon',   // получаем icon
});

