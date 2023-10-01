console.log("app is running!");

import Loading from './Loading.js';
import DarkModeToggle from './DarkModeToggle.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import api from './api.js';

class App {
  $target = null;
  DEFAULT_PAGE = 1;
  data = {
    items: [],
    page: this.DEFAULT_PAGE
  }

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
          this.setState({
            items: data? data: [],
            page: this.DEFAULT_PAGE
          });
          this.saveResult(data);
          this.Loading.hide();
        });
      },
      onRandomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState({
            items: data? data: [],
            page: this.DEFAULT_PAGE
          });
          this.Loading.hide();
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      },
      onNextPage: () => {
        this.Loading.show();
         
        const lastKeyword = localStorage.getItem('history') === null? '': localStorage.getItem('history').split(',')[0];
        const page = this.page + 1;
        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState({
            items: newData,
            page: page
          });
          this.Loading.hide();
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

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveResult(data) {
    localStorage.setItem('lastResult', JSON.stringify(data));
  }

  init() {
    const lastResult = localStorage.getItem('lastResult') === null? []: JSON.parse(localStorage.getItem('lastResult'));
    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE
    });
  }
}

export default App;