const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement('section');
    $wrapper.className = "SearchInputWrapper";
    $target.appendChild($wrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.autofocus = true;

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
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
  }

  render() {}
}
