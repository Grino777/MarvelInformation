import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    const onLoading = () => {
        setLoading((loading) => true);
    };

    const onError = () => {
        setError(true);
    };

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    };

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        onLoading();

        marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
    };

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [updateChar]);

    const skeleton = char || loading || error ? false : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : false;
    const spinner = loading ? <Spinner /> : false;
    const content = !(loading || error || !char) ? <View char={char} /> : false;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, comics, homepage, wiki } = char;
    const thumbStyle = { objectFit: 'unset' };
    const comicsListStyle = comics.length === 0 ? { display: 'none' } : {};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbStyle} />
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
            <div className="char__descr">{description}</div>
            <div className="char__comics" style={comicsListStyle}>
                Comics:
            </div>
            <ComicsBlock comics={comics} />
        </>
    );
};

const ComicsBlock = ({ comics }) => {
    const comicsList = comics.map((item, id) => {
        return (
            <li className="char__comics-item" key={id}>
                {item.name}
            </li>
        );
    });

    return <ul className="char__comics-list">{comicsList}</ul>;
};

export default CharInfo;
