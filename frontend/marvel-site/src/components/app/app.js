import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [charId, setCharId] = useState(null)
    const [startOffset, setStartOffset] = useState(1550)

    const onSelectChar = (id) => {
        setCharId(id)
    };

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList
                        onSelectChar={onSelectChar}
                        offset={startOffset}
                    />
                    <CharInfo charId={charId} />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    );
};

export default App;
