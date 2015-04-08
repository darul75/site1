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
      container: $('#content-apis'),
      imgClass: 'img-holder-img',
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
    // <div onClick={this.onClick}>
        //   <i className="fa fa-3x fa-lightbulb-o fa-inverse"></i>
        // </div>

    return (       
      <div className="logo-white">
        <div onClick={this.onClick}>
          <a href="#qui_sommes_nous">
            <img src="images/logo-blanc.svg" height="200px" className="logo-home animated bounce" />
          </a>
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
          <MenuItem key={menu.path} path={menu.path} text={menu.text} />          
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
          chapterMarkup = <div key={section.chapter.path}>
          <Immersive key={index} immersive={section.immersive} citation={section.chapter.citation}></Immersive>
          <Chapter chapter={section.chapter}></Chapter>
          
          </div>
        } else {
          chapterMarkup = <div key={section.immersive.img} />;
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
  onMouseEnterHandler: function(e) {
    

  },
  onMouseLeaveHandler: function(e) {
    

  },
  render: function() { 
    var citationMarkup = ""    
    if (this.props.citation) {
      var citationClassname = "citation " + this.props.citation.class;
      citationMarkup = 
        <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
          <div className={citationClassname}>
            <div className="text">{this.props.citation.text}
              <div className="author">{this.props.citation.author}</div>
            </div>          
          </div>        
        </div>
    } else {
      citationMarkup = 
        <div>
          <div className="left-white"/>        
          <div className="right-white"/>
        </div>
    }   
    return (      
      <div  className="img-holder" 
            data-image={this.props.immersive.img} 
            data-cover-ratio={this.props.immersive.ratio} 
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
        var paragraphKey = 'para'+index;
        if (typeof paragraph === 'object') {
          switch (paragraph.type) {
            case 'vcard': 
            paragraphMarkup = <div key={paragraphKey} id={paragraph.vcard.id} className="vcard">
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
              paragraphMarkup = <div key={paragraphKey} dangerouslySetInnerHTML={{__html: paragraph.text}}></div>
            break;
            default:
              paragraphMarkup = <div key={paragraphKey}>
                <div className="rectangle color-2"></div>
                <p className={paragraph.type}>{paragraph.text}</p>
              </div>
            break;
          }                            
        } else {
          paragraphMarkup = <p key={paragraphKey} >{paragraph}</p>
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