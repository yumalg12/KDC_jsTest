import KeywordHistory from './KeywordHistory.js';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement('section');
    $wrapper.className = "SearchInputSection";
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

    $searchInput.addEventListener("keypress", e => {
      if (e.key === 'Enter' && e.target.value.length != 0) {
        onSearch(e.target.value, this.$limitCount.value);
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    $searchInput.addEventListener("click", e => e.target.value = "");

    // 개수 선택박스
    const $limitCount = document.createElement('select');
    this.$limitCount = $limitCount;
    this.$limitCount.classList = 'limitCount';

    const limitCountOptions = [10, 25, 50];
    limitCountOptions.forEach(e => {
      let $option = document.createElement('option');
      $option.value = e;
      $option.textContent = `${e}개`;
      $limitCount.appendChild($option);
    });
    $wrapper.appendChild($limitCount);

    // 랜덤
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.textContent = "랜덤😺";
    $randomButton.className = "SearchInput RandomButton";
    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", e => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({ 
      $target: $wrapper,
      onSearch,
    });

  }

  render() {}
}

export default SearchInput;