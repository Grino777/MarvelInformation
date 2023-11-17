import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charsList: [],
        loading: null,
    };

    marvelService = new MarvelService();

    async componentDidMount() {
        // const charsList = await this.marvelService.getAllCharacters();
        const charsList = [
            {
                id: 1011196,
                name: 'Captain Flint',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
                homepage:
                    'http://marvel.com/characters/384/captain_flint?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/comics/characters/1011196/captain_flint?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1010338,
                name: 'Captain Marvel (Carol Danvers)',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a.jpg',
                homepage:
                    'http://marvel.com/comics/characters/1010338/captain_marvel_carol_danvers?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Ms._Marvel_(Carol_Danvers)?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1011096,
                name: 'Captain Marvel (Genis-Vell)',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
                homepage:
                    'http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Photon_(Genis-Vell)?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1009224,
                name: 'Captain Marvel (Mar-Vell)',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/f/60/526032048d1a1.jpg',
                homepage:
                    'http://marvel.com/comics/characters/1009224/captain_marvel_mar-vell?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Captain_Marvel_(Mar-Vell)?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1011095,
                name: 'Captain Marvel (Monica Rambeau)',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/9/00/4c0030bee8c86.jpg',
                homepage:
                    'http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Rambeau,%20Monica?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1011097,
                name: 'Captain Marvel (Phyla-Vell)',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/4c0030bc4629e.jpg',
                homepage:
                    'http://marvel.com/characters/9/captain_marvel?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Quasar_(Phyla-Vell)?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1011355,
                name: 'Captain Midlands',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
                homepage:
                    'http://marvel.com/characters/386/captain_midlands?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Captain_Midlands?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1009225,
                name: 'Captain Stacy',
                description:
                    'NYPD Captain George Stacy was the father of one-time Peter Parker girlfriend Gwen Stacy.',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/2/a0/4c00407752be2.jpg',
                homepage:
                    'http://marvel.com/characters/390/captain_stacy?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Stacy%2C_George?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
            {
                id: 1011027,
                name: 'Captain Universe',
                description: '*Данные персонажа скрыты*',
                thumbnail:
                    'http://i.annihil.us/u/prod/marvel/i/mg/4/c0/4c00324c12ba2.jpg',
                homepage:
                    'http://marvel.com/characters/392/captain_universe?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
                wiki: 'http://marvel.com/universe/Captain_Universe?utm_campaign=apiRef&utm_source=adc735a6e703adb31b51b30a541619af',
            },
        ];
        this.onLoaded(charsList);
    }

    onLoaded = (charsList) => {
        this.setState({ charsList, loading: false });
        // console.log(this.state);
    };

    renderAllChars (charsList) {
        const items = charsList.map((item) => {
            return (
                // <li className="char__item" key={item.id}>
                //     <img src={item.thumbnail} alt={item.name} />
                //     <div className="char__name">{item.name}</div>
                // </li>
                <CharBlock char={item}/>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    };

    render() {
        let { charsList } = this.state;
        charsList = this.renderAllChars(charsList);


        return (
            <div className="char__list">
                {charsList}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

/* <ul className="char__grid">
        <li className="char__item" key={id}>
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </li>
</ul>; */

const CharBlock = (char) => {
    const { id, name, thumbnail } = char;
    console.log(id, name);

    return (
        <li className="char__item" key={id}>
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharList;
