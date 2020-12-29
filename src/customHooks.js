import { useEffect, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// make API calls and pass the returned data via dispatch

var config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket
};
firebase.initializeApp(config);

// Get a reference to the database service
var reference = firebase.database().ref();

export const useFetch = (data, dispatch, topic) => {
  useEffect(() => {

    dispatch({ type: 'FETCHING_ARTICLES', fetching: true })

    reference.child(`${topic}`).child(data.page).once('value')
      .then((snapshot) => snapshot.val())
      .then(value => {
        if (value) {
          dispatch({ type: 'STACK_ARTICLES', articles: value })
          dispatch({ type: 'FETCHING_ARTICLES', fetching: false })
        } else {
          dispatch({ type: 'FETCHING_ARTICLES', fetching: false })
        }
      })
      .catch(e => {

        return e;
      })
  }, [dispatch, data.page, topic])

}

// infinite scrolling with intersection observer
export const scrollPage = (dispatch) => {
  dispatch({ type: 'ADVANCE_PAGE' });
}

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback(node => {
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > -1) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    })
    intObs.observe(node);
  }, []);

  const articlesRef = useRef(null);

  useEffect(() => {
    articlesRef.current = document.querySelectorAll(imgSelector);

    if (articlesRef.current) {
      articlesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, articlesRef, imgSelector, items])
}
