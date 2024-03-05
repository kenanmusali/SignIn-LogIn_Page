import React, { useState, useEffect } from 'react';
import Test from './Components/test/index';
import ToDo from './Components/ToDo';

const App = () => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [user, setUser] = useState({})

    return (
        <div>
            {isLoginMode ? <ToDo 
            user={user} 
            setUser={setUser} /> :
                <Test
                    setUser={setUser}
                    setIsLoginMode={setIsLoginMode}
                    isLoginMode={isLoginMode} />}
        </div>
    )
};

export default App;
