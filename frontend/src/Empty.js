class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    this.$empty.className = "Empty";
    $target.appendChild(this.$empty);

    this.data = {
      show: false,
      isNull: false
    };

    this.render();
  }

  show(data) {
    this.setState({
      show: data === null || data.length === 0,
      isNull: data === null
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$empty.style.display = 'block';
      if (this.data.isNull) {
        this.$empty.innerHTML = `<p>요청을 불러오는 데 실패했습니다😿</p>`;
      } else {
        this.$empty.innerHTML = `<p>결과가 없습니다😿</p>`;
      }
      this.$empty.parentNode.parentNode.style.overflow = 'hidden';
    } else {
      this.$empty.style.display = 'none';
      this.$empty.innerHTML = ``;
      this.$empty.parentNode.parentNode.style.overflow = '';
    }
  }
}

export default Empty;