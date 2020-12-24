import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch, scrollPage, useLazyLoading } from './customHooks';
import './index.css';
import './App.css';
import Carousel from '@brainhubeu/react-carousel';
import Modal from 'react-modal';
import '@brainhubeu/react-carousel/lib/style.css';
import Speech from './Speech';
import Article from './views/Article';
import Icon from './images/4.png';
import Topics from './constants/Topics.js';

function App(props) {

  let [newsIdx, setNewsIdx] = useState(0);
  let [isAudioPlaying, setAudioPlaying] = useState(false);
  let [isModalShowing, setModalShowing] = useState(props.isModalShowing == null ? false : this.props.isModalShowing);
  let [modalURL, setModalURL] = useState(props.modalURL == null ? "" : this.props.modalURL);

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

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [articleData, articleDispatch] = useReducer(articleReducer, { articles: [], fetching: true, })

  useFetch(pager, articleDispatch, props.topic);
  useLazyLoading('.card-img-top', articleData.articles)

  const setPlaying = (boolean) => {
    setAudioPlaying(boolean);
    Speech.getInstance(this).onPlayingChanged(boolean, deriveText(articleData.articles[newsIdx]));
  }

  const openModal = (modalURL) => {
    console.log(modalURL);
    setModalURL(modalURL);
    setModalShowing(true);
  }

  const closeModal = () => {
    setModalShowing(false);
  }

  const onChange = e => {
    if (e === articleData.articles.length - 1) {
      scrollPage(pagerDispatch);
    }
    setNewsIdx(e);
    Speech.getInstance(this).onSwitchNews(isAudioPlaying, deriveText(articleData.articles[e]));
  }

  const deriveText = article => {
    if (!article) {
      return "";
    }
    return article.excerpt;
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

        <Modal
          isOpen={isModalShowing}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}>
          <iframe title={modalURL} src={modalURL} width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0"></iframe>
        </Modal>

        <Carousel
          style={{ height: '100%' }}
          arrows
          className="fill"
          value={newsIdx}
          onChange={onChange}>
          {articleData.articles.map((article, index) => {
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
                excerpt={article.excerpt}
                onFullArticleClick={() => openModal(article.url)}>
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
