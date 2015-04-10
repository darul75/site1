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
    // $('.img-holder').imageScroll({
    //   container: $('#content-apis'),
    //   imgClass: 'img-holder-img',
    //   windowObject: $(window),
    //   mediaWidth: 1600,
    //   mediaHeight: 1200,
    //   speed:.2
    // });    

    $('.parallax').scrolly({bgParallax: true});
  },
  render: function() {
    var markup = <div></div>
    if (this.state.data) {
      // <Menu data={this.state.data.menus}/>
          // <Logo />
          //
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

// var Logo = React.createClass({
//   onClick: function(evt) {
//     scrollToAnchor("accueil");
//     evt.preventDefault();
//   },
//   render: function() {    
//     // <div onClick={this.onClick}>
//         //   <i className="fa fa-3x fa-lightbulb-o fa-inverse"></i>
//         // </div>

//     return (       
//       <div className="logo-white">
//         <div onClick={this.onClick}>
//           <a href="#qui_sommes_nous">
//             <img src="images/logo-blanc.svg" height="200px" className="logo-home animated bounce" />
//           </a>
//         </div>        
//       </div>
//     );
//   }
// });

// var Menu = React.createClass({
//   onClick: function(evt) {
//     // scrollToAnchor("accueil");
//     // evt.preventDefault();
//   },
//   render: function() {   
//     if (this.props.data) {  
//       var menuItemMarkup = "";
//       var menusNodes = this.props.data.map(function(menu, index) {                    
//         return (
//           <MenuItem key={menu.path} path={menu.path} text={menu.text} />          
//         );
//       });
//     }

//     return (       
//       <div className="header_menu">      
//         <header className="inner">
//           <div className="menu-nav">
//             <ul id="menu-menu-principal" className="menu">
//               <li>
//                 <a href="#accueil" onClick={this.onClick}>
//                   <img src="images/logo-blue.svg" height="60" />
//                 </a>
//               </li>
//               {menusNodes}
//             </ul>            
//           </div>          
//         </header>
//       </div>
//     );
//   }
// });

// var MenuItem = React.createClass({
//   onClick: function(evt) {
//     scrollToAnchor(evt.target.hash.replace('#', ''));
//     //evt.preventDefault();
//   },
//   render: function() {    
//     return (       
//       <li>
//         <a href={this.props.path} onClick={this.onClick}>{this.props.text}</a>
//       </li>
//     );
//   }
// });

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
  render: function() {
    if (this.props.data) {
      var chapterMarkup = "";
      var immersiveMarkup = "";
      var chaptersNodes = this.props.data.map(function(section, index) {

        // <Immersive key={index} immersive={section.immersive} citation={section.chapter.citation}></Immersive>        

        if (section.chapter) {  
          var animate = !section.chapter.noanimate ? 'bg animate' : 'bg';
          var homeCss = index === 0 ? 'home' : '';          

          // var divStyle = {            
          //   backgroundImage: 'url(' + section.immersive.img + ')',
          //   backgroundSize: 'cover',
          //   WebkitTransition: 'all', // note the capital 'W' here
          //   msTransition: 'all' // 'ms' is the only lowercase vendor prefix
          // };

          // <img className={animate} src={section.immersive.img} attrs-anim-detached="true" />
          /*<div className="chapter-img who"></div>*/

          chapterMarkup = 
          <section className={homeCss} key={section.chapter.path} id={section.chapter.path}>
            <div className="story">
              <div className="layout">
                <div className="layout-content">
                  <div className="fake-lamp">
                    <i className="fa fa-lightbulb-o fa-5x fa-inverse"></i>
                  </div>                
                  <div className="chapter animated">
                    <div className="chapter-white">                
                      <div className="chapter-content">
                        <SlideButton />
                        <span>&nbsp;</span>              
                        <h1>{section.chapter.title}</h1>                  
                        <div className="grid">
                          <div className="grid__col grid__col--1-of-2">
                            
                            <ChapterParagraph paragraphs={section.chapter.paragraphsCol1}></ChapterParagraph>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>                          
            </div>
            <div className="parallax home" data-velocity="-.1"></div>
            <div className="parallax home2" data-velocity="-.5" data-fit="525"></div>            
          </section>
        } else {
          //chapterMarkup = <div key={section.immersive.img} />;
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


var SlideButton = React.createClass({
  getInitialState: function() {
    return {left: true, right: false};
  },
  onSlide: function(evt) {
    this.setState({
      left: !this.state.left,
      right: !this.state.right
    });
    
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

var converter = new Showdown.converter();

React.render(  
  <Page url="chapters-v1.json" pollInterval={2000} />,
  document.getElementById('content-apis')
);