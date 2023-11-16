class MarvelService {
    _url = 'https://gateway.marvel.com:443/v1/public/';

    // _apiKey = 'apikey=9612d955af974f63ab9487b072eb5450';
    _apiKey = 'apikey=adc735a6e703adb31b51b30a541619af';

    getData = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw Error(`Данный ${url} выдал ошибку: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        return await this.getData(
            `${this._url}characters?limit=9&offset=210&${this._apiKey}`
        );
    };

    getCharacter = async (id) => {
        let res = await this.getData(
            `${this._url}characters/${id}?${this._apiKey}`
        );

        return this._transformCharData(res.data.results[0]);
    };

    _transformCharData = (char) => {
        let { description } = char;
        const {name, thumbnail, homepage, wiki} = char;

        if (!description) {
            description = '*Данные персонажа скрыты*';
        }

        if (description.length >= 100) {
            description = description.slice(0, 100) + '...';
        }

        console.log(char, description, );

        return {
            name: name,
            description: description,
            thumbnail: `${thumbnail['path']}.${thumbnail['extension']}`,
            homepage: homepage.urls[0].url,
            wiki: wiki.urls[1].url,
        };
    };
}

export default MarvelService;
