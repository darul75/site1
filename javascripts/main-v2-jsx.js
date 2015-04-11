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
    var markup = <div></div>
    if (this.state.data) {      
      return (
        <div>          
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

var Chapters = React.createClass({
  render: function() {    
    return (       
      <ChapterList data={this.props.data} />
    );
  }
});

var ChapterList = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },  
  slideButtonClick: function(index, pathId) {        
    var domElt = $('#' + pathId + ' .chapter-white');

    if (domElt.hasClass('slideOutLeft')) {
      domElt.removeClass('slideOutLeft');
      domElt.addClass('slideInLeft');
    }
    else {
      domElt.removeClass('slideInLeft');
      domElt.addClass('slideOutLeft');
    }
    
  },
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
      var chapterMarkup = "";      
      var self = this;
      var chaptersNodes = this.props.data.map(function(section, index) {              

        if (section.chapter) {            
          var homeCss = index === 0 ? 'home' : '';          

          var parallaxStyle = {
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

          var boundSlideClick = self.slideButtonClick.bind(null, index, section.chapter.path);
          var boundLightOver = self.lightButtonOver.bind(null, index, section.chapter.path);
          var boundLightOut = self.lightButtonOut.bind(null, index, section.chapter.path);

          chapterMarkup = 
          <section className={homeCss} key={section.chapter.path} id={section.chapter.path}>
            <div className="story">
              <div className="layout">
                <div className="layout-content">
                  <LightButton onLightButtonOver={boundLightOver} onLightButtonOut={boundLightOut} />                                 
                  <div className="chapter">
                    <div className="chapter-white animated">  
                      <div className="chapter-content">
                        <SlideButton onSlideButtonClick={boundSlideClick} />
                        <span>&nbsp;</span>              
                        <h1>{section.chapter.title}</h1>                  
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
                    <Citation citation={section.chapter.citation} />
                  </div>
                </div>
              </div>                          
            </div>
            <div style={parallaxStyle} className="parallax"></div>                        
          </section>
        } else {          
          chapterMarkup = '';
        }

        return (                      
            {chapterMarkup}          
        );
      });
    }
    
    return (
      <div>
        <div id="mock-scroller"></div>
        <div id="chapterNodes">{chaptersNodes}</div>
      </div>  
    );
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

var SlideButton = React.createClass({  
  getInitialState: function() {    
    return {left: true, right: false};
  },
  onSlide: function(evt) {
    this.setState({
      left: !this.state.left,
      right: !this.state.right
    });
    
    this.props.onSlideButtonClick();
    evt.preventDefault();
  },
  render: function() {
    var leftStyle = {display: this.state.left ? 'block' : 'none'};   
    var rightStyle = {display: this.state.right ? 'block' : 'none'};
    return (
      <div>
        <div className="arrow arrow-left" onClick={this.onSlide} style={leftStyle}></div>
        <div className="arrow arrow-right" onClick={this.onSlide} style={rightStyle}></div>
      </div>      
    );
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

var converter = new Showdown.converter();

React.render(  
  <Page url="chapters-v1.json" pollInterval={2000} />,
  document.getElementById('content-apis')
);