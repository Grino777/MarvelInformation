import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    marvelService = new MarvelService();

    componentDidMount() {
        console.log(this.charsList);
    }

    _transformCharsList = (charsList) => {
        let newCharsList = charsList.map((char) => {
            const { id, name, thumbnail } = char;
            return (
                <li className="char__item"
                 key={id}>
                    <img src={thumbnail} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{newCharsList}</ul>;
    };

    render() {
        const charsList = this.marvelService
            .getAllCharacters()
            .then((charsList) => this._transformCharsList(charsList));

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

const CharBlock = (char) => {
    const { id, name, thumbnail } = char;

    return (
        <li className="char__item" key={id}>
            <img src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharList;
