function wrapSpan(str) {
  return `<span class='main__variable-in-paragraph'>${str}</span>`
};

export default {
  getParagraph1 (position, company, lastDay) {
    position = wrapSpan(position);
    company = wrapSpan(company);
    lastDay = wrapSpan(lastDay);
    return [
      `I am writing you to officially tender my resignation from my position as ${position} in ${company}, with effective date on ${lastDay}.`,
      `Please accept this as my formal notice of resignation as ${position} in ${company}. My last day will be ${lastDay}.`,
      `Please accept this letter as notice of my resignation from the position of ${position} at ${company}. As per the terms of my employment contract, I will continue to work and complete my employment on ${lastDay}.`,
      `I am writing to formally notify you that I am resigning from my position as ${position} with ${company}, and my last day of employment will be ${lastDay}.`,
      `Please accept this letter as my formal resignation from ${company} as ${position}. my last day of employment will be ${lastDay}.`
    ]
  },
  getParagraph2 () {
    return [
      'It has been a great time working here and the people I have met and worked with are all so adorable and considerate.',
      'It has been a pleasure working with you and the team.',
      'I have enjoyed being a part of the team and developing as a professional.'
    ]
  },
  getParagraph3(duration){
    duration = wrapSpan(duration);
    return [
      `It was my luck to have guidance from you and fellow teammates and I do appreciate the opportunities for personal and professional development provided during the past ${duration}.`,
      `I appreciate your support during my tenure here and take with me the valuable experiences I have gained over the last ${duration}.`,
      `I appreciate the opportunities I have been given and your valuable guidance and support over the last ${duration} was second to none.`,
      `On a more personal note, let me express my gratitude for the wonderful opportunities for professional growth and development you have provided over the ${duration}.`
    ]
  },
  getParagraph4 () {
    return [
      'I sincerely hope my work would be considered something constructive and valuable to the company.'
    ]
  },
  getParagraph5(){
    return [
      'It has been a long hard decision, however I believe it is the right time for me to move onto new opportunities and challenges.',
      'This decision has not been easy, but I have decided that it will be in the best interests for my career advancement and future development.',
      'This decision to pursue another opportunity was not an easy one. However, it is the right time for me towards fulfilling my personal and professional goals.'
    ]
  },
  getParagraph6(){
    return [
      'If I can be of any assistance during this transition, please let me know.',
      'If there are any areas in particular you would like me to focus on during my notice period, please let me know.',
      'I am conscious of the need to provide support to the company until my departure and I shall give my full commitment until then.',
      'I am happy to assist in the smooth transition of the new staff into my current role.',
      'Before my last day, I would love to help out in any way that I can so that the team will still operate smoothly even after my departure.',
      'My efforts until my end date will be to wrap up my projects here and turn over my responsibilities, so please let me know what you expect so the process can be as smoothly as possible.',
      'I am happy to help train my replacement or facilitate the transition process in any other way possible.'
    ]
  },
  getParagraph7(){
    return [
      'And I wish you all the best in the future.',
      'I wish the company every success in the future.',
      'I wish you and the company many more success in the future years.',
      'I wish you and the team the best of luck.'
    ]
  }
}
