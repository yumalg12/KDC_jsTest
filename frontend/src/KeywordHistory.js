class KeywordHistory {
    $keywordHistory = null;
    data = null;

    constructor({ $target, onSearch }) {
        const $wrapper = document.createElement('section');
        $wrapper.className = "KeywordHistoryWrapper";
        $target.appendChild($wrapper);

        const $title = document.createElement('label');
        $title.innerHTML = `최근 검색어🐈‍`;
        $wrapper.appendChild($title);

        const $keywordHistory = document.createElement('ul');
        this.$keywordHistory = $keywordHistory;
        this.$keywordHistory.className = 'keywordHistory';
        $wrapper.appendChild(this.$keywordHistory);
        
        this.data = [
            '고양이',
            '샴',
            '페르시안'
        ];
        
        this.onSearch = onSearch;

        this.render();
    }

    render() {
        this.$keywordHistory.innerHTML = this.data.map(
            keyword => `<li><button>${keyword}</button></li>`
        ).join('');

        this.$keywordHistory.querySelectorAll('li button').forEach(($item, idx) => {
            $item.addEventListener('click', () => {
                this.onSearch(this.data[idx]);
            })
        });
    };
};