class MarvelService {
    _url = 'https://gateway.marvel.com:443/v1/public/';

    _apiKey = 'apikey=9612d955af974f63ab9487b072eb5450';

    getData = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw Error(`Данный ${url} выдал ошибку: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = () => {
        return this.getData(
            `${this._url}characters?limit=9&offset=210&${this._apiKey}`
        );
    };

    getCharacter = (characterId) => {
        return this.getData(
            `${this._url}characters/${characterId}?${this._apiKey}`
        );
    };
}

export default MarvelService;
