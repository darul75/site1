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
    $('.parallax').scrolly({bgParallax: true});      
  },
  render: function() {
    // <Menu data={this.state.data.menus}/>,    
    if (this.state.data) {
      return React.DOM.div(
        {},         
        <ChapterList data={this.state.data.sections} />        
      );      
    }
    
    return React.DOM.div();           
  }
});

var Logo = React.createClass({  
  render: function() {
    return (       
      <div className="logo-white">        
        <a href="/">
          <img src="images/logo-blanc.svg" height="200px" className="logo-home animated bounce" />
        </a>
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

var ChapterList = React.createClass({
  lightButtonOver: function(index, pathId) {        
    var domElt = $('#' + pathId + ' .story');    
    domElt.addClass('no-bg');    
  },
  lightButtonOut: function(index, pathId) {        
    var domElt = $('#' + pathId + ' .story');        
    domElt.removeClass('no-bg');        
  },  
  render: function() {    

    if (this.props.data) {
      var self = this;
      var sectionHeight = {
        height : $(window).height()
      };      
      
      var chapterMarkup = "";
      var immersiveMarkup = "";
      chaptersNodes = this.props.data.map(function(section, index) {        
       
        var keyChap = "chap"+index;
        var keyImm = "immersive"+index;

        if (section.chapter) {  
          var homeCss = index === 0 ? '' : '';
          var logo = index === 0 ? <Logo /> : '';
          var parallaxStyle;
          var parallaxImage;
          var velocity = '';
          var lightButton = '';

          if (section.immersive) {            
            
            parallaxStyle = {
              background: 'url('+section.immersive.img+') 50% 0 no-repeat fixed',
              margin: 0,
              backgroundSize: 'cover',
              height: '100%',
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
              right: 0
            };
            parallaxImage = <div data-fit="500" style={parallaxStyle} className=""></div>

            var boundLightOver = self.lightButtonOver.bind(null, index, section.chapter.path);
            var boundLightOut = self.lightButtonOut.bind(null, index, section.chapter.path);
            lightButton = <LightButton onLightButtonOver={boundLightOver} onLightButtonOut={boundLightOut} />

          } 
          
          var height = section.immersive ? sectionHeight : {};
          var chapterClass = section.immersive ? '': 'chapter-white animated';

            chapterMarkup = 
          <section className={homeCss} key={section.chapter.path} id={section.chapter.path} style={height}>
            <div className="story">
              <div className="layout">
                <div className="layout-content">
                  <div className="chapter">
                    <div className={chapterClass}>  
                      <div className="chapter-content">     
                        <h1>{section.chapter.title}</h1>
                        {logo}
                        <Citation citation={section.chapter.citation} />
                        {lightButton}
                        <div className="grid">
                          <div className="grid__col grid__col--1-of-2"> 
                            <ChapterParagraph paragraphs={section.chapter.paragraphsCol1}></ChapterParagraph>
                          </div>
                          <div className="grid__col grid__col--1-of-2">
                            <ChapterParagraph paragraphs={section.chapter.paragraphsCol2}></ChapterParagraph>
                          </div>
                        </div>
                      </div>                                    
                    </div>                    
                  </div>
                </div>
              </div>                          
            </div>
            {parallaxImage}                        
          </section>
        } else {          
          chapterMarkup = '';
        }

        return (                      
            {chapterMarkup}          
        );
        
      });

      return React.DOM.div({}, chaptersNodes);
    }
            
    return React.DOM.div();
  }
});

var Citation = React.createClass({
  render: function() { 
    var citationMarkup = ""    
    if (this.props.citation) {
      var citationAddClass = this.props.citation.class ? this.props.citation.class : '';
      var citationClassname = "citation " + citationAddClass;
      citationMarkup =         
        <div className={citationClassname}>
          <div className="text">{this.props.citation.text}
            <div className="author">{this.props.citation.author}</div>
          </div>          
        </div>                
    } else {
      citationMarkup = <div></div>
    }   
    return React.DOM.div({}, citationMarkup);
  }
});

var LightButton = React.createClass({  
  mouseOver: function(evt) {    
    this.props.onLightButtonOver();
    evt.preventDefault();
  },
  mouseOut: function(evt) {    
    this.props.onLightButtonOut();
    evt.preventDefault();
  },
  render: function() {    
    return (
      <div className="fake-lamp" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
        <i className="fa fa-lightbulb-o fa-5x fa-inverse"></i>
      </div>
    );
  }
});

var Immersive = React.createClass({
  render: function() { 
    var citationMarkup = ""    
    if (this.props.citation) {
      var citationClassname = "citation " + this.props.citation.class;
      citationMarkup = 
        <div>        
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

        return React.DOM.div({key: paragraphKey}, paragraphMarkup);        
      });
    }

    return React.DOM.div({}, paragraphNodes);
        
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
  <Page url="chapters-v3.json" pollInterval={2000} />,
  document.getElementById('content-apis')
);