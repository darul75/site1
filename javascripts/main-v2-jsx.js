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

          var divStyle = {            
            backgroundImage: 'url(' + section.immersive.img + ')',
            backgroundSize: 'cover',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
          };

          // <img className={animate} src={section.immersive.img} attrs-anim-detached="true" />

          chapterMarkup = 
          <section style={divStyle} key={section.chapter.path} id={section.chapter.path} anim-pause="50">              
            
            <div className="story">
              <div className="layout">            
                <div className="fake-lamp">
                  <i className="fa fa-lightbulb-o fa-5x fa-inverse"></i>
                </div>
                <div className="chapter animated">
                  <div className="chapter-white">                
                    <div className="chapter-content">
                      <div className="arrow arrow-left"></div>
                      <div className="arrow arrow-right"></div>
                      <span>&nbsp;</span>              
                      <div className="chapter-img who"></div>                  
                      <div className="grid">
                        <div className="grid__col grid__col--1-of-2">
                          <h1>{section.chapter.title}</h1>
                          <p> paragraphs </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>                          
            </div>            
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

var converter = new Showdown.converter();

React.render(  
  <Page url="chapters-v1.json" pollInterval={2000} />,
  document.getElementById('content-apis')
);