import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const [charsList, setCharsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(+props.offset);
    const [ended, setEnded] = useState(false);
    const [loadingNewChars, setLoadingNewChars] = useState(false);

    const marvelService = new MarvelService();

    //-------------component methods--------------
    useEffect(() => {
        updateCharacters();
    });

    //-------------end component methods-----------

    //-------------setState block------------------
    const onLoading = () => {
        setLoading(true);
    };

    const onLoaded = (charsList) => {
        const oldList = charsList;
        if (charsList.length < 9) {
            setEnded(true);
        }

        setCharsList([...oldList, ...charsList]);
        setLoading(false);
    };

    const onError = () => {
        setError(true);
    };

    const onUpdateOffset = () => {
        setOffset((offset) => offset + 9);
    };

    //-------------end setState block-----------------

    //-------------methods block----------------------

    const updateCharacters = () => {
        if (!ended) {
            onLoading();
            marvelService
                .getAllCharacters(offset)
                .then(onLoaded)
                .catch(onError);
            onUpdateOffset();
        }
    };

    const renderAllChars = (charsList) => {
        let items;
        if (!charsList || charsList.length === 0) {
            items = null;
        } else {
            items = charsList.map((item) => {
                return (
                    <CharBlock
                        key={item.id}
                        char={item}
                        onSelectChar={props.onSelectChar}
                    />
                );
            });
        }

        return <ul className="char__grid">{items}</ul>;
    };
    //--------------end methods block-------------------

    // -----------------------render--------------------

    const charsListArr = renderAllChars(charsList);
    const spinner = loading ? <Spinner /> : false;
    const errorMessage = error ? <ErrorMessage /> : false;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {charsListArr}
            <button
                className="button button__main button__long"
                disabled={loading}
                style={{ display: ended ? 'none' : 'block' }}
                onClick={() => updateCharacters()}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

const CharBlock = ({ char, onSelectChar }) => {
    const { id, name, thumbnail } = char;

    const imgStyle = 'unset';

    const onFocus = (e) => {
        e.target.classList.add('char__item_selected');
        e.target.focus();
    };

    return (
        <li
            className="char__item"
            tabIndex={0}
            onClick={(e) => {
                onSelectChar(id);
                onFocus(e);
            }}
            onFocus={(e) => {
                onFocus(e);
            }}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    onSelectChar(id);
                    onFocus(e);
                }
            }}
        >
            <img src={thumbnail} alt={name} style={{ objectFit: imgStyle }} />
            <div className="char__name">{name}</div>
        </li>
    );
};

CharList.propTypes = {
    onSelectChar: PropTypes.func,
    offset: PropTypes.number,
};

CharBlock.propTypes = {
    selectedChar: PropTypes.func,
};

export default CharList;
