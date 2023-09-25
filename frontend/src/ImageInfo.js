class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.Loading = new Loading({ $target });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  showDetail(data) {
    this.Loading.show();
    api.fetchCatDetail(data.cat.id).then(({data}) => {
      this.setState({
        visible: true,
        cat: data
      });
      this.Loading.hide();
    })
  }

  closeImageInfo() {
    this.setState({
      visible: false,
      cat: undefined, //초기화한다는 의미
    })
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      this.$imageInfo.addEventListener('click', e=>{
        if (e.target.className === 'ImageInfo' || e.target.className === 'close'){
          this.closeImageInfo();
        }
      })
      document.addEventListener('keyup', e=>{
        if (e.key === "Escape") {
          this.closeImageInfo();
        }
      })


    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
