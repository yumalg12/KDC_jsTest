import KeywordHistory from './KeywordHistory.js';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement('section');
    $wrapper.className = "SearchInputWrapper";
    $target.appendChild($wrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    if (localStorage.getItem('lastResult')){
      this.$searchInput.value = localStorage.getItem('history').split(',')[0];
    }
    this.$searchInput.autofocus = true;

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    $searchInput.addEventListener("keyup", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    $searchInput.addEventListener("click", e => e.target.value = "");

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.textContent = "랜덤😺";
    $randomButton.className = "SearchInput RandomButton";
    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", e => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({ 
      $target,
      onSearch,
    });

  }

  render() {}
}

export default SearchInput;