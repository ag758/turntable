import React, { Component } from 'react';
import './Article.css';
import Slide from 'react-reveal/Slide';

import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LineShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LineIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";


class Article extends Component {

  state = { showShare: false }

  clickedShare = async () => {
    const shareData = {
      title: this.props.title,
      text: this.props.text,
      url: this.props.url
    }

    if (navigator.share) {
      navigator.share(
        shareData
      )
        .catch((error) => console.log(error));
    } else {
      this.setState({ showShare: true })
    }
  }

  showShareOption = () => {
    return this.state.showShare ?
      <Slide duration={400} delay={0} left>
        <div style={{ marginBottom: '0px', marginTop: '2px' }}>
          <FacebookShareButton url={this.props.url} quote={this.props.excerpt}><FacebookIcon size={32} round={true}></FacebookIcon></FacebookShareButton>
          <FacebookMessengerShareButton appId={process.env.REACT_APP_facebookAppId} url={this.props.url}><FacebookMessengerIcon size={32} round={true}></FacebookMessengerIcon></FacebookMessengerShareButton>
          <LinkedinShareButton title={this.props.title} summary={this.props.excerpt} source={"Turntable News"} url={this.props.url}><LinkedinIcon size={32} round={true}></LinkedinIcon></LinkedinShareButton>
          <RedditShareButton title={this.props.title} url={this.props.url}><RedditIcon size={32} round={true}></RedditIcon></RedditShareButton>
          <TelegramShareButton title={this.props.title} url={this.props.url}><TelegramIcon size={32} round={true}></TelegramIcon></TelegramShareButton>
          <TwitterShareButton title={this.props.title} url={this.props.url}><TwitterIcon size={32} round={true}></TwitterIcon></TwitterShareButton>
          <WhatsappShareButton title={this.props.title} url={this.props.url}><WhatsappIcon size={32} round={true}></WhatsappIcon></WhatsappShareButton>
          <LineShareButton title={this.props.title} url={this.props.url}><LineIcon size={32} round={true}></LineIcon></LineShareButton>
          <EmailShareButton subject={this.props.title} body={this.props.excerpt} url={this.props.url}><EmailIcon size={32} round={true}></EmailIcon></EmailShareButton>
        </div>
      </Slide>
      :
      <div className="articlebtn nav-link"
        style={{ marginTop: '0px', marginBottom: '5px' }}
        onClick={() => this.clickedShare()}>
        Share
      </div>
  }

  render() {
    return (
      <div className="card fill-width" key={this.props.index}>
        <div className="canvas">
          <h2 className="noselect">{this.props.title}</h2>
          <img className="card-img-top img-crop noselect" data-src={this.props.imageURL ? this.props.imageURL : "https://source.unsplash.com/daily?city"} alt="" />
        </div>

        <div className="card-body">

          <div className="container-fluid">
            <div className="row">
              <div className="spacer col-xs-12 col-sm-12 col-md-12 col-lg-12">

              </div>
              <div className="center spacer col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {this.props.source && <p className="noselect bubble emphasized">{this.props.source}</p>}
                {this.props.author && <p className="noselect bubble deemphasized">{this.props.author}</p>}
                {this.props.publication_date && <p className="noselect bubble deemphasized">{this.props.publication_date}</p>}
              </div>
              <div className="spacer col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <p className="excerpt noselect card-text">{this.props.excerpt}</p>
              </div>
              <div className="spacer col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {this.showShareOption()}
              </div>
              <div className="spacer col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <a className="articlebtn nav-link" style={{ marginTop: '0px' }} href={this.props.url} target="_blank" rel="noopener noreferrer" role="button">Full Article</a>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Article;