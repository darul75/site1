var Page = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {        
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    setTimeout(this.loadCommentsFromServer, 100);
  },
  componentDidUpdate: function(prevProps, prevState) {
    $('.img-holder').imageScroll({
      container: $('body'),
      windowObject: $(window),
      mediaWidth: 1600,
      mediaHeight: 1200,
      speed:.2
    });    
  },
  render: function() {
    var markup = <div></div>
    if (this.state.data) {
      return (
        <div>
          <Menu data={this.state.data.menus}/>
          <Logo />
          <Chapters data={this.state.data.sections}></Chapters>
        </div>  
      );
    }
    else {
      return ( 
        <div></div>        
      );
    }       
  }
});

var Logo = React.createClass({
  onClick: function(evt) {
    scrollToAnchor("accueil");
    evt.preventDefault();
  },
  render: function() {    
    return (       
      <div className="logo-white">
        <div onClick={this.onClick}>
          <a href="#qui_sommes_nous">
            <img src="images/logo-blanc.svg" height="200px" className="logo-home animated bounce" />
          </a>
        </div>
        <div onClick={this.onClick}>
          <i className="fa fa-3x fa-lightbulb-o fa-inverse"></i>
        </div>
      </div>
    );
  }
});

var Menu = React.createClass({
  onClick: function(evt) {
    // scrollToAnchor("accueil");
    // evt.preventDefault();
  },
  render: function() {   
    if (this.props.data) {  
      var menuItemMarkup = "";
      var menusNodes = this.props.data.map(function(menu, index) {                
        return (
          <MenuItem path={menu.path} text={menu.text} />          
        );
      });
    }

    return (       
      <div className="header_menu">      
        <header className="inner">
          <div className="menu-nav">
            <ul id="menu-menu-principal" className="menu">
              <li>
                <a href="#accueil" onClick={this.onClick}>
                  <img src="images/logo-blue.svg" height="60" />
                </a>
              </li>
              {menusNodes}
            </ul>            
          </div>          
        </header>
      </div>
    );
  }
});

var MenuItem = React.createClass({
  onClick: function(evt) {
    scrollToAnchor(evt.target.hash.replace('#', ''));
    //evt.preventDefault();
  },
  render: function() {    
    return (       
      <li>
        <a href={this.props.path} onClick={this.onClick}>{this.props.text}</a>
      </li>
    );
  }
});

var Chapters = React.createClass({
  render: function() {    
    return (       
      <ChapterList data={this.props.data} />
    );
  }
});

var ChapterList = React.createClass({
  render: function() {
    if (this.props.data) {
      var chapterMarkup = "";
      var immersiveMarkup = "";
      var chaptersNodes = this.props.data.map(function(section, index) {        
        if (section.chapter) {
          chapterMarkup = <div>
          <Immersive immersive={section.immersive} citation={section.chapter.citation}></Immersive>
          <Chapter chapter={section.chapter}></Chapter>
          
          </div>
        } else {
          chapterMarkup = "";
        }

        return (                      
            {chapterMarkup}          
        );
      });
    }
    
    return (
      <div>{chaptersNodes}</div>
    );
  }
});

var Immersive = React.createClass({
  render: function() { 
    var citationMarkup = ""
    if (this.props.citation) {
      citationMarkup = <div className="citation">
          <div className="text">{this.props.citation.text}
            <div className="author">{this.props.citation.author}</div>
          </div>          
        </div>;
    } else {
      citationMarkup = "";
    }   
    return (      
      <div className="img-holder" data-image={this.props.immersive.img} data-cover-ratio={this.props.immersive.ratio} 
      data-width={this.props.immersive.w} data-height={this.props.immersive.h}>
        {citationMarkup}
      </div>
    );
  }
});

var ChapterParagraph = React.createClass({
  render: function() {
    var paragraphNodes = "";
    if (this.props.paragraphs) {
      paragraphNodes = this.props.paragraphs.map(function(paragraph, index) {
        var paragraphMarkup = "";
        if (typeof paragraph === 'object') {
          switch (paragraph.type) {
            case 'vcard': 
            paragraphMarkup = <div id={paragraph.vcard.id} className="vcard">
              <div className="org"><b>{paragraph.vcard.org}</b></div>
              <a className="email" href={paragraph.vcard.email}>contact@apis-lazuli-consulting.fr</a>
              <div className="adr">
              <div className="street-address">{paragraph.vcard.address.street}</div>
              <span className="locality">{paragraph.vcard.address.locality}</span>, <span className="postal-code">{paragraph.vcard.address.postal}</span>
             </div>
             <div className="tel">{paragraph.vcard.phone}</div>            
            </div>
            break;
            case 'html':
              paragraphMarkup = <div dangerouslySetInnerHTML={{__html: paragraph.text}}></div>
            break;
            default:
              paragraphMarkup = <div>
                <div className="rectangle color-2"></div>
                <p className={paragraph.type}>{paragraph.text}</p>
              </div>
            break;
          }                            
        } else {
          paragraphMarkup = <p>{paragraph}</p>
        }
        return (          
          {paragraphMarkup}          
        );
      });
    }
    
    return (
      <div>
        {paragraphNodes}
      </div>
    );
  }
});

var Chapter = React.createClass({
  render: function() { 
    var style;  
    if (this.props.chapter.styleHeight) {
      style = {
        height: this.props.chapter.styleHeight + 'px !important'
      };  
    }   
    return (
      <section id={this.props.chapter.path} name={this.props.chapter.path} style={style}>
        <div className="chapter-content">
          <h1>{this.props.chapter.title}</h1>
          <div className="grid">
            <div className="grid__col grid__col--1-of-2">                              
              <ChapterParagraph paragraphs={this.props.chapter.paragraphsCol1}></ChapterParagraph>
            </div>
            <div className="grid__col grid__col--1-of-2">                              
              <ChapterParagraph paragraphs={this.props.chapter.paragraphsCol2}></ChapterParagraph>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

var converter = new Showdown.converter();

React.render(
  // <CommentBox url="comments.json" pollInterval={2000} />,
  // document.getElementById('content')
  <Page url="chapters.json" pollInterval={2000} />,
  document.getElementById('content-apis')
);

/*

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
  
);

*/

