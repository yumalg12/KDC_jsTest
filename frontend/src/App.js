console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({ $target });

    this.DarkModeToggle = new DarkModeToggle({
      $target
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.saveResult(data);
          this.Loading.hide();
        });
      },
      onRandomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        this.Loading.show();
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
        this.Loading.hide(); //수정 필요
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(data) {
    console.log(data);
    localStorage.setItem('lastResult', JSON.stringify(data));
  }

  init() {
    const lastResult = localStorage.getItem('lastResult') === null? []: JSON.parse(localStorage.getItem('lastResult'));
    this.setState(lastResult);
  }
}
