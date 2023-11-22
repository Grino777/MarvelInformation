import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        charsList: [],
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onLoaded)
            .catch(this.onError);
    }

    onLoaded = (charsList) => {
        this.setState({ charsList, loading: false });
    };

    onError = () => {
        this.setState({ error: true });
    };

    renderAllChars(charsList) {
        let items;
        console.log(charsList);
        if (!charsList || charsList.length === 0) {
            return <li key={0}></li>;
        } else {
            items = charsList.map((item) => {
                return <CharBlock key={item.id} char={item} />;
            });
        }

        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        let { charsList, loading, error } = this.state;
        charsList = this.renderAllChars(charsList);
        const spinner = loading ? <Spinner /> : false;
        const errorMessage = error ? <ErrorMessage /> : false;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {charsList}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

const CharBlock = ({ char }) => {
    const { name, thumbnail } = char;

    const imgStyle = 'unset';

    return (
        <li className="char__item">
            <img src={thumbnail} alt={name} style={{ objectFit: imgStyle }} />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharList;
