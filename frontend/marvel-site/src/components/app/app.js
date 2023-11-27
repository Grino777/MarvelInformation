import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        charId: false,
        startOffset: 1550,
    };

    selectedChar = (id) => {
        this.setState({ charId: id });
    };

    onSelectChar = (id) => {
        this.selectedChar(id);
    };

    render() {
        const {startOffset} = this.state
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList 
                        onSelectChar={this.onSelectChar}
                        offset={startOffset}
                        />
                        <CharInfo charId={this.state.charId}/>
                    </div>
                    <img
                        className="bg-decoration"
                        src={decoration}
                        alt="vision"
                    />
                </main>
            </div>
        );
    }
}

export default App;
