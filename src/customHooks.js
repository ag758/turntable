import { useEffect, useCallback, useRef } from 'react';

// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch, topic) => {
  useEffect(() => {


    console.log(topic);

    const images = [

      {
        author: "Austin Gao",
        excerpt: "Lilliana Vazquez and Scott Tweedie share a morning cup of coffee along with the latest in all things pop culture. The dynamic hosts dish on all of the entertainment updates, covering everything from celebrity news, to lifestyle, to the can't-miss fashion trends. E! News covers the latest celebrity… ",
        image_url: "https://static01.nyt.com/images/2020/11/27/world/27iran-ledeall/27iran-ledeall-videoSixteenByNineJumbo1600-v2.jpg",
        language: "en",
        publication_date: "2020-11-27T17:06:23.000-08:00",
        source: "The New York Times",
        title: "Gunmen Assasinate Heavy Hitting ISIS Targets Nationwide",
        url: "https://www.nytimes.com/2020/11/27/world/middleeast/iran-nuclear-scientist-killed.html"
      }
    ]


    dispatch({ type: 'FETCHING_IMAGES', fetching: true })
    dispatch({ type: 'STACK_IMAGES', images: images })
    dispatch({ type: 'FETCHING_IMAGES', fetching: false })

    //   dispatch({ type: 'FETCHING_IMAGES', fetching: true })
    //   fetch(`https://newslit-news-search.p.rapidapi.com/news?q=${topic}&offset=${data.page * 100}&count=100`, {
    //     "method": "GET",
    //     "headers": {
    //       "x-rapidapi-key": process.env.REACT_APP_NEWS_API_KEY,
    //       "x-rapidapi-host": "newslit-news-search.p.rapidapi.com"
    //     }
    //   })
    //     .then(data => data.json())
    //     .then(images => {
    //       console.log(images.results.stories)
    //       dispatch({ type: 'STACK_IMAGES', images: images.results.stories })
    //       dispatch({ type: 'FETCHING_IMAGES', fetching: false })
    //     })
    //     .catch(e => {
    //       // handle error
    //       console.log(e)
    //       dispatch({ type: 'FETCHING_IMAGES', fetching: false })
    //       return e;
    //     })
    // }, [dispatch, data.page])

  }, [dispatch, data.page])

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

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);

    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items])
}
