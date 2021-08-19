import React from 'react';
import InfoLayout from '../layouts/InfoLayout';

type Faqs = {
  question: string;
  answer: string;
}[];

const faqs: Faqs = [
  {
    question: 'When should I RSVP by?',
    answer: 'As soon as you can, but no later than July 30, 2022.',
  },
  {
    question: 'Are you registered? Where?',
    answer: 'Not yet, but we will be soon!',
  },
  {
    question: 'Can I bring a date?',
    answer: 'Does your invite say "+1"? Then yes.',
  },
  {
    question: 'Are kids welcome?',
    answer:
      'Unfortunately, we can only accommodate a few close children. Your RSVP will let you know.',
  },
  {
    question: 'Will there be parking for the ceremony or reception?',
    answer:
      'Yes. Parking will be available for free in the large entrance lot on the clubhouse grounds.',
  },
  {
    question:
      'Will there be transportation to and from the hotels to the ceremony?',
    answer: 'No. Please arrange something in advance if you plan to drink.',
  },
  {
    question:
      'Are there any other events that I should know about around the wedding?',
    answer: `Play a round on the golf course! We're brewing up some other ideas too, so check back soon before the wedding.`,
  },
];

export default function Faqs() {
  return (
    <InfoLayout
      title="Faqs"
      description="If you have any questions other than what we've listed here, please reach out to us."
      hasGap
      smallDeviceBlocks={faqs.map((faq) => (
        <div key={Math.random()} className="mt-8 text-center">
          <p className="text-lg font-cardo italic mb-4">Question</p>

          <h3 className="text-3xl uppercase mb-12">{faq.question}</h3>

          <p className="text-lg font-cardo italic mb-4">Answer</p>

          <p>{faq.answer}</p>
        </div>
      ))}
      largeDeviceBlocks={faqs.map((faq) => {
        return {
          left: (
            <React.Fragment>
              <div className="text-center">
                <p className="text-lg font-cardo italic mb-4">Question</p>

                <h3 className="text-3xl uppercase">{faq.question}</h3>
              </div>
            </React.Fragment>
          ),

          right: (
            <React.Fragment>
              <div className="text-center">
                <p className="text-lg font-cardo italic mb-4">Answer</p>

                <p>{faq.answer}</p>
              </div>
            </React.Fragment>
          ),
        };
      })}
    />
  );
}
