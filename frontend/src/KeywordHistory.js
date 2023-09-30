import uniqueArr from "./utils/uniqueArr.js";

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

        this.onSearch = onSearch;

        this.init();
        this.render();
    }

    init() {
        const data = this.getHistory();
        this.setState(data);
    }

    addKeyword(keyword) {
        let historyArr = this.getHistory();
        historyArr.unshift(keyword);
        historyArr = uniqueArr(historyArr); // 중복 제거
        localStorage.setItem('history', [...(historyArr.slice(0,5))]);
        this.init();
    } 

    getHistory() {
        return localStorage.getItem('history') === null? []: localStorage.getItem('history').split(',');
    }
        
    setState(nextData) {
        this.data = nextData;
        this.render();
    } 

    render() {
        this.$keywordHistory.innerHTML = this.data.map(
            keyword => `<li><button>${keyword}</button></li>`
        ).join('');

        this.$keywordHistory.querySelectorAll('li button').forEach(($item, idx) => {
            $item.addEventListener('click', () => {
                this.onSearch(this.data[idx]);
                this.addKeyword(this.data[idx]);
            })
        });
    };
};

export default KeywordHistory;