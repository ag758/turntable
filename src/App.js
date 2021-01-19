import React, { useReducer, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch, scrollPage, useLazyLoading } from './customHooks';
import './index.css';
import './App.css';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Speech from './Speech';
import Article from './views/Article';
import Icon from './images/4.png';
import Topics from './constants/Topics.js';

function App(props) {

  let [newsIdx, setNewsIdx] = useState(0);
  let [isAudioPlaying, setAudioPlaying] = useState(false);

  const articleReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_ARTICLES':
        return { ...state, articles: state.articles.concat(action.articles) }
      case 'FETCHING_ARTICLES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  let [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  let [articleDatax, articleDispatch] = useReducer(articleReducer, { articles: [], fetching: true, })

  let articleData = React.useRef([]);
  useEffect(() => {
    articleData.current = articleDatax;
    return () => {
      Speech.getInstance(this).cancelSpeechSynthesis();
    }
  }, [articleDatax]);

  useFetch(pager, articleDispatch, props.topic);
  useLazyLoading('.card-img-top', articleData.current.articles);

  const onChange = (e, continueOverride = false) => {
    if (!continueOverride) {
      setAudioPlaying(false);
    }
    if (e === articleData.current.articles.length - 1) {
      // Fetch new articles
      scrollPage(pagerDispatch);
    }
    if (e < articleData.current.articles.length && e > -1) {
      setNewsIdx(e);
    }
    let utterance = new SpeechSynthesisUtterance(deriveText(articleData.current.articles[e]));
    if (continueOverride) {
      utterance.onend = () => {
        onChange(e + 1, continueOverride);
      }
    }
    Speech.getInstance(this).onSwitchNews(continueOverride, utterance);
  }

  const setPlaying = (boolean) => {
    setAudioPlaying(boolean);
    let utterance = new SpeechSynthesisUtterance(deriveText(articleData.current.articles[newsIdx]));
    utterance.onend = () => {
      onChange(newsIdx + 1, boolean);
    }
    Speech.getInstance(this).onPlayingChanged(true, boolean, utterance);
  }

  const deriveText = article => {
    if (!article) {
      return "";
    }
    return article.title + "!" +
      (article.source ? " by " + article.source + " ! " : " ! ") +
      (article.excerpt ? article.excerpt + " ! " : " ! ");
  }

  const prettierDate = dateString => {
    return new Date(dateString).toLocaleString();
  }

  const history = useHistory();
  const pushTopic = (topic) => {
    setPlaying(false);
    history.push(`/${topic}`);
  }

  return (
    <div className="box">

      <div className="box header">
        <nav className="navbar navbar-light bg-light vertical-center inline">
          <a className="navbar-brand" href="/">
            <img src={Icon} width="180px" height="53px" alt="" />
          </a>


          <form className="form-inline" style={{ marginTop: '25px', maxHeight: '50px', overflow: 'auto' }}>
            {Topics.map((topicx, idx) => {
              return (<button className="btn" type="button" key={idx}
                onClick={() => { pushTopic(topicx) }}
              >{topicx}</button>)
            })}
          </form>


        </nav>
      </div>

      <div className="box content">

        <Carousel
          style={{ height: '100%' }}
          arrows
          className="fill"
          value={newsIdx}
          onChange={onChange}>
          {articleData.current.articles && articleData.current.articles.map((article, index) => {
            return (
              <Article
                key={index}
                index={index}
                url={article.url}
                source={article.source}
                author={article.author}
                imageURL={article.image_url}
                title={article.title}
                publication_date={prettierDate(article.publication_date)}
                excerpt={article.excerpt}>
              </Article>
            )
          })}
        </Carousel>

      </div>
      <div className="box footer">
        <div className="mediabar">
          <button type="button" className="btn btn-primary btn-xlarge" aria-label="Left Align" onClick={() => setPlaying(!isAudioPlaying)}>
            {
              !isAudioPlaying ?
                <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                :
                <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
            }
          </button>
        </div>
      </div>
    </div >
  );
}

export default App;
