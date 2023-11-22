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

    getAllCharacters = () => {
        let characters = this.getData(
            `${this._url}characters?limit=9&offset=210&${this._apiKey}`
        ).then((res) => {
            return res.data.results.map(this._transformCharData);
        });

        return characters;
    };

    getCharacter = async (id) => {
        let res = await this.getData(
            `${this._url}characters/${id}?${this._apiKey}`
        );

        return this._transformCharData(res.data.results[0]);
    };

    _transformCharData = (char) => {
        let { description } = char;
        const { id, name, thumbnail, urls } = char;

        if (!description) {
            description = '*Данные персонажа скрыты*';
        }

        if (description.length >= 100) {
            description = description.slice(0, 100) + '...';
        }

        return {
            id: id,
            name: name,
            description: description,
            thumbnail: `${thumbnail['path']}.${thumbnail['extension']}`,
            homepage: urls[0].url,
            wiki: urls[1].url,
        };
    };
}

export default MarvelService;
