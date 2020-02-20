import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Post from '../pages/Post';
import Home from '../pages/Home';
import Menu from '../components/Menu';
const Routers = () => {
    const [query, setQuery] = useState('');
    const handleQuery = event => {
        setQuery(event.target.value);
    };
    return(
        <React.Fragment>
            <Router>
                <Menu query={query} handleQuery={handleQuery}/>
                <Switch>
                    <Route path="/id/:id">
                        <Post/>
                    </Route>
                    <Route path="/">
                        <Home query={query}/>
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>

    )
}
export default Routers;