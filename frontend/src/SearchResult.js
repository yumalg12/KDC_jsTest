class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  onNextPage = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";

    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  // 리팩토링 예정
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 
      && rect.left >= 0 
      && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  applyEventToElement = (items) => {
    document.addEventListener('scroll', () => {
      items.forEach((item, idx) => {
        if (this.isElementInViewport(item) && (items.length - 1 === idx)) {
          this.onNextPage();
        }
      })
    })
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });

    let listItems = this.$searchResult.querySelectorAll('.item');
    this.applyEventToElement(listItems);
  }
}
