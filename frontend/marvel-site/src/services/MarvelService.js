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

    getAllCharacters = async () => {
        return await this.getData(
            `${this._url}characters?limit=9&offset=210&${this._apiKey}`
        );
    };

    getCharacter = async (id) => {
        let res = await this.getData(
            `${this._url}characters/${id}?${this._apiKey}`
        );

        console.log(res);

        return this._transformCharData(res.data.results[0]);
    };

    _transformCharData = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail['path']}.${char.thumbnail['extension']}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        };
    };
}

export default MarvelService;
