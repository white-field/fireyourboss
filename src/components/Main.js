import 'normalize.css/normalize.css';
import 'styles/App.css';
import 'flexboxgrid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CopyToClipboard from 'react-copy-to-clipboard';
import nl2br from 'nl2br';

import React from 'react';
import paragraphs from '../sources/paragraphs';

import moment from 'moment';


class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Monki',
      company: 'Google',
      position: 'designer',
      duration: '15 months',
      bossName: 'Tina',
      lastDay: 'Jun 25, 2017',
      paragraph1: null,
      paragraph2: null,
      paragraph3: null,
      paragraph4: null,
      paragraph5: null,
      paragraph6: null,
      paragraph7: null,
      showLetter: false
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

  render() {
    const state = this.state;
    const renderVariableInput = this.renderVariableInput.bind(this);
    const letter = `<span class="right date">${moment().format('LL')}</span>\n\nDear <span class='main__variable-in-paragraph'>${state.bossName}</span>,\n\n${state.paragraph1} \n\n${state.paragraph2} ${state.paragraph3} ${state.paragraph4} ${state.paragraph5} \n\n${state.paragraph6} ${state.paragraph7}\n\nSincerely,\n<span class='main__variable-in-paragraph'>${state.name}</span>`;
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

      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
