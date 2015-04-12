import React from 'react';

import SlideButton from './SlideButton';

export default class ChapterList extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {data: this.props.data};
  }
  
  slideButtonClick(index, pathId) {        
    var domElt = $('#' + pathId + ' .chapter-white');

    if (domElt.hasClass('slideOutLeft')) {
      domElt.removeClass('slideOutLeft');
      domElt.addClass('slideInLeft');
    }
    else {
      domElt.removeClass('slideInLeft');
      domElt.addClass('slideOutLeft');
    }  
  }
  lightButtonOver(index, pathId) {        
    var domElt = $('#' + pathId + ' .story');
    domElt.addClass('no-bg');    
  }
  lightButtonOut(index, pathId) {        
    var domElt = $('#' + pathId + ' .story');    
    domElt.removeClass('no-bg');    
  }
  render() {
     if (this.props.data && this.props.data.sections) {
      var chapterMarkup = "";      
      var self = this;
      var sectionHeight = {
        height : $(window).height()
      };

      var chaptersNodes = this.props.data.sections.map(function(section, index) {              

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

          // <LightButton onLightButtonOver={boundLightOver} onLightButtonOut={boundLightOut} />    

          // <ChapterParagraph paragraphs={section.chapter.paragraphsCol1}></ChapterParagraph>     

          // <ChapterParagraph paragraphs={section.chapter.paragraphsCol2}></ChapterParagraph> 

          // <Citation citation={section.chapter.citation} />    

          //                    

          chapterMarkup = 
          <section className={homeCss} key={section.chapter.path} id={section.chapter.path} style={sectionHeight}>
            <div className="story">
              <div className="layout">
                <div className="layout-content">
                  
                  <div className="chapter">
                    <div className="chapter-white animated">  
                      <div className="chapter-content">
                        <SlideButton onSlideButtonClick={boundSlideClick} />
                        <span>&nbsp;</span>              
                        <h1>{section.chapter.title}</h1>                  
                        <div className="grid">
                          <div className="grid__col grid__col--1-of-2">                            
                            
                          </div>
                          <div className="grid__col grid__col--1-of-2">                            
                            
                          </div>
                        </div>
                      </div>                                    
                    </div>
                    
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
}

