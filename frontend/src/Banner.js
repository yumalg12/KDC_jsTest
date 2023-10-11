import api from './api.js';

class Banner {
  $banner = null;
  data = null;
  current = 0;
  
  constructor({$target}) {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'Banner';
    this.$banner = document.createElement('ul');
    
    this.$prevButton = document.createElement("button");
    this.$prevButton.textContent = '◀';
    this.$prevButton.className = 'prev';

    this.$prevButton.addEventListener('click', e=> {
      let prev = this.current - 1;
      if (prev < 0) {
        return;
      }
      this.changeCurrent(prev);
      this.$banner.style.left = -(Number(this.$wrapper.clientWidth)) * prev + 'px';
      console.log('prev');
    })
    
    this.$nextButton = document.createElement("button");
    this.$nextButton.textContent = '▶';
    this.$nextButton.className = 'next';
    
    this.$nextButton.addEventListener('click', e=> {
      let next = this.current + 1;
      if (next === this.data.length) {
        return;
      }
      this.changeCurrent(next);
      this.$banner.style.left = -(Number(this.$wrapper.clientWidth)) * next + 'px';
      console.log('next');
    })
    
		this.$wrapper.appendChild(this.$banner);
		this.$wrapper.appendChild(this.$prevButton);
		this.$wrapper.appendChild(this.$nextButton);
    console.log($target, this.$wrapper);
		$target.appendChild(this.$wrapper);

    this.getRandom();
  }

  changeCurrent(index) {
    this.current = index;
    this.moveTo(index);
  }

  moveTo(index) {
    let leftPos = -(Number(this.$wrapper.clientWidth) * index);
    this.$banner.style.left = leftPos + 'px';
  }

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

  getRandom() {
    api.fetchRandomCats().then(({ data }) => {
      this.setState(data? data.slice(0,5): []);
    });
  }

  render() {
    this.$banner.innerHTML = this.data
    .map(
      banner => `<li style="background-image: url(${banner.url})"></li>`
    ).join('');

    this.$banner.style.width
     = Number(this.$wrapper.clientWidth) * this.data.length + 'px';

    this.$banner.querySelectorAll('li').forEach(e => {
      e.style.width = this.$wrapper.clientWidth + 'px';
    });
  }
}

export default Banner;