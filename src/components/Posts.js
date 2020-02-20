import React, {useState, useEffect} from 'react';
import BlogItem from '../components/BlogItem';
import Tabletop from 'tabletop';
import CircularProgress from '@material-ui/core/CircularProgress';
const Posts = ({query}) => {
    const [response, setResponse] = useState([])
    useEffect(() => {
        Tabletop.init({
            key: '1Oari9IiFgKmeYczRybbOeiwQUJJtkV2hp9Oi2zKV4R4',
            callback: googleData => {
                if(googleData){
                    setResponse(googleData);
                }
            },
            simpleSheet: true
        })
    }, []);
    const filteredData = response.filter(item => {
        return Object.keys(item).some(key =>
          item[key].toLowerCase().includes(query.toLowerCase())
        );
    });
    return(
        <React.Fragment>
            {response.length ? (
                filteredData.map(obj => {
                    return(
                        <BlogItem key={obj.title} id={obj.id} title={obj.title} description={obj.description} image={obj.image} />
                    )
                })
            ) : (
                <CircularProgress />
            )}

            
        </React.Fragment>
    )
}
export default Posts;