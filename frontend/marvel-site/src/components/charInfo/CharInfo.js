import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import thor from '../../resources/img/thor.jpeg';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    onLoading = () => {
        this.setState({ loading: true });
    };

    onError = () => {
        this.setState({ error: true });
    };

    onCharLoaded = (char) => {
        this.setState({ char: char, loading: false });
    };

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.userID !== prevProps.userID) {
            this.updateChar();
        }
    }

    render() {
        const { char, loading, error } = this.props;

        const skeleton = char || loading || error ? <Skeleton /> : null;
        const errorMessage = error ? <ErrorMessage /> : false;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? (
            <View char={char} />
        ) : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = (char) => {
    const { name, description, thumbnail, comics, homepage, wiki } = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
            </ul>
        </>
    );
};

export default CharInfo;
