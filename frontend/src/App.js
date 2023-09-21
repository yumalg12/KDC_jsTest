console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
      onClick: keyword => {
      }
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
      onRandomSearch: () => {
        this.Loading.show();
        console.log("random clicked");
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
