class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;
    $target.appendChild(this.$loading);

    this.data = {
      show: false
    };

    this.render();
  }

  show() {
    console.log("show loading");
    this.setState({
      show: true
    });
  }

  hide() {
    console.log("hide loading");
    this.setState({
      show: false
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
      <div class="Loading"><p>Loading...</p></div>
      `;
      this.$loading.parentNode.parentNode.style.overflow = 'hidden';
    } else {
      this.$loading.innerHTML = ``;
      this.$loading.parentNode.parentNode.style.overflow = '';
    }
  }
}
