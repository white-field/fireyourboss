import 'normalize.css/normalize.css';
import 'styles/App.css';
import 'flexboxgrid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CopyToClipboard from 'react-copy-to-clipboard';
import nl2br from 'nl2br';

import React from 'react';
import paragraphs from '../sources/paragraphs';

import moment from 'moment';

import paypalIcon from '../images/pay-pal.svg';


class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'John Doe',
      company: 'ABC Corp',
      position: 'designer',
      duration: '15 months',
      bossName: 'Jane Doe',
      lastDay: moment().format('LL'),
      paragraph1: null,
      paragraph2: null,
      paragraph3: null,
      paragraph4: null,
      paragraph5: null,
      paragraph6: null,
      paragraph7: null,
      showLetter: false,
      popupPage: null
    };
  }

  randomize(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomizeParagraphs() {
    const state = this.state;
    const randomize = this.randomize;
    this.setState({
      paragraph1: randomize(paragraphs.getParagraph1(state.position, state.company, state.lastDay)),
      paragraph2: randomize(paragraphs.getParagraph2()),
      paragraph3: randomize(paragraphs.getParagraph3(state.duration)),
      paragraph4: randomize(paragraphs.getParagraph4()),
      paragraph5: randomize(paragraphs.getParagraph5()),
      paragraph6: randomize(paragraphs.getParagraph6()),
      paragraph7: randomize(paragraphs.getParagraph7())
    })
  }

  componentDidMount() {
    this.randomizeParagraphs();
  }

  renderVariableInput(field) {
    return <input type="text" className='main__variable-input' placeholder={this.state[field]} onChange={(e) => {
      this.setState({
        [`${field}`]: e.target.value
      });
    }}/>
  }

  generateLetter() {
    this.randomizeParagraphs();
    this.showLetter();
  }

  showLetter() {
    this.setState({
      showLetter: true
    });
  }

  hideLetter() {
    this.setState({
      showLetter: false
    });
  }

  showPopupPage(page) {
    this.setState({
      popupPage: page
    })
  }

  hidePopupPage() {
    this.setState({
      popupPage: null
    })
  }

  render() {
    const state = this.state;
    const renderVariableInput = this.renderVariableInput.bind(this);
    const letter = `<span class="right date">${moment().format('LL')}</span>\n\nDear <span class='main__variable-in-paragraph'>${state.bossName}</span>,\n\n${state.paragraph1} \n\n${state.paragraph2} ${state.paragraph3} ${state.paragraph4} ${state.paragraph5} \n\n${state.paragraph6} ${state.paragraph7}\n\nSincerely,\n<span class='main__variable-in-paragraph'>${state.name}</span>`;
    let popupPage;
    switch (this.state.popupPage) {
      case 'about':
        popupPage = <div>
          <div className="main__header">
            About
          </div>
          <p>
            Tired of your current job, can’t wait to fire your boss?
          </p>
          <p>
            But wait, you are professional. You spent time and brainpower to search for templates and customize your
            words into a nice, proper resignation letter. But searching and browsing is exhausting. Why not make
            yourself a high quality, customised letter in a click? Resignation should be hassle-free and easy breezy.
          </p>
          <p>
            We don’t ever collect any of your data. Our suggestions are completely randomized from handpicked best
            letter samples online, with a constantly growing database.
          </p>
          <div className="main__sub-header">
            Who we are
          </div>
          <p>
            We are a designer + developer duo from Hong Kong. We have a passion for
            products, bringing nice little convenience to people with nice little tools.
          </p>
          <p>
            If you like this project, welcome to buy us a coffee via Paypal!
          </p>
          <form id="pay-pal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_s-xclick"/>
            <input type="hidden" name="hosted_button_id" value="JPRBAN5B75KZL"/>
            <div className="main__paypal-button" onClick={() => document.forms['pay-pal-form'].submit()}>
              Buy us a coffee via
              <img className="main__paypal-icon" src={paypalIcon}/>
            </div>
          </form>
        </div>
        break;
      case 'feedback':
        popupPage = <div>
          <div className="main__header">
            Give feedback
          </div>
          <p>
            Found bugs ? Have loads of thoughts about improving this tool? Let’s chat ! <a
            href="mailto:hello@liltool.com">hello@liltool.com</a>
          </p>
        </div>
        break;
    }

    return (
      <div className="root">
        <div className="grid main__instruction-container">
          <div className="row">
            <div className="col-xs-12">
              My name is {renderVariableInput('name')}working in {renderVariableInput('company')} as
              a {renderVariableInput('position')} for {renderVariableInput('duration')}. Now I am
              gonna fire my boss {renderVariableInput('bossName')} and the last day we
              will see each other will be {renderVariableInput('lastDay')}.
            </div>
            <div className="main__button-container">
              <button className="main__generate-button" onClick={this.generateLetter.bind(this)}>
                Generate
              </button>
            </div>
          </div>
          <div className="main__title-container">
            <div className="main__title">Fireyourboss</div>
            <div className="main__subtitle">Generate your customized resignation letter</div>
          </div>
          <div className="main__menu-container">
            <div className="main__feedback" onClick={this.showPopupPage.bind(this, 'feedback')}>Give feedback</div>
            <div className="main__about" onClick={this.showPopupPage.bind(this, 'about')}>About</div>
          </div>
        </div>

        <ReactCSSTransitionGroup
          transitionName="main__generated-letter-overlay"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {state.showLetter && <div className="main__generated-letter-overlay">
            <div className="grid main__generated-letter-overlay-top-container">
              <div>
                <button className="main__generated-letter-overlay-button" onClick={this.randomizeParagraphs.bind(this)}>
                  Re-generate
                </button>
                <button className="main__generated-letter-overlay-button" onClick={this.hideLetter.bind(this)}>Edit
                </button>
                <CopyToClipboard text={letter.replace(/(<([^>]+)>)/ig, "")}>
                  <button className="main__generated-letter-overlay-button">Copy</button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="grid">
              <div className="col-xs-10 grid">
                <div className="box main__generated-letter-container"
                     dangerouslySetInnerHTML={{
                       __html: nl2br(letter)
                     }}>
                </div>
              </div>
            </div>
          </div>
          }
        </ReactCSSTransitionGroup>
        {
          this.state.popupPage && <div className="main__popup-container">
            <div className="main__popup">
              {popupPage}
            </div>
            <div className="main__popup-background" onClick={this.hidePopupPage.bind(this)}></div>
          </div>
        }
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
