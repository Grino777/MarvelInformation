import PropTypes from 'prop-types';
import { Component } from 'react';

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

    componentDidMount() {
        this.updateCharacters();
    }

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

    onUpdateOffset = () => {
        const { offset } = this.state;
        this.setState({ offset: +offset + 9 });
    };

    // -----------------------render----------------------
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
    const { id, name, thumbnail} = char;

    const imgStyle = 'unset';

    return (
        <li
            className="char__item"
            tabIndex={0}
            onClick={() => {
                onSelectChar(id);
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

export default CharList;
