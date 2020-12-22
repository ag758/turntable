import { useEffect, useCallback, useRef } from 'react';

// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch, topic) => {
  useEffect(() => {

    dispatch({ type: 'FETCHING_ARTICLES', fetching: true })
    fetch(`https://newslit-news-search.p.rapidapi.com/news?q=${topic}&offset=${data.page * 20}&count=20`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": process.env.REACT_APP_NEWS_API_KEY,
        "x-rapidapi-host": "newslit-news-search.p.rapidapi.com"
      }
    })
      .then(data => data.json())
      .then(value => {
        dispatch({ type: 'STACK_ARTICLES', articles: value.results.stories })
        dispatch({ type: 'FETCHING_ARTICLES', fetching: false })
      })
      .catch(e => {
        // handle error
        console.log(e)
        dispatch({ type: 'FETCHING_ARTICLES', fetching: false })
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
