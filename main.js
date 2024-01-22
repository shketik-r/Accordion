class Accordion {
  constructor(accordion, setting) {

    this.accordion = typeof accordion === "string" ? document.querySelector(accordion) : accordion;
    this.setting = setting;
    this.#getElements();
    this.#click();
    this.#showPanel();
  }

  #getElements() {
    this.#getBtn();
    this.#getPanel();
  }

  #getBtn() {
    return this.btnAll = typeof this.setting.btn === "string" ? this.accordion.querySelectorAll(this.setting.btn) : this.setting.btn;  //получить все кнопки
  }
  #getPanel() {
    return this.panelAll = typeof this.setting.panel === "string" ? this.accordion.querySelectorAll(this.setting.panel) : this.setting.panel; // получить все панели
  }

  #click() {
    this.btnAll.forEach((el, id) => {
      el.addEventListener('click', () => {
        //если true показывать только одну панель 
        if (this.setting.onlyOnePanel === true) {
          if (this.panelAll[id].style.maxHeight) {
            this.panelAll[id].style.maxHeight = null;
            this.btnAll[id].classList.remove('active');
            return;
          }
          this.panelAll.forEach((p, id) => {
            p.style.maxHeight = null;
            this.btnAll[id].classList.remove('active');
          });
          this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
          this.btnAll[id].classList.add('active');
        } else {
          if (this.panelAll[id].style.maxHeight) {
            this.panelAll[id].style.maxHeight = null;
            this.btnAll[id].classList.remove('active');
          } else {
            this.panelAll[id].style.maxHeight = this.panelAll[id].scrollHeight + "px";
            this.btnAll[id].classList.add('active');
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
          this.btnAll[id].classList.add('active');
        }
      });
    }
  }
}



new Accordion('.accordion', {
  panel: '.accordion__panel',
  btn: '.accordion__btn',
  onlyOnePanel: true,        // открывать только одну
  showPanel: 1,               // выбираем открытую панель
})