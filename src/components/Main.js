import 'normalize.css/normalize.css';
import 'styles/App.sass';
import 'flexboxgrid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CopyToClipboard from 'react-copy-to-clipboard';
import nl2br from 'nl2br';

import React from 'react';
import paragraphs from '../sources/paragraphs';

import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import paypalIcon from '../images/pay-pal.svg';
import closeIcon from '../images/ico-close.svg';
import copyIcon from '../images/ico-copy.svg';
import editIcon from '../images/ico-edit.svg';
import generateIcon from '../images/ico-generate.svg';
import tickIcon from '../images/ico-tick-active.svg';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'John Doe',
      company: 'ABC Corp',
      position: 'Designer',
      duration: '15 months',
      bossName: 'Jane Doe',
      // lastDay: moment().add(1, 'months').format('ll'),
      paragraph1: null,
      paragraph2: null,
      paragraph3: null,
      paragraph4: null,
      paragraph5: null,
      paragraph6: null,
      paragraph7: null,
      showLetter: false,
      popupPage: null,
      copyLetter: false,
      lastDay: moment().add(0, 'months'),
      isDatepickerOpen: false,
      isLastdaySelect: false
    };

    // document.addEventListener('gesturestart', function (e) {
    //   e.preventDefault();
    // });
  }

  randomize(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomizeParagraphs() {
    const state = this.state;
    const randomize = this.randomize;
    const stringLastDate = this.convertIntDateToString(state.lastDay); // Convert number date to string

    this.setState({
      paragraph1: randomize(paragraphs.getParagraph1(state.position, state.company, stringLastDate)),
      paragraph2: randomize(paragraphs.getParagraph2()),
      paragraph3: randomize(paragraphs.getParagraph3(state.duration)),
      paragraph4: randomize(paragraphs.getParagraph4()),
      paragraph5: randomize(paragraphs.getParagraph5()),
      paragraph6: randomize(paragraphs.getParagraph6()),
      paragraph7: randomize(paragraphs.getParagraph7())
    });
    this.copyLetterReset();
  }

  componentDidMount() {
    this.randomizeParagraphs();
  }

  renderVariableInput(field, width) {
    return <input type="text" className={'main__variable-input ' + field+'-input'} placeholder={this.state[field]} onChange={(e) => {
      this.setState({
        [`${field}`]: e.target.value,
      });
    }}/>
  }

  renderDatepickerInput() {
    return <input className={'main__variable-input'} type="text" placeholder={this.convertIntDateToString(this.state.lastDay)} onClick={this.toggleCalendar.bind(this)} value={this.state.isLastdaySelect? this.convertIntDateToString(this.state.lastDay): ""} readOnly />
  }

  generateLetter() {
    this.randomizeParagraphs();
    this.showLetter();
    this.copyLetterReset();
    this.scrollToTop();
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

  copyLetter() {
    this.setState({
      copyLetter: true
    });
  }

  copyLetterReset(){
    this.setState({
      copyLetter: false
    });
  }

  scrollToTop(){
    window.scrollTo(0, 0);
  }

  isActive(value){
    return ((value) ?'active':'default');
  }

  convertIntDateToString(number){
    return moment(number).format("ll"); // ll = MMM DD, YYYY
  }

  handleLastDateChange(date) {
    this.setState({
        lastDay: date
      });
    this.toggleCalendar();
    console.log("clicked");
  }

  toggleCalendar (e) {
    e && e.preventDefault()
    this.setState({
      isDatepickerOpen: !this.state.isDatepickerOpen,
      isLastdaySelect : true
    })
  }

  closeCalendar (e) {
    e && e.preventDefault()
    this.setState({
      isDatepickerOpen: false,
      isLastdaySelect : false
    })
  }

  render() {
    const state = this.state;
    const renderVariableInput = this.renderVariableInput.bind(this);
    const renderDatepickerInput = this.renderDatepickerInput.bind(this);
    const letter = `<span class="right date">${moment().format('ll')}</span>\n\nDear <span class='main__variable-in-paragraph'>${state.bossName}</span>,\n\n${state.paragraph1} \n\n${state.paragraph2} ${state.paragraph3} ${state.paragraph4} ${state.paragraph5} \n\n${state.paragraph6} ${state.paragraph7}\n\nSincerely,\n<span class='main__variable-in-paragraph'>${state.name}</span>`;
    let popupPage;
    switch (this.state.popupPage) {
      case 'about':
        popupPage = <div>
          <div className="main__header">
            About
            <img className="main__close-icon right" src={closeIcon} onClick={this.hidePopupPage.bind(this)}/>
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
            <img className="main__close-icon right" src={closeIcon} onClick={this.hidePopupPage.bind(this)}/>
          </div>
          <p>
            Found bugs ? Have loads of thoughts about improving this tool? Let us know - <a
            href="https://goo.gl/forms/hkLefDMT0gpbZAcN2" target="_blank">Fill in this survey</a>
          </p>

                    <p>Want a chat? Email us at <a
            href="mailto:hello@liltool.com">hello@liltool.com</a></p>
        </div>
        break;
    }

    return (
      <div className="root">
        <div className="grid main__instruction-container">
          <div className="row">
            <div className="main__title-container col-sm-6 col-xs-12">
              <div className="main__title">Fireyourboss</div>
              <div className="main__subtitle">Generate your customized resignation letter</div>
            </div>
            <div className="main__menu-container col-sm-6 col-xs-12">
              <a className="main__feedback" onClick={this.showPopupPage.bind(this, 'feedback')}>Give feedback</a>
              <a className="main__about" onClick={this.showPopupPage.bind(this, 'about')}>About</a>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              My name is {renderVariableInput('name','nameLength')}working in {renderVariableInput('company','companyLength')} as
              a {renderVariableInput('position','positionLength')} for {renderVariableInput('duration','durationLength')}. Now I am
              gonna fire my boss {renderVariableInput('bossName','bossNameLength')} and the last day we
              will see each other will be {renderDatepickerInput()}.
              { this.state.isDatepickerOpen && ( <DatePicker selected={this.state.lastDay} onChange={this.handleLastDateChange.bind(this)} withPortal inline readOnly showDisabledMonthNavigation minDate={moment()} onClickOutside={ this.closeCalendar.bind(this)} /> ) }
            </div>
            <div className="main__button-container">
              <button className="main__generate-button" onClick={this.generateLetter.bind(this)}>
                Generate <img className="main__generate-icon" src={generateIcon}/>
              </button>
            </div>
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
                <button className="main__generated-letter-overlay-button main__regenerate" onClick={this.randomizeParagraphs.bind(this)}>
                  <span className="label">Re-Generate</span> <img className="main__generate-icon" src={generateIcon}/>
                </button>
                <button className="main__generated-letter-overlay-button main__edit" onClick={this.hideLetter.bind(this)}> <span className="label"> Edit</span> <img className="main__edit-icon" src={editIcon}/>
                </button>
                <CopyToClipboard text={letter.replace(/(<([^>]+)>)/ig, '')} onCopy={this.copyLetter.bind(this)}>
                  <button className={'main__generated-letter-overlay-button main__copy ' + this.isActive(state.copyLetter)} >
                    {state.copyLetter  ? <span>Copied <img className="main__tick-icon" src={tickIcon}/></span> : <span>Copy <img className="main__copy-icon" src={copyIcon}/></span>}
                  </button>
                </CopyToClipboard>

              </div>
            </div>
            <div className="grid">
              <div className="col-xs-12 col-md-10 grid">
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
