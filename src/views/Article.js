import React, { Component } from 'react';
import './Article.css';

import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
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
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";


class Article extends Component {

  render() {
    return (
      <div className="card fill-width" key={this.props.index}>
        <img className="card-img-top img-crop noselect" data-src={this.props.imageURL ? this.props.imageURL : "https://source.unsplash.com/daily?nature"} alt="" />

        <div className="card-body">

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h2 className="noselect">{this.props.title}</h2>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {this.props.source && <p className="noselect bubble">{this.props.source}</p>}
                {this.props.author && <p className="noselect bubble">{this.props.author}</p>}
                {this.props.publication_date && <p className="noselect bubble">{this.props.publication_date}</p>}
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <p className="noselect card-text">{this.props.excerpt}</p>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <FacebookShareButton url={this.props.source}><FacebookIcon size={32} round={true}></FacebookIcon></FacebookShareButton>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <a className="btn btn-primary nav-link" style={{ marginTop: '0px' }} href={this.props.url} target="_blank" rel="noopener noreferrer" role="button">Full Article</a>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Article;