import PropTypes from 'prop-types';
import React, { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        charsList: [],
        loading: false,
        error: false,
        offset: +this.props.offset,
        ended: false,
        loadingNewChars: false,
    };

    marvelService = new MarvelService();

    //-------------component methods--------------
    componentDidMount() {
        this.updateCharacters();
    }

    //-------------end component methods-----------

    //-------------setState block------------------
    onLoading = () => {
        this.setState({ loading: true });
    };

    onLoaded = (charsList) => {
        const oldList = this.state.charsList;
        if (charsList.length < 9) {
            this.setState({ ended: true });
        }

        this.setState({
            charsList: [...oldList, ...charsList],
            loading: false,
        });
    };

    onError = () => {
        this.setState({ error: true });
    };

    onUpdateOffset = () => {
        const { offset } = this.state;
        this.setState({ offset: +offset + 9 });
    };

    //-------------end setState block-----------------

    //-------------methods block----------------------

    updateCharacters = () => {
        const { ended } = this.state;

        if (!ended) {
            this.onLoading();
            this.marvelService
                .getAllCharacters(this.state.offset)
                .then(this.onLoaded)
                .catch(this.onError);
            this.onUpdateOffset();
        }
    };

    renderAllChars(charsList) {
        let items;
        if (!charsList || charsList.length === 0) {
            items = null;
        } else {
            items = charsList.map((item) => {
                return (
                    <CharBlock
                        key={item.id}
                        char={item}
                        onSelectChar={this.props.onSelectChar}
                    />
                );
            });
        }

        return <ul className="char__grid">{items}</ul>;
    }
    //--------------end methods block-------------------

    // -----------------------render--------------------
    render() {
        let { charsList, loading, error, ended } = this.state;
        charsList = this.renderAllChars(charsList);
        const spinner = loading ? <Spinner /> : false;
        const errorMessage = error ? <ErrorMessage /> : false;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {charsList}
                <button
                    className="button button__main button__long"
                    disabled={loading}
                    style={{ display: ended ? 'none' : 'block' }}
                    onClick={() => this.updateCharacters()}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

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
