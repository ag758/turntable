import React, { Component } from 'react';
import './Article.css';


class Article extends Component {

  render() {
    return (
      <div className="card fill-width" key={this.props.index}>
        <img className="card-img-top img-crop noselect" data-src={this.props.imageURL} alt="" />

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
                <a className="btn btn-primary nav-link" href={this.props.url} style={{ marginRight: '10px' }} onClick={this.props.onFullArticleClick} role="button">View in App</a>
                <a className="btn btn-primary nav-link" href={this.props.url} target="_blank" rel="noopener noreferrer" role="button">Full Article</a>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Article;