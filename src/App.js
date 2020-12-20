import React, { useReducer, useRef, useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch, scrollPage, useLazyLoading, clearImages } from './customHooks';
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

  const history = useHistory();
  const pushTopic = (topic) => {
    history.push(`/${topic}`);
  }

  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
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
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })

  useFetch(pager, imgDispatch, props.topic);
  useLazyLoading('.card-img-top', imgData.images)

  const setPlaying = (boolean) => {
    setAudioPlaying(boolean);
    Speech.getInstance(this).onPlayingChanged(isAudioPlaying, deriveText(imgData.images[newsIdx]));
  }

  const onChange = e => {
    if (e === imgData.images.length - 1) {
      scrollPage(pagerDispatch);
    }
    setNewsIdx(e);
    Speech.getInstance(this).onSwitchNews(isAudioPlaying, deriveText(imgData.images[e]));
  }

  const deriveText = image => {
    if (!image) {
      return "";
    }
    return image.excerpt;
  }

  const prettierDate = dateString => {
    return new Date(dateString).toLocaleString();
  }

  return (
    <div className="box">

      <div className="box header">
        <nav className="navbar navbar-light bg-light vertical-center">
          <a className="navbar-brand" href="#">
            <img src={Icon} width="180px" height="53px" alt="" />
          </a>

          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              {Topics.map((topicx, idx) => {
                return (<button className="btn" type="button" key={idx}
                  onClick={() => pushTopic(topicx)}
                >{topicx}</button>)
              })}
            </form>
          </nav>


        </nav>
      </div>

      <div className="box content">
        <Carousel
          style={{ height: '100%' }}
          arrows
          className="fill"
          value={newsIdx}
          onChange={onChange}>
          {imgData.images.map((image, index) => {
            return (
              <Article
                key={index}
                index={index}
                url={image.url}
                source={image.source}
                author={image.author}
                imageURL={image.image_url}
                title={image.title}
                publication_date={prettierDate(image.publication_date)}
                excerpt={image.excerpt}>
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
