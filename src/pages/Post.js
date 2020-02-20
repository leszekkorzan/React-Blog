import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    containerPost: {
        height: '100%',
        marginTop: 50,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    err: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ]
    }
}))
const Post = ({match}) => {
    const id = match.params.id;
    const [html, setHtml] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const classes = useStyles();
    const getContent = () => {
        setIsLoading(true);
        axios.get(`https://docs.google.com/feeds/download/documents/export/Export?id=${id}&exportFormat=html`)
        .then(response => {
            const data = response.data;
            let styleStart = '<style type="text/css">';
            let styleEnd = '</style>';
            let splitStyleStart = data.split(styleStart);
            let splitStyleEnd = splitStyleStart[1].split(styleEnd);
            let htmlStart = '<body ';
            let htmlStart2 = '>';
            let htmlEnd = '</body>';
            let splitHtmlStart = splitStyleEnd[1].split(htmlStart);
            let splitHtmlStart2 = splitHtmlStart[1].split(htmlStart2);
            let htmlClass = splitHtmlStart2[0];
            let htmlStartFull = htmlStart + htmlClass + htmlStart2;
            splitHtmlStart = splitStyleEnd[1].split(htmlStartFull);
            let splitHtmlEnd = splitHtmlStart[1].split(htmlEnd);
            const html =
                styleStart +
                splitStyleEnd[0] +
                styleEnd +
                '<div>' +
                splitHtmlEnd[0] +
                '</div>';
            setHtml(html);
            setIsLoading(false);
        })
        .catch(error => {
            setError(true);
            setIsLoading(false);
        })
    }
    useEffect(() => {
        if(id){
            getContent();
        }
    }, []);
    return (
        <div className={classes.containerPost}>
            {!isLoading && html !== null && html.includes('Leszek-Korzan') ? (
                <div dangerouslySetInnerHTML={{__html: html}} className="displayarea"></div>
            ): (
                null
            )}
                    
            {isLoading ? (
                <CircularProgress />
            ): ( null)}

            {error ? (
                <h1 className={classes.err}>404 Not Found</h1>
            ) : (null)}
            
        </div>
    );

}
export default withRouter(Post);